'use strict';
/**
 * @module braintree-web/american-express
 * @description This module is for use with Amex Express Checkout. To accept American Express cards, use Hosted Fields.
 */

var BraintreeError = require('../lib/error');
var AmericanExpress = require('./american-express');
var deferred = require('../lib/deferred');
var VERSION = require('package.version');

/**
 * @static
 * @function create
 * @param {object} options Creation options:
 * @param {Client} options.client A {@link Client} instance.
 * @param {callback} callback The second argument, `data`, is the {@link AmericanExpress} instance.
 * @returns {void}
 */
function create(options, callback) {
  var clientVersion;

  if (typeof callback !== 'function') {
    throw new BraintreeError({
      type: BraintreeError.types.MERCHANT,
      message: 'create must include a callback function.'
    });
  }

  callback = deferred(callback);

  if (options.client == null) {
    callback(new BraintreeError({
      type: BraintreeError.types.MERCHANT,
      message: 'options.client is required when instantiating American Express.'
    }));
    return;
  }

  clientVersion = options.client.getConfiguration().analyticsMetadata.sdkVersion;
  if (clientVersion !== VERSION) {
    callback(new BraintreeError({
      type: BraintreeError.types.MERCHANT,
      message: 'Client (version ' + clientVersion + ') and American Express (version ' + VERSION + ') components must be from the same SDK version.'
    }));
    return;
  }

  callback(null, new AmericanExpress(options));
}

module.exports = {
  create: create,
  /**
   * @description The current version of the SDK, i.e. `{@pkg version}`.
   * @type {string}
   */
  VERSION: VERSION
};
