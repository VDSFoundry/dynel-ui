// Copyright (c) Visual Data Solutions, Inc. All rights reserved. This source code is distributed under the terms of the MIT license. See LICENSE file in the project root for complete license information.

var DynObject = require('dynel-core').DynObject;

module.exports = DynObject.extend({

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

    render: function (parentElement) {

        if (!this.visible)
            return null;

        if (this.preRender)
            this.preRender();

        if (this.draw)
            this.draw();

        if (this.postRender) {
            this.postRender();
        }

        if (parentElement) {
            parentElement.append(this.el());
        }
        return this;
    },

    el: function () {
        return this.get('$element');
    },
    init: function (data) {

        if (this._super)
            this._super();

        if (data) {
            if (data.parentElement) {
                this.set('$element', data.parentElement);
            }
        }



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
    postRender: function() {

    }
});
