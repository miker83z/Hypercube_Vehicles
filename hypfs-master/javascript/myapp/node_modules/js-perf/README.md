# JavaScript Performance

JavaScript performance is a collection of utilities that can help you to give information about the performance of your application.

Bear in mind that this **is not a jsperf** sibling, but it's more focused on something else.

The library is simply a easy way to take advantage of the browser API `performance`

## Why JavaScript Performance?

The browser API `performance` is useful but it takes a bit to understand the APIs and make an effective use inside your application.

The aim of the library is just to give few functions with almost zero learning curve.

## How to import it

Import the library in the way of prefer most, from your browser

```html
<script src='path/to/js.performance.umd.js'></script>
<script>
  JSPerf.startRecording()

  // etc.
</script>

```
Or straight inside your modules if you are using bundler such as webpack or rollup

```javascript
import { startRecording } from 'js-performance'

startRecording()
// etc.

```

**The library doesn't support Node.js environments for obvious reasons, as it doesn't have a `performance` API.**

## How to use it

The following example will use ES6 modules and it will be really simple

```JavaScript
import { startRecording, startMark, stopMark, stopRecording, allMeasures  } from 'js-performance'

startRecording()

startMark('firstLoop')
for (let i = 0; i < 100; i++) {
  // operation
}
stopMark('firstLoop')

startMark('secondLoop')
for (let i = 0; i < 100; i++) {
  // operation
}
stopMark('secondLoop')
stopRecording()
allMeasures() // this will print inside your console the results of your marks

```

It's easy!

***Note: at the moment the library does not support having two marks with the same name***

That means that executing the following code won't work

```JavaScript
import { startRecording, startMark, stopMark, stopRecording  } from 'js-performance'

startRecording()
startMark('operation')
startMark('operation')

// expensive operation

stopMark('operation')
stopMark('operation')
stopRecording()

```

The result will be just ONE mark called 'operation'

## APIs

A list of available APIs is [here](./API.md)
