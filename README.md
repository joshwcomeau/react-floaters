# React Floaters
### A spring-based scroll animation experiment with React.js

This project is the result of experimenting with parallax-like effects. Rather than simply moving two things at different speeds, I wanted to see what happened if the items were given inertia and followed some basic rules of physics.

When you scroll quickly and stop, the items shouldn't just halt instantly, they should overshoot the target and bounce back!

## [Play with it on Codepen](http://google.com)

#### Note: This is an experimental project. It is untested, and may not work in all browsers. If there is significant interest, I will write a proper release :)


-------

## Features

* Organic, beautiful motion using spring physics
* Drop-dead simple to use. Simply wrap your components in a Floater and watch 'em float.
* Efficient - relies exclusively on hardware-accelerated properties, uses requestAnimationFrame when available, etc.
* Predictable positioning. Unlike parallax, Floaters can be used alongside stationary elements; Floaters animate during scroll transition, but they come to rest in the right place.
* Configurable. With 3 tweakable settings, a wide range of effects can be applied to Floaters.
* Tiny! Only 4kb ⚡

-------

## Getting Started

Installation:

```bash
$ npm i -S react-floaters
```

Usage:

```js
import { Floater } from 'react-floaters';

const bouncyHeading = () => (
  <Floater>
    <h1>Hello World</h1>
  </Floater>
)
```

-------

## API Documentation

### `children`

| **Accepted Types:** | **Default Value** |
|---------------------|-------------------|
|  `Array`, `Object` | `undefined` |


The children passed to Floater are the component(s) or DOM element(s) that will be moved about. Accepts either a single child or an array of children.


### `stiffness`

| **Accepted Types:** | **Accepted Values** | **Default Value** |
|---------------------|-------------------|---------------------|
|  `Number` | `0` - `1000` |  `40` |


**Note: I'm not a physicist and this definition is just how it feels to me**
`stiffness` is a measure of how elastic the transition is. Higher numbers feel 'looser', and will wobble with less force.

To get a sense of how this value affects the animation, check out this [fantastic spring parameter chooser](http://chenglou.github.io/react-motion/demos/demo5-spring-parameters-chooser/) from React Motion.


### `damping`

| **Accepted Types:** | **Accepted Values** | **Default Value** |
|---------------------|-------------------|---------------------|
|  `Number` | `0` - `200` |  `20` |


**Note: I'm not a physicist and this definition is just how it feels to me**
`damping` is a measure of how much "springiness" the transition is. High numbers feel more like traditional easing, whereas low numbers wobble back and forth a ton.

To get a sense of how this value affects the animation, check out this [fantastic spring parameter chooser](http://chenglou.github.io/react-motion/demos/demo5-spring-parameters-chooser/) from React Motion.


### `smoothing`

| **Accepted Types:** | **Accepted Values** | **Default Value** |
|---------------------|-------------------|---------------------|
|  `Number` | `1` - `100` |  `3` |

`smoothing` affects how 'responsive' the transition is to changes.

A low number means it responds fully to changes in scroll position. As a result, it's very snappy, but can feel jarring when used with a PC mousewheel, where scrollwheels work by jumping up by hard steps.

A high number adds a rolling window of recently-seen scroll positions, to smooth out any jerky scrolling. As a result, it adds a higher sense of inertia, as the motion starts slowly and then races to catch up.

Recommended values are between 5 and 15.


-------

## Known Quirks

- On page load, depending on the items' starting position, they can bounce around a little erratically.

- Some settings will be really jerky when used with a mousewheel. This is because mousewheels sometimes work in steps: each tick of the wheel instantly jumps by 40-80px. A solution to this is to use the `smoothing` attribute, but that affects the inertia as well. I may introduce the option to force smooth scrolling, so that it works equally well on all devices.

- If you only have a few Floaters on the page, you should use `will-change: transform` on all Floater components to optimize them. [Read more about will-change](https://dev.opera.com/articles/css-will-change-property/)

- The performance of this module is good, but not great. Right now it runs a continuous event loop. It's pretty fast; the loop typically only takes fractions of a millisecond. That said, there's no reason for it to be running when you aren't scrolling and when none of the items are moving.


-----

## The Future

This project was a quick Saturday experiment. I have no idea how useful this is for anybody. If it generates significant interest, I'll do it properly, with tests and contribution policies, etc. **[Let me know](https://twitter.com/joshwcomeau)** if you find it helpful, or if you have ideas about how to make it more useful!
