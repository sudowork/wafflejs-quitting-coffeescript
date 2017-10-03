![Decaffeinated Coffee](resources/img/slides/decaf.jpg)

===

# Strategies

===

## Automate

===

## Start with Tests

===

## From Outside In

```javascript
function Foo() {
  return Foo.__super__.constructor.apply(this, arguments);
}
```
![Layered Onion](resources/img/slides/layeredonion.jpg)

note:
- Because converted CoffeeScript files produce ES5 classes that can't extend ES6 classes
- Not an issue in CS2

===

## Start with Smaller Projects

===

## Hold Code Moratoriums

note:
- Coordinate with team
- Don't want to collide on commits

===

## Parallelize

note:
- Benefit that everyone is familiar with the convrsion process + ES6
- Benefit from people already being familiar w/ code and what it should do

===

## Set a Deadline

===

## 🎉🎊🍾

![Houdini Escape Room](resources/img/slides/escape.jpg)

===

# Tactics (Tools)

===

## [`decaffeinate`](http://decaffeinate-project.org/)

note:
- Fully automated conversion
- For things it can't fix, tips on how to fix it
- Preserve whitespace, formatting
- Focus on correctness

===

## [ESLint](https://eslint.org/)

===

## [`jscodeshift`](https://github.com/facebook/jscodeshift)

===

## [`bulk-decaffeinate`](https://github.com/decaffeinate/bulk-decaffeinate)

===

## Dealing with Bound Subclass Methods

```coffeescript
class Foo extends Bar
  baz: 42
  buzz: => console.log(@baz)
```

```coffeescript
class Foo extends Bar
  baz: 42
  buzz: -> console.log(@baz)
```

===

### Solution

Pre-conversion:

```bash
find . -name "*.coffee" | xargs perl -pi -e 's/^(  \w+:.*)=>$/\1->/g'
```

As part of conversion:

[jscodemod for binding call sites](https://github.com/DataFoxCo/jscodemods/blob/master/decaffeinate/bind-iteratee-and-callback-methods.js)
