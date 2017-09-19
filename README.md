# Quitting Coffee(Script) - Kevin Gao

A talk for the WaffleJS October 2017 meetup.

![WaffleJS Logo](resources/img/wmo.png)

## Description

Coffee is an essential part of many developers’ lives, but sometimes we need to cut back.
In this talk, I’ll show you how a small team of engineers safely and efficiently converted hundreds of thousands of lines of CoffeeScript, spanning thousands of files into modern JavaScript over a short span of time.
I’ll go over why we made the switch, how I got buy-in, and how the team was able to stay productive throughout the conversion.

## Installation

```shell
git clone git@github.com:sudowork/wafflejs-quitting-coffeescript.git
cd wafflejs-quitting-coffeescript
yarn
bower install
```

## Development

```shell
yarn start  # Starts the development server with live-reload
yarn deploy # Compiles presentation and deploys to GitHub Pages
yarn test   # Lints files

yarn slide "Slide Title"         # Generates a new slide and appends it to the presentation
yarn slide "Slide Title" --notes # Generates a new slide with speaker notes
```
