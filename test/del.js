var nock = require('nock');
var should = require('should');
var request = require('..');

describe('request.del(options)', function() {
  beforeEach(function() {
    nock.disableNetConnect();
  })

  afterEach(function() {
    nock.enableNetConnect();
  })

  it('should handle request errors', function(done) {
    request.del('https://somewhere.com')
      .catch(function(reason) {
        done();
      });
  })

  it('should handle explicit http endpoints', function(done) {
    nock('http://somewhere.com')
      .delete('/')
      .reply(200, 'success');

    request.del('http://somewhere.com')
      .then(function(response) {
        should(response.body).eql('success');
        done();
      });
  })

  it('should handle explicit https endpoints', function(done) {
    nock('https://somewhere.com')
      .delete('/')
      .reply(200, 'success');

    request.del('https://somewhere.com')
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
      .delete('/')
      .reply(200, 'success');

    request.del('https://somewhere.com')
      .withHeader('foo', '1')
      .withHeader('bar', '2')
      .then(function(response) {
        should(response.body).eql('success');
        done();
      });
  })

  it('should handle custom queries', function(done) {
    nock('https://somewhere.com')
      .delete('/?foo=1&bar=2')
      .reply(200, 'success');

    request.del('https://somewhere.com')
      .withQuery('foo', '1')
      .withQuery('bar', '2')
      .then(function(response) {
        should(response.body).eql('success');
        done();
      });
  })

  it('should handle custom paths', function(done) {
    nock('https://somewhere.com')
      .delete('/path/to/value')
      .reply(200, 'success');

    request.del('https://somewhere.com')
      .withPath('/path/to/value')
      .then(function(response) {
        should(response.body).eql('success');
        done();
      });
  })

  it('should handle json body', function(done) {
    nock('https://somewhere.com')
      .delete('/')
      .reply(200, { message: 'success' });

    request.del('https://somewhere.com')
      .then(function(response) {
        should(response.body).eql({
          message: 'success'
        });

        done();
      });
  })

  it('should handle failure responses', function(done) {
    nock('https://somewhere.com')
      .delete('/')
      .reply(400, { message: 'failure' });

    request.del('https://somewhere.com')
      .then(function(response) {
        should(response.body).eql({
          message: 'failure'
        });

        done();
      });
  })

  it('should handle http options', function(done) {
    nock('http://somewhere.com')
      .delete('/path')
      .reply(200, 'success');

    var options = {
      hostname: 'somewhere.com',
      path: '/path'
    };

    request.del(options)
      .then(function(response) {
        should(response.body).eql('success');
        done();
      });
  })

  it('should handle path rewriting', function(done) {
    nock('http://somewhere.com')
      .delete('/path')
      .reply(200, 'success');

    request.del('http://somewhere.com/path/to/nowhere')
      .withPath('/path')
      .then(function(response) {
        should(response.body).eql('success');
        done();
      });
  })

  it('should handle path after query', function(done) {
    nock('http://somewhere.com')
      .delete('/path?foo=bar')
      .reply(200, 'success');

    request.del('http://somewhere.com')
      .withQuery('foo', 'bar')
      .withPath('/path')
      .then(function(response) {
        should(response.body).eql('success');
        done();
      });
  })

  it('should handle path sections', function(done) {
    nock('http://somewhere.com')
      .delete('/path/to/value')
      .reply(200, 'success');

    request.del('http://somewhere.com')
      .withPath('/path/to/nowhere')
      .withPathSection(2, 'value')
      .then(function(response) {
        should(response.body).eql('success');
        done();
      });
  })

  it('should handle plain content', function(done) {
    nock('http://somewhere.com')
      .delete('/', 'content')
      .reply(200, 'success');

    request.del('http://somewhere.com')
      .withContent('content')
      .then(function(response) {
        should(response.body).eql('success');
        done();
      });
  })

  it('should handle json content', function(done) {
    nock('http://somewhere.com')
      .delete('/', { content: 'value' })
      .reply(200, 'success');

    request.del('http://somewhere.com')
      .withJSON({ content: 'value' })
      .then(function(response) {
        should(response.body).eql('success');
        done();
      });
  })

  it('should handle form content', function(done) {
    nock('http://somewhere.com')
      .delete('/', 'foo=1&bar=2')
      .reply(200, 'success');

    request.del('http://somewhere.com')
      .withForm({ foo: 1, bar: 2 })
      .then(function(response) {
        should(response.body).eql('success');
        done();
      });
  })
})
