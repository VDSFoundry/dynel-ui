// Copyright (c) Visual Data Solutions, Inc. All rights reserved. This source code is distributed under the terms of the MIT license. See LICENSE file in the project root for complete license information.

var View = require('./view.js');
var _ = require('underscore');


function escapeRegExp(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(string, find, replace) {
    return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

module.exports = View.extend({

    override: {
        init: function (_super, data) {
            if (_super)
                _super(data);

            if (data && data.model)
                this.model = data.model;

            if (this.fields)
                this.fields = _.clone(this.fields);
            else
                this.fields = {};

            this.values = {};
            this.elements = {};
        },

        postRender: function(_super) {
            if (_super)
                _super();

            var form = this.find('form');
            this.form = form;

            //get all inputs
            var inputs = this.find('input');

            var self = this;
            $.each(inputs, function(index, item) {
                var name = $(item).attr('name');
                self.values[name] = function (val) {
                    if (val === undefined) {
                        return self.find('input[name="' + name + '"]').val();
                    }
                    else {
                        return self.find('input[name="' + name + '"]').val(val);
                    }
                }

                var helpLabel = $('*[data-for="' + name + '"]');
                if (!self.fields.hasOwnProperty(name))
                {
                    self.fields[name] = {};
                }
                var field = self.fields[name];
                field.element = $(item);
                field.helpLabel = helpLabel;
                field.disable = function() {
                        this.element.attr('disabled', 'disabled');
                    };
                field.enable = function() {
                        this.element.removeAttr('disabled');
                    };
                field.value = function(val) {
                        if (val === undefined) {
                            return this.element.val();
                        }
                        else {
                            return this.element.val(val);
                        }
                    };
                field.showError = function(msg) {
                        var grp = this.element.closest('.form-group')
                            .addClass('has-error');

                        var help = grp.find('.help-block');
                        help.removeClass('hidden');
                        help.text(msg);
                    };
                field.clearError = function() {
                    var grp = this.element.closest('.form-group')
                        .removeClass('has-error');

                    var help = grp.find('.help-block');
                    help.addClass('hidden');
                };
            });

            var elements = this.find('*[data-viewid]');
            if (elements) {
                $.each(elements, function(index, item) {
                    var id = $(item).attr('data-viewid');
                    var name = replaceAll(id, '-', '_');

                    self.elements[name] = {
                        id: id,
                        element: $(item),
                        hide: function() {
                            this.element.addClass('hidden');
                        },
                        show: function() {
                            this.element.removeClass('hidden');
                        },
                        text: function(txt) {
                            return this.element.text(txt);
                        }
                    };

                });
            }
        },
    },

    onsubmit: function(handler, context) {
        var self = this;

        var input = this.find('form')
            .off('submit')
            .on('submit', function(e) {
                e.preventDefault();

                if (self.modelClass) {
                    var data = new self.modelClass();

                    for( var p in self.fields) {

                        if (self.fields.hasOwnProperty(p)) {
                            var value = self.fields[p].value();
                            data.set(p, value);
                        }
                    }
                    handler.call(context, data);
                }
                else {
                    handler.call(context);
                }
            });
    },

    clearErrors: function() {

        for( var p in this.fields) {
            if (this.fields.hasOwnProperty(p)) {
                var field = this.fields[p];
                if (field.clearError)
                    field.clearError();
            }
        }
    },


});
