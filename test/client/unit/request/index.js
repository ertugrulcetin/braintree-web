'use strict';

var request = require('../../../../src/client/request');
var AJAXDriver = require('../../../../src/client/request/ajax-driver');

describe('Client request driver', function () {
  beforeEach(function () {
    this.sandbox.stub(AJAXDriver, 'request');
  });

  it('defaults the timeout if not given', function () {
    request({
    }, function () {});

    expect(AJAXDriver.request).to.be.calledWith(this.sandbox.match({
      timeout: 60000
    }));
  });

  it('defaults the data if not given', function () {
    request({
    }, function () {});

    expect(AJAXDriver.request).to.be.calledWith(this.sandbox.match({
      data: {}
    }));
  });

  it('defaults the method if not given', function () {
    request({
    }, function () {});

    expect(AJAXDriver.request).to.be.calledWith(this.sandbox.match({
      method: 'GET'
    }));
  });

  it('uppercases the method if given', function () {
    request({
      method: 'post'
    }, function () {});

    expect(AJAXDriver.request).to.be.calledWith(this.sandbox.match({
      method: 'POST'
    }));
  });

  it('prevents the callback from being accidentally invoked multiple times', function () {
    var count = 0;

    function callback() {
      count++;
    }

    AJAXDriver.request.restore();
    this.sandbox.stub(AJAXDriver, 'request').callsFake(function (_, cb) {
      cb();
      cb();
      cb();
    });

    request({
      method: 'post'
    }, callback);

    expect(count).to.equal(1);
  });
});
