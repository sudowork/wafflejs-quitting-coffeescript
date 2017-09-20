## Our WebApp Codebase

~200,000 Lines of CoffeeScript

~1,400 CoffeeScript Files

note:
- At the time we decided to make the switch

===

# So Why Switch?

note:
- First and foremost...

===

## Community

<img src="resources/img/slides/wafflejs-community.jpg" alt="WaffleJS Community Photo" width="70%">

note:
- All of you
- Technology is moving fast
- Despite the learning curve, explosion of new JS devs
- Support: meetups, conferences, articles, etc.

===

### TC39

![TC39 GitHub Stats](resources/img/slides/tc39.png)

note:
- Introduce changes to the ECMAScript spec in a somewhat agreed upon way

===

![State of JavaScript 2016 Flavors Results](resources/img/slides/state-of-js-flavors.png)

Credit: [State of JavaScript 2016](http://stateofjs.com/2016/flavors/)

note:
- Just for comparison's sake

===

TODO: JavaScript vs CoffeeScript PR stats chart

note:
- Give nod to CoffeeScript 2

===

## Tooling

note:
- Many of these rely on static analysis (analyzing Abstract Syntax Tree), not to say you can't statically analyze CoffeeScript
  - AST is just a fancy way of describing a program
- But there's just a lack of tooling/community around it in comparison

===

### [AST Explorer](https://astexplorer.net)

<img src="resources/img/slides/astexplorer.png" alt="AST Explorer Screenshot" width="60%">

Also see [ESTree](https://github.com/estree/estree) for the specification

note:
- Allows you to explore the AST

===

### Editors/IDEs

![Visual Studio Code IntelliSense](resources/img/slides/vscode-intellisense.gif)

note:
- Personally, I would recommend VS Code and IntelliJ
- VSCode IntelliSense out of the box for JS

---

![Visual Studio Code Automatic Type Acquisition](resources/img/slides/vscode-ata.png)

===

### Other Tools

- Linting: [ESLint](https://eslint.org/)
- Code Formatting: [Prettier](https://github.com/prettier/prettier)
- Refactoring: [jscodeshift](https://github.com/facebook/jscodeshift)
- Type Checking: [flow](https://flow.org/), [Tern.js](http://ternjs.net/), [TypeScript](https://www.typescriptlang.org/)
- Bundlers: [Webpack](https://webpack.js.org/), [Rollup](https://rollupjs.org/)

<!-- TODO: Consider splitting these out into their own slides with graphics? -->

note:
- TypeScript is used by VSCode for type inference + type definitions
- Bundlers utilize ES2015 module spec
  - Code splitting
  - Code liveness

===

### Standardization

![Kangax ES2015 Compatibility Table](resources/img/slides/kangax.png)

===

### Hiring and Onboarding

<img src="resources/img/slides/datafox.jpg" alt="DataFox Crew" width="70%">

note:
- Tying back to community
- Lots of quality learning material readily accessible for free
