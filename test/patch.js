var nock = require('nock');
var should = require('should');
var request = require('..');

describe('request.patch(options)', function() {
  beforeEach(function() {
    nock.disableNetConnect();
  })

  afterEach(function() {
    nock.enableNetConnect();
  })

  it('should handle request errors', function(done) {
    request.patch('https://somewhere.com')
      .catch(function(reason) {
        done();
      });
  })

  it('should handle explicit http endpoints', function(done) {
    nock('http://somewhere.com')
      .patch('/')
      .reply(200, 'success');

    request.patch('http://somewhere.com')
      .then(function(response) {
        should(response.body).eql('success');
        done();
      });
  })

  it('should handle explicit https endpoints', function(done) {
    nock('https://somewhere.com')
      .patch('/')
      .reply(200, 'success');

    request.patch('https://somewhere.com')
      .then(function(response) {
        should(response.body).eql('success');
        done();
      });
  })

  it('should handle custom headers', function(done) {
    var options = {
      reqheaders: {
        foo: '1',
        bar: '2'
      }
    };

    nock('https://somewhere.com', options)
      .patch('/')
      .reply(200, 'success');

    request.patch('https://somewhere.com')
      .withHeader('foo', '1')
      .withHeader('bar', '2')
      .then(function(response) {
        should(response.body).eql('success');
        done();
      });
  })

  it('should handle custom queries', function(done) {
    nock('https://somewhere.com')
      .patch('/?foo=1&bar=2')
      .reply(200, 'success');

    request.patch('https://somewhere.com')
      .withQuery('foo', '1')
      .withQuery('bar', '2')
      .then(function(response) {
        should(response.body).eql('success');
        done();
      });
  })

  it('should handle custom paths', function(done) {
    nock('https://somewhere.com')
      .patch('/path/to/value')
      .reply(200, 'success');

    request.patch('https://somewhere.com')
      .withPath('/path/to/value')
      .then(function(response) {
        should(response.body).eql('success');
        done();
      });
  })

  it('should handle json body', function(done) {
    nock('https://somewhere.com')
      .patch('/')
      .reply(200, { message: 'success' });

    request.patch('https://somewhere.com')
      .then(function(response) {
        should(response.body).eql({
          message: 'success'
        });

        done();
      });
  })

  it('should handle failure responses', function(done) {
    nock('https://somewhere.com')
      .patch('/')
      .reply(400, { message: 'failure' });

    request.patch('https://somewhere.com')
      .then(function(response) {
        should(response.body).eql({
          message: 'failure'
        });

        done();
      });
  })

  it('should handle http options', function(done) {
    nock('http://somewhere.com')
      .patch('/path')
      .reply(200, 'success');

    var options = {
      hostname: 'somewhere.com',
      path: '/path'
    };

    request.patch(options)
      .then(function(response) {
        should(response.body).eql('success');
        done();
      });
  })

  it('should handle path rewriting', function(done) {
    nock('http://somewhere.com')
      .patch('/path')
      .reply(200, 'success');

    request.patch('http://somewhere.com/path/to/nowhere')
      .withPath('/path')
      .then(function(response) {
        should(response.body).eql('success');
        done();
      });
  })

  it('should handle path after query', function(done) {
    nock('http://somewhere.com')
      .patch('/path?foo=bar')
      .reply(200, 'success');

    request.patch('http://somewhere.com')
      .withQuery('foo', 'bar')
      .withPath('/path')
      .then(function(response) {
        should(response.body).eql('success');
        done();
      });
  })

  it('should handle path sections', function(done) {
    nock('http://somewhere.com')
      .patch('/path/to/value')
      .reply(200, 'success');

    request.patch('http://somewhere.com')
      .withPath('/path/to/nowhere')
      .withPathSection(2, 'value')
      .then(function(response) {
        should(response.body).eql('success');
        done();
      });
  })

  it('should handle plain content', function(done) {
    nock('http://somewhere.com')
      .patch('/', 'content')
      .reply(200, 'success');

    request.patch('http://somewhere.com')
      .withContent('content')
      .then(function(response) {
        should(response.body).eql('success');
        done();
      });
  })

  it('should handle json content', function(done) {
    nock('http://somewhere.com')
      .patch('/', { content: 'value' })
      .reply(200, 'success');

    request.patch('http://somewhere.com')
      .withJSON({ content: 'value' })
      .then(function(response) {
        should(response.body).eql('success');
        done();
      });
  })

  it('should handle form content', function(done) {
    nock('http://somewhere.com')
      .patch('/', 'foo=1&bar=2')
      .reply(200, 'success');

    request.patch('http://somewhere.com')
      .withForm({ foo: 1, bar: 2 })
      .then(function(response) {
        should(response.body).eql('success');
        done();
      });
  })
})
