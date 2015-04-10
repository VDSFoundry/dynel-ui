// Copyright (c) Visual Data Solutions, Inc. All rights reserved. This source code is distributed under the terms of the MIT license. See LICENSE file in the project root for complete license information.

var Widget = require('./widget.js');

module.exports = Widget.extend({

    getTemplateArgs: function () {

        if (this.updateTemplateArgs) {
            this.updateTemplateArgs();
        }

        var data = {};
        if (this.model) {
            data.model = this.model;
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

    draw: function (parentElement) {
        return this.renderTemplate();
    },

    init: function (data) {
        this._super();

        if (data && data.model)
            this.model = data.model;
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
    }
});
