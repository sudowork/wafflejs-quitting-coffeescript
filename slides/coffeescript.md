# CoffeeScript

note:
- Before going into how to get rid of it

===

## What is CoffeeScript?

- Language that compiles into JavaScript
- Smooths over ["The Bad Parts"](https://arcturo.github.io/library/coffeescript/07_the_bad_parts.html) of JavaScript
- "Syntactic sugar"
- Inspired by languages like Ruby, Python, and Haskell

note:
- Poll how many people have used/seen CoffeeScript

===

### ES2015

```javascript
const {mapLimit} = require('async');
class FooSearchService extends AbstractService {
  performSearches(queries, cb) {
    const search = (query, done) => this._search(query, done);
    mapLimit(queries, 1, search, this.wrapCallback(cb));
  }
  _search(query, cb) {
    this.getSearchService().search(query, (err, results) => {
      if (err) {
        cb(err);
        return;
      }
      const {docs, numFound} = results;
      cb(null, {query, docs, numFound});
    });
  }
}
```

---

### CoffeeScript

```coffeescript
{mapLimit} = require('async')
class FooSearchService extends AbstractService
  performSearches: (queries, cb) ->
    search = (query, done) => @_search(query, done)
    mapLimit(queries, 1, performSearch, @wrapCallback(cb))

  _search: (query, cb) ->
    @getSearchService().search(query, (err, results) ->
      return cb(err) if err
      {docs, numFound} = results
      cb(null, {
        query: query,
        docs: docs,
        numFound: numFound,
      })
    )
```

---

<h3 class="horizontal-flip">🍭🍩🍪🍫🍬🌈🤢</h3>

```coffeescript
{mapLimit} = require('async')
class FooSearchService extends AbstractService
  performSearches: (queries, cb) ->
    search = (query, done) => @_search query, done
    mapLimit queries, 1, performSearch, @wrapCallback cb

  _search: (query, cb) ->
    @getSearchService().search query, (err, results) ->
      return cb err if err
      {docs, numFound} = results
      cb null,
        query: query
        docs: docs
        numFound: numFound
```

note:
- Easy (and fun) to write, harder to read
- Not to say the syntactic sugar isn't appreciated, RE: generated code

---

### Generated ES5

```javascript
var FooSearchService, mapLimit,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

mapLimit = require('async').mapLimit;

FooSearchService = (function(_super) {

  __extends(FooSearchService, _super);

  FooSearchService.name = 'FooSearchService';

  function FooSearchService() {
    return FooSearchService.__super__.constructor.apply(this, arguments);
  }

  FooSearchService.prototype.performSearches = function(queries, cb) {
    var search,
      _this = this;
    search = function(query, done) {
      return _this._search(query, done);
    };
    return mapLimit(queries, 1, performSearch, this.wrapCallback(cb));
  };

  FooSearchService.prototype._search = function(query, cb) {
    return this.getSearchService().search(query, function(err, results) {
      var docs, numFound;
      if (err) return cb(err);
      docs = results.docs, numFound = results.numFound;
      return cb(null, {
        query: query,
        docs: docs,
        numFound: numFound
      });
    });
  };

  return FooSearchService;

})(AbstractService);
```

===

## Our WebApp Codebase

~200,000 Lines of CoffeeScript

~1,400 CoffeeScript Files

note:
- At the time we decided to make the switch
