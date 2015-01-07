// Copyright (c) Visual Data Solutions, Inc. All rights reserved. This source code is distributed under the terms of the MIT license. See LICENSE file in the project root for complete license information.

/*jshint expr: true*/

var chai = require('chai');
var expect = chai.expect;
var Widget = require('../lib/widget.js');


describe('Widget', function() {
    this.timeout(500);

    var widget;
    beforeEach(function() {
        widget = new Widget();
    });

    it('should do something', function(done) {
//        source.on('event', function() {
//            done();
//        });
        done();
//        source.emit('event');
    });
});
