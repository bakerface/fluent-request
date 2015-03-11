/**
 * Copyright (c) 2015 Christopher M. Baker
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

'use strict';

var url = require('url');
var when = require('when');
var http = require('http');
var https = require('https');

Function.prototype.curry = function() {
  var fun = this;
  var args = [].slice.call(arguments, 0);

  return function() {
    return fun.apply(this, args.concat([].slice.call(arguments, 0)));
  };
};

var request = module.exports = function(options) {
  if (typeof(options) === 'string') {
    options = url.parse(options);
  }

  return {
    __proto__: send(options),
    withHeader: withHeader.curry(options),
    withMethod: withMethod.curry(options),
    withPath: withPath.curry(options),
    withPathSection: withPathSection.curry(options),
    withQuery: withQuery.curry(options)
  };
};

var get = request.get = function(options) {
  return request(options).withMethod('GET');
};

function withHeader(options, key, value) {
  options.headers = options.headers || { };
  options.headers[key] = value.toString();
  return this;
}

function withMethod(options, method) {
  options.method = method;
  return this;
}

function withPath(options, path) {
  options.pathname = options.path = path;

  if (options.search) {
    options.path += options.search;
  }

  return this;
}

function withPathSection(options, index, value) {
  var path = options.pathname.split('/');
  path[index + 1] = value;
  path = path.join('/');

  return this.withPath(path);
}

function withQuery(options, key, value) {
  var pair = encodeURIComponent(key) + '=' + encodeURIComponent(value);

  if (options.search) {
    options.search += '&' + pair;
    options.query += '&' + pair;
  }
  else {
    options.search = '?' + pair;
    options.query = pair;
  }

  options.path = options.pathname + options.search;
  return this;
}

function format(response) {
  var type = response.headers['content-type'] || '';

  if (type.match(/json/)) {
    response.body = JSON.parse(response.body);
  }

  return response;
}

function send(options) {
  return when().then(function() {
    return when.promise(function(resolve, reject) {
      var protocol = options.protocol === 'https:' ? https : http;

      var request = protocol.request(options, function(response) {
        response.body = '';
        response.setEncoding('utf8');

        response.on('data', function(data) {
          response.body += data;
        });

        response.on('end', function() {
          resolve(format(response));
        });
      });

      request.once('error', function(error) {
        reject(error);
      });

      request.end();
    });
  });
}
