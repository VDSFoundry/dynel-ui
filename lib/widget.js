// Copyright (c) Visual Data Solutions, Inc. All rights reserved. This source code is distributed under the terms of the MIT license. See LICENSE file in the project root for complete license information.

var DynObject = require('dynel-core').DynObject;

module.exports = DynObject.extend({

    getTemplateArgs: function () {

        if (this.updateTemplateArgs) {
            this.updateTemplateArgs();
        }
        var a = this.get('templateArgs');

        var data = {};
        if (this.model) {

            var attr = this.model.getAttributes();
            attr.modelObject = this.model;

            for (var p in attr) {
                data[p] = attr[p];
            }
        }

        if (this.get('templateArgs')) {
            var args = this.get('templateArgs');
            for (var p in args) {
                if (args.hasOwnProperty(p))
                    data[p] = args[p];
            }
        }
        data.view = this;
        data.viewId = this.objectId;

        return data;
    },
    renderTemplate: function (tmplArgs) {

        if (this.template) {
            this.el().empty();

            var data = this.getTemplateArgs();

            if (tmplArgs) {
                for (var p in tmplArgs) {
                    if (tmplArgs.hasOwnProperty(p))
                        data[p] = tmplArgs[p];
                }
            }
            var html = this.template(data);
            this.el().append(html.trim());
		  }
        return this;
    },

    remove: function () {
        this.el().remove();
    },

    find: function (selector) {
        var val = this.el().find(selector);
        if (val.get(0))
            return val;

        return undefined;
    },

    prepend: function (element) {
        this.el().prepend(element);
    },

    append: function (element) {
        this.el().append(element);
    },

    render: function () {

        if (!this.visible)
            return null;

        if (this.preRender)
            this.preRender();

        var output = this.renderTemplate();

        if (this.postRender) {
            this.postRender();
        }

        return output;
    },

    el: function () {
        return this.get('$element');
    },
    init: function () {

        this._super();

        if (this.get('selector')) {
            this.set('$element', $(this.get('selector')));
        }
        else if (this.get('parentElement')) {
            this.set('$element', this.get('parentElement'));
        }
        else if (this.get('tagName')) {
            var elem = document.createElement(this.get('tagName'));
            this.set('$element', $(elem));
        }
        else {
            //default to a div
            var elem = document.createElement('div');
            this.set('$element', $(elem));
        }

        if (this.get('$element')) {
            this.set('element', this.get('$element').get(0));
        }

        if (this.get('tagAttributes')) {
            for (var p in this.get('tagAttributes')) {
                if (this.get('tagAttributes').hasOwnProperty(p)) {
                    this.get('$element').attr(p, this.get('tagAttributes')[p]);
                }
            }
        }

        this.visible = true;
    },

    addTemplateArgs: function (argsIn) {
        var args = this.get('templateArgs');
        if (!args) {
            args = {};
            this.set('templateArgs', args);
        }

        for (var p in argsIn) {
            if (argsIn.hasOwnProperty(p)) {
                args[p] = argsIn[p];
            }
        }
    },

    empty: function () {
        this.el().empty();
    },


    css: function (css) {

        this.el().css(css);
    },

    show: function () {
        this.visible = true;
        if (this.el())
            this.el().show();
    },
    hide: function () {
        this.visible = false;

        if (this.el()) {
            this.el().hide();
        }
    },
});
