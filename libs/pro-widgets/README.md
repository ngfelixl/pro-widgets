# Angular Pro Widgets

<!-- prettier-ignore -->
[![Build Status](https://travis-ci.org/ngfelixl/pro-widgets.svg?branch=master)](https://travis-ci.org/ngfelixl/pro-widgets)
[![npm](https://img.shields.io/npm/v/pro-widgets.svg)](https://npmjs.com/package/pro-widgets)
![npm](https://img.shields.io/npm/dt/pro-widgets.svg)
![NPM](https://img.shields.io/npm/l/pro-widgets.svg)
![GitHub repo size](https://img.shields.io/github/repo-size/ngfelixl/pro-widgets.svg)
![Github code size](https://img.shields.io/github/languages/code-size/ngfelixl/pro-widgets.svg)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

This library provides animated and highly customizable
SVG widgets for use with IoT or other data visualization
tasks. It has an easy to use interface as you will see in
this description. See the library in action while reading the
[documentation](https://ngfelixl.github.io/pro-widgets) and
live-play with all the parameters.

This is currently in an early stage. API changes are likely.
It follows semantic versioning.

<img src="https://raw.githubusercontent.com/ngfelixl/pro-widgets/master/assets/widgets.png" alt="Widgets" width="100%">

Currently available widgets are **Gauge**, **Digital Gauge**, **Linear Gauge**, **Analog Stick** and **Space Tracker**.
More widgets coming soon. Widget ideas/implementations/issue reporting/PRs welcome.

## Installation

Install the library with

```
npm install pro-widgets
```

## Importing the module and use the components

At first you have to import the `ProModule` into the module
in which you want to use the widgets. For example in the
root module.

```typescript
import { ProModule } from 'pro-widgets';

@NgModule({
  import: [ProModule]
})
export class AppModule {}
```

You can import each widget manually by importing e.g. `LinearGaugeModule`.
Use the widgets in your components template by

```html
<pro-gauge [value]="stream$ | async"></pro-gauge>
<pro-digital-gauge></pro-digital-gauge>
<pro-analog-stick></pro-analog-stick>
<pro-linear-gauge></pro-linear-gauge>
<pro-space-tracker></pro-space-tracker>
```

See the [docs](https://ngfelixl.github.io/pro-widgets) to
get to know the full list of input parameters for customizing
the widgets to your needs.

## Input value shapes

Some widgets require a different shape of data input for the
`value` input property. Most of them are requiring a primitive
`number` or an array of numbers. The *space-tracker* requires
the following type

```typescript
interface MultiDimensional {
  [id: string]: number[];
}
```

Here is an overview of all widget value inputs

| Widget        | Value type       |
|---------------|------------------|
| Gauge         | number           |
| Digital Gauge | number           |
| Linear Gauge  | number           |
| Analog Stick  | number[2]        |
| Space Tracker | MultipleInputs   |

## Contributing

Contributions in all forms are welcome. Widget ideas, feature requests, bug reports, etc.
PR contributors will be mentioned in here.

## Get in touch

<!-- prettier-ignore -->
[![twitter](https://img.shields.io/badge/twitter-%40ngfelixl-blue.svg?logo=twitter)](https://twitter.com/intent/follow?screen_name=ngfelixl)
[![github](https://img.shields.io/badge/github-%40ngfelixl-blue.svg?logo=github)](https://github.com/ngfelixl)

Hi, I am Felix,
Software developer and Angular, NgRX contributor

![avatar](https://avatars2.githubusercontent.com/u/24190530?s=200&v=4)

If you like this library, think about giving it a star or follow me on twitter or github or check out my personal
the [website](https://felixlemke.com).
