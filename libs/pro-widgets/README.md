# Angular Pro Widgets

[![Build Status](https://travis-ci.org/ngfelixl/pro-widgets.svg?branch=master)](https://travis-ci.org/ngfelixl/pro-widgets)
[![npm](https://img.shields.io/npm/v/pro-widgets.svg)](https://npmjs.com/package/pro-widgets)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

This library provides animated and highly customizable
SVG widgets for use with IoT or other data visualization
tasks. It has an easy to use interface as you will see in
this description. Also check out the customization features
in the [documentation](https://ngfelixl.github.io/pro-widgets).

This is currently in an early stage. API changes are likely.

<img src="https://raw.githubusercontent.com/ngfelixl/pro-widgets/master/assets/widgets.png" alt="Widgets" width="100%">

Currently available widgets:

- Gauge
- Digital Gauge
- Linear Gauge
- Analog Stick

more widgets coming soon. Widget ideas welcome.

## Installation

```
npm install pro-widgets
```

## Importing the module and use the components

At first you have to import the module into the module
in which you want to use the widgets. For example in the
root module.

```typescript
import { ProModule } from 'pro-widgets';

@NgModule({
  import: [ProModule]
})
export class AppModule {}
```

Use the widgets in your component template by

```html
<pro-gauge [value]="stream$ | async"></pro-gauge>
<pro-digital-gauge></pro-digital-gauge>
<pro-analog-stick></pro-analog-stick>
```

See the [docs](https://ngfelixl.github.io/pro-widgets) to
get to know the full list of input parameters to customize
the widgets for your needs.

## Get in touch

[![twitter](https://img.shields.io/badge/twitter-%40ngfelixl-blue.svg?logo=twitter)](https://twitter.com/intent/follow?screen_name=ngfelixl)
[![github](https://img.shields.io/badge/github-%40ngfelixl-blue.svg?logo=github)](https://github.com/ngfelixl)

Hi, I am Felix,
Software developer and Angular, NgRX contributor

![avatar](https://avatars2.githubusercontent.com/u/24190530?s=200&v=4)

If you like this library, think about giving it a star or follow me on twitter or github or check out my personal
the [website](https://felixlemke.com).
