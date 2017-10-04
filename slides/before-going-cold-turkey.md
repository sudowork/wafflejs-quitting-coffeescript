# Before Going Cold Turkey

===

## Know What You're Getting Into

<img
  class="fragment"
  src="resources/img/slides/dj-khaled.gif"
  alt="DJ Khaled saying, &ldquo;Congratulations, you played yourself.&rdquo;"
>

note:
- Otherwise you might end up getting a visit from DJ Khaled

===

### Some Things to Check Off

- Learn [ES2015](https://babeljs.io/learn-es2015/)
- [`cloc`](https://github.com/AlDanial/cloc)
- Test coverage
- Know your build tools
- Ignorefiles (`.gitignore`, `.eslintignore`, etc.)
- Try it out

note:
- Learn ES2015 and learn it well.
  - Write some projects in modern JavaScript
  - Want to be a resource for your team
- Use a tool like cloc (count lines of code) to see how much work you have cut out
- Measure (and improve if necessary) your test coverage.
  - Want to be confident
- Understand how your CoffeeScript is being built/compiled now
  - May have to change or modify for ES2015
- Identify ignorefiles to make sure you won't be ignoring or not linting JS
- Try it out for yourself, convert representative files

===

## Getting Buy-In

<img
  class="fragment"
  src="resources/img/slides/inception.gif"
  alt="Inception cinemagraph"
>

note:
- In addition to knowing how much effort it will take, you need to convince your team and get buy-in
- Get people excited about modern JavaScript
- In other words, inception
- Here are some ideas to try

===

### Host a [Lunch & Learn](https://jsbin.com/vipugul/34/edit?js,console,output)

note:
- I've linked to the one I presented (months before converting)

===

### Identify real problems

note:
- Failed tests due to compilation
- Test stack traces
- Ember-cli support for CS
- Source maps are a pain
- Debugging production

===

### Establish a ES2015+ [style guide](https://github.com/airbnb/javascript)

note:
- Spend a good amount of time on this, want to be happy with the end result
- Enforce it using ESLint
  - Can utilize --fix
- Airbnb is a good place to start

===

### Show the developer experience

note:
- Developers love shiny things
- Provide documentation

===

### Do a proof of concept

note:
- smaller, less critical project and run it in production

===

### Provide [documentation](http://eng.datafox.com/javascript/2017/07/18/decaffeinating-large-coffeescript-codebase/#step-by-step-instructions-for-converting-a-project)

note:
- Linked to a more public-facing version of our step by step process

===

### Subscribe/share [JavaScript Weekly](http://javascriptweekly.com/) articles

<img
  src="resources/img/slides/slack-javascript.png"
  alt="Starting the #javascript Slack channel"
  width="70%"
>

<img
  class="fragment"
  src="resources/img/slides/slack-javascript-start.png"
  alt="Response to creating channel"
  width="70%"
>

<img
  class="fragment"
  src="resources/img/slides/slack-javascript-present.png"
  alt="Catching on"
  width="70%"
>

note:
- Create a slack channel
