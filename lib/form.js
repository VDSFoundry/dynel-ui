// Copyright (c) Visual Data Solutions, Inc. All rights reserved. This source code is distributed under the terms of the MIT license. See LICENSE file in the project root for complete license information.

var View = require('./view.js');

module.exports = View.extend({

    override: {
        init: function (_super, data) {
            if (_super)
                _super(data);

            if (data && data.model)
                this.model = data.model;

            this.values = {};
        },

        postRender: function(_super) {
            if (_super)
                _super();

            //get all inputs
            var inputs = this.find('input');

            var self = this;
            $.each(inputs, function(index, item) {
                var name = $(item).attr('name');
                self.values[name] = function(val) {
                    if (val === undefined) {
                        return self.find('input[name="' + name + '"]').val();
                    }
                    else {
                        return self.find('input[name="' + name + '"]').val(val);
                    }
                }
            });
        },
    },

    onsubmit: function(handler, context) {
        var input = self.find('input[type="submit"]')
            .off('submit')
            .on('submit', function(e) {
                e.preventDefault();

                handler.call(context);
            });
    }


});
