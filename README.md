# fluent-request
**A fluent interface for HTTP requests in Node.js**

### request.get(options)
Sends a GET request to the specified endpoint. The *options* parameter is passed to [http.request()](https://nodejs.org/api/http.html#http_http_request_options_callback); therefore, it may be an object or a string to be parsed by [url.parse()](https://nodejs.org/api/url.html#url_url_parse_urlstr_parsequerystring_slashesdenotehost). Below is an example of sending a GET request.

``` javascript
var request = require('fluent-request');

request.get('http://somewhere.com')
  .withPath('/users')
  .withQuery('page', 1)
  .withQuery('per_page', 10)
  .withHeader('User-Agent', 'fluent-request')
  .then(function(response) {
    // the http response object
  })
  .catch(function(reason) {
    // an error occurred
  });
```

The code above will send the following request.

``` http
GET /users?page=1&per_page=10 HTTP/1.1
Host: somewhere.com
User-Agent: fluent-request

```

### request.post(options)
Sends a POST request to the specified endpoint. The *options* parameter is passed to [http.request()](https://nodejs.org/api/http.html#http_http_request_options_callback); therefore, it may be an object or a string to be parsed by [url.parse()](https://nodejs.org/api/url.html#url_url_parse_urlstr_parsequerystring_slashesdenotehost). Below are a few examples of sending a POST request.

#### Without content
Below is an example of sending a POST request without content.

``` javascript
var request = require('fluent-request');

request.post('http://somewhere.com')
  .withPath('/users')
  .withQuery('name', 'chris')
  .withQuery('role', 'admin')
  .withHeader('User-Agent', 'fluent-request')
  .then(function(response) {
    // the http response object
  })
  .catch(function(reason) {
    // an error occurred
  });
```

The code above will send the following request.

``` http
POST /users?name=chris&role=admin HTTP/1.1
Host: somewhere.com
User-Agent: fluent-request

```

#### With content
Below is an example of sending a POST request with content.

``` javascript
var request = require('fluent-request');

request.post('http://somewhere.com')
  .withPath('/users')
  .withHeader('User-Agent', 'fluent-request')
  .withContentType('text/plain')
  .withContent('chris:admin')
  .then(function(response) {
    // the http response object
  })
  .catch(function(reason) {
    // an error occurred
  });
```

The code above will send the following request.

``` http
POST /users HTTP/1.1
Host: somewhere.com
Content-Type: text/plain
User-Agent: fluent-request

chris:admin
```

#### With JSON content
Below is an example of sending a POST request with JSON content.

``` javascript
var request = require('fluent-request');

request.post('http://somewhere.com')
  .withPath('/users')
  .withHeader('User-Agent', 'fluent-request')
  .withJSON({
    name: 'chris',
    role: 'admin'
  })
  .then(function(response) {
    // the http response object
  })
  .catch(function(reason) {
    // an error occurred
  });
```

The code above will send the following request.

``` http
POST /users HTTP/1.1
Host: somewhere.com
Content-Type: application/json
User-Agent: fluent-request

{"name":"chris","role":"admin"}
```

#### With form content
Below is an example of sending a POST request with form content.

``` javascript
var request = require('fluent-request');

request.post('http://somewhere.com')
  .withPath('/users')
  .withHeader('User-Agent', 'fluent-request')
  .withForm({
    name: 'chris',
    role: 'admin'
  })
  .then(function(response) {
    // the http response object
  })
  .catch(function(reason) {
    // an error occurred
  });
```

The code above will send the following request.

``` http
POST /users HTTP/1.1
Host: somewhere.com
Content-Type: application/x-www-form-urlencoded
User-Agent: fluent-request

name=chris&role=admin
```
