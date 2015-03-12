[![Build Status](https://travis-ci.org/bakerface/fluent-request.svg)](https://travis-ci.org/bakerface/fluent-request) [![Coverage Status](https://coveralls.io/repos/bakerface/fluent-request/badge.svg)](https://coveralls.io/r/bakerface/fluent-request)

# fluent-request
**A fluent interface for HTTP requests in Node.js**

### Table of Contents
- [request(options)](#requestoptions)
- [request.del(options)](#requestdeloptions)
- [request.get(options)](#requestgetoptions)
- [request.head(options)](#requestheadoptions)
- [request.merge(options)](#requestmergeoptions)
- [request.patch(options)](#requestpatchoptions)
- [request.post(options)](#requestpostoptions)
- [request.put(options)](#requestputoptions)
- [request.withContent(content)](#requestwithcontentcontent)
- [request.withContentType(type)](#requestwithcontenttypetype)
- [request.withForm(form)](#requestwithformform)
- [request.withHeader(key, value)](#requestwithheaderkeyvalue)
- [request.withJSON(json)](#requestwithjsonjson)
- [request.withMethod(method)](#requestwithmethodmethod)
- [request.withPath(path)](#requestwithpathpath)
- [request.withPathSection(index, section)](#requestwithpathsectionindexsection)
- [request.withUserAgent(userAgent)](#requestwithuseragentuseragent)
- [request.withQuery(key, value)](#requestwithquerykeyvalue)

### request(options)
Sends a request with the specified *options*. The *options* may be a string or an object. If *options* is a string, it will be parsed immediately with [url.parse()](https://nodejs.org/api/url.html#url_url_parse_urlstr_parsequerystring_slashesdenotehost). If *options* is an object, it should have the following properties:

- **protocol**: The transmission protocol (defaults to ```'http:'```).
- **hostname**: A domain name or IP address of the server (defaults to ```'localhost'```).
- **port**: The port of the server (defaults to ```80``` for http and ```443``` for https).
- **method**: The request method (defaults to ```'GET'```).
- **path**: The request path including the query string (defaults to ```'/'```).
- **headers**: An object containing the request headers (defaults to ```{}```).

``` javascript
var request = require('fluent-request');

var options = {
  protocol: 'https:',
  hostname: 'api.github.com',
  port: 443,
  method: 'GET',
  path: '/repos/bakerface/fluent-request',
  headers: {
    'User-Agent': 'bakerface'
  }
};

request(options)
  .then(function(response) {
    // the http response object
  })
  .catch(function(reason) {
    // an error occurred
  });
```

### request.del(options)
Sends a DELETE request with the specified *options*. This is a convenience method for ```request(options).withMethod('DELETE')```.

``` javascript
var request = require('fluent-request');

request.del('https://api.github.com')
  .withPath('/repos/bakerface/fluent-request')
  .withUserAgent('bakerface')
  .then(function(response) {
    // the http response object
  })
  .catch(function(reason) {
    // an error occurred
  });
```

### request.get(options)
Sends a GET request with the specified *options*. This is a convenience method for ```request(options).withMethod('GET')```.

``` javascript
var request = require('fluent-request');

request.get('https://api.github.com')
  .withPath('/repos/bakerface/fluent-request')
  .withUserAgent('bakerface')
  .then(function(response) {
    // the http response object
  })
  .catch(function(reason) {
    // an error occurred
  });
```

### request.head(options)
Sends a HEAD request with the specified *options*. This is a convenience method for ```request(options).withMethod('HEAD')```.

``` javascript
var request = require('fluent-request');

request.head('https://api.github.com')
  .withPath('/repos/bakerface/fluent-request')
  .withUserAgent('bakerface')
  .then(function(response) {
    // the http response object
  })
  .catch(function(reason) {
    // an error occurred
  });
```

### request.merge(options)
Sends a MERGE request with the specified *options*. This is a convenience method for ```request(options).withMethod('MERGE')```.

``` javascript
var request = require('fluent-request');

request.merge('https://api.github.com')
  .withPath('/repos/bakerface/fluent-request')
  .withUserAgent('bakerface')
  .withJSON({
    name: 'fluent-request',
    description: 'A fluent interface for HTTP requests in Node.js'
  })
  .then(function(response) {
    // the http response object
  })
  .catch(function(reason) {
    // an error occurred
  });
```

### request.patch(options)
Sends a PATCH request with the specified *options*. This is a convenience method for ```request(options).withMethod('PATCH')```.

``` javascript
var request = require('fluent-request');

request.patch('https://api.github.com')
  .withPath('/repos/bakerface/fluent-request')
  .withUserAgent('bakerface')
  .withJSON({
    name: 'fluent-request',
    description: 'A fluent interface for HTTP requests in Node.js'
  })
  .then(function(response) {
    // the http response object
  })
  .catch(function(reason) {
    // an error occurred
  });
```

### request.post(options)
Sends a POST request with the specified *options*. This is a convenience method for ```request(options).withMethod('POST')```.

``` javascript
var request = require('fluent-request');

request.post('https://api.github.com')
  .withPath('/user/repos')
  .withUserAgent('bakerface')
  .withJSON({
    name: 'fluent-request',
    description: 'A fluent interface for HTTP requests in Node.js'
  })
  .then(function(response) {
    // the http response object
  })
  .catch(function(reason) {
    // an error occurred
  });
```

### request.put(options)
Sends a PUT request with the specified *options*. This is a convenience method for ```request(options).withMethod('PUT')```.

``` javascript
var request = require('fluent-request');

request.put('https://api.github.com')
  .withPath('/repos/bakerface/fluent-request')
  .withUserAgent('bakerface')
  .withJSON({
    name: 'fluent-request',
    description: 'A fluent interface for HTTP requests in Node.js'
  })
  .then(function(response) {
    // the http response object
  })
  .catch(function(reason) {
    // an error occurred
  });
```

### request.withContent(content)
Sets the content for the HTTP request. This must be UTF8 encoded string. This must be used in combination with [withContentType](#requestwithcontenttypetype).

``` javascript
var request = require('fluent-request');

request.patch('https://api.github.com')
  .withPath('/repos/bakerface/fluent-request')
  .withUserAgent('bakerface')
  .withContentType('application/json')
  .withContent('{"name":"fluent-request","description":"A fluent interface for HTTP requests in Node.js"}')
  .then(function(response) {
    // the http response object
  })
  .catch(function(reason) {
    // an error occurred
  });
```

### request.withContentType(type)
Sets the ```'Content-Type'``` header for the HTTP request. This must be used in combination with [withContent](#requestwithcontentcontent).

``` javascript
var request = require('fluent-request');

request.patch('https://api.github.com')
  .withPath('/repos/bakerface/fluent-request')
  .withUserAgent('bakerface')
  .withContentType('application/json')
  .withContent('{"name":"fluent-request","description":"A fluent interface for HTTP requests in Node.js"}')
  .then(function(response) {
    // the http response object
  })
  .catch(function(reason) {
    // an error occurred
  });
```

### request.withForm(form)
Sets the form content for the HTTP request. This is a convenience method for ```request.withContentType('application/x-www-form-urlencoded').withContent(url.encode(form))```.

``` javascript
var request = require('fluent-request');

request.post('https://api.github.com')
  .withPath('/repos/bakerface/fluent-request')
  .withUserAgent('bakerface')
  .withForm({
    name: 'fluent-request',
    description: 'A fluent interface for HTTP requests in Node.js'
  })
  .then(function(response) {
    // the http response object
  })
  .catch(function(reason) {
    // an error occurred
  });
```

### request.withHeader(key, value)
Sets the header for the HTTP request. The *key* must be a string. The *value* is transformed to a string with ```toString()```.

``` javascript
var request = require('fluent-request');

request.get('https://api.github.com')
  .withPath('/repos/bakerface/fluent-request')
  .withHeader('User-Agent', 'bakerface')
  .then(function(response) {
    // the http response object
  })
  .catch(function(reason) {
    // an error occurred
  });
```

### request.withJSON(json)
Sets the JSON content for the HTTP request. This is a convenience method for ```request.withContentType('application/json').withContent(JSON.stringify(json))```.

``` javascript
var request = require('fluent-request');

request.patch('https://api.github.com')
  .withPath('/repos/bakerface/fluent-request')
  .withUserAgent('bakerface')
  .withJSON({
    name: 'fluent-request',
    description: 'A fluent interface for HTTP requests in Node.js'
  })
  .then(function(response) {
    // the http response object
  })
  .catch(function(reason) {
    // an error occurred
  });
```

### request.withMethod(method)
Sets the method for the HTTP request. This function allows for custom HTTP verbs that are not supplied as a convenience function.

``` javascript
var request = require('fluent-request');

request('https://api.github.com')
  .withMethod('PATCH')
  .withPath('/repos/bakerface/fluent-request')
  .withUserAgent('bakerface')
  .withJSON({
    name: 'fluent-request',
    description: 'A fluent interface for HTTP requests in Node.js'
  })
  .then(function(response) {
    // the http response object
  })
  .catch(function(reason) {
    // an error occurred
  });
```

### request.withPath(path)
Sets the path for the HTTP request. This must not include the query string.

``` javascript
var request = require('fluent-request');

request.patch('https://api.github.com')
  .withPath('/repos/bakerface/fluent-request')
  .withUserAgent('bakerface')
  .withJSON({
    name: 'fluent-request',
    description: 'A fluent interface for HTTP requests in Node.js'
  })
  .then(function(response) {
    // the http response object
  })
  .catch(function(reason) {
    // an error occurred
  });
```

### request.withPathSection(index, section)
Modifies the path for the HTTP request by changing a section of the path.

``` javascript
var request = require('fluent-request');

request.patch('https://api.github.com')
  .withPath('/repos/bakerface/:repo')
  .withPathSection(2, 'fluent-request')
  .withUserAgent('bakerface')
  .withJSON({
    name: 'fluent-request',
    description: 'A fluent interface for HTTP requests in Node.js'
  })
  .then(function(response) {
    // the http response object
  })
  .catch(function(reason) {
    // an error occurred
  });
```

### request.withUserAgent(userAgent)
Sets the ```'User-Agent'``` header for the HTTP request.

``` javascript
var request = require('fluent-request');

request.patch('https://api.github.com')
  .withPath('/repos/bakerface/fluent-request')
  .withUserAgent('bakerface')
  .withJSON({
    name: 'fluent-request',
    description: 'A fluent interface for HTTP requests in Node.js'
  })
  .then(function(response) {
    // the http response object
  })
  .catch(function(reason) {
    // an error occurred
  });
```

### request.withQuery(key, value)
Sets the query parameter for the HTTP request. The *key* must be a string. The *value* is transformed to a string with ```toString()```.

``` javascript
var request = require('fluent-request');

request.get('https://api.github.com')
  .withPath('/user/repos')
  .withQuery('page', 1)
  .withQuery('per_page', 100)
  .withUserAgent('bakerface')
  .then(function(response) {
    // the http response object
  })
  .catch(function(reason) {
    // an error occurred
  });
```
