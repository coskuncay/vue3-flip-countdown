# vue3-flip-countdown

> Countdown timer with Flip Animation for [Vue](https://vuejs.org/ "Vue Homepage") 3.x



<p align="center">
  <img src="https://img.shields.io/npm/l/vue3-flip-countdown" />
  <a href="https://www.npmjs.com/package/vue3-flip-countdown"><img src="https://img.shields.io/npm/v/vue3-flip-countdown"/> 
   <img src="https://img.shields.io/npm/dt/vue3-flip-countdown"/></a>
  <a href="https://vuejs.org/"><img src="https://img.shields.io/badge/vue-3.x-brightgreen.svg"/></a>
 </p>


## Installation

```
npm i vue3-flip-countdown --save
```

## Global Usage
main.js
```js
import { createApp } from 'vue'
import App from './App.vue'
import Countdown from 'vue3-flip-countdown'
createApp(App).use(Countdown).mount('#app')
```

App.vue
```js
<template>
  <vue3-flip-countdown />
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>
```

## Single File Component Usage
```vue
<template>
  <Countdown />
</template>

<script>
import {Countdown} from 'vue3-flip-countdown'
export default {
  name: 'App',
  components: {
    Countdown
  }
}
</script>
```

## Props

| Name | Type | Default | optional |
| --- | --- | --- | --- |
| deadlineISO | String<br>YYYY-MM-DDTHH:mm:ss.sssZ |  | className of this column |
| deadline | String<br>YYYY-MM-DD HH:mm:ss | 32d,0h,0m,10s | key of this column |
| deadlineDate | Date |  | className of this column |
| countdownSize | String | 3rem | thead colSpan of this column |
| labelSize | String | 1.2rem | title of this column |
| flipAnimation | Boolean | true | width of the specific proportion calculation according to the width of the columns |
| mainColor | String | '#EC685C' | Set custom props per each header cell. |
| secondFlipColor | String | props.mainColor | Set custom props per each header cell. |
| mainFlipBackgroundColor | String | '#222222' | Set custom props per each header cell. |
| secondFlipBackgroundColor | String | '#393939' | Set custom props per each header cell. |
| showLabels | Boolean | true | Set custom props per each header cell. |
| labelColor | Function(record) | '#222222' | Set custom props per each header cell. |
| stop | Boolean |  | display field of the data record |
| showDays | Boolean | true | this column will be fixed when table scroll horizontally: true or 'left' or 'right' |
| showHours | Boolean | true | specify how cell content is aligned |
| showMinutes | Boolean | true | specify whether cell content be ellipsized |
| showSeconds | Boolean | true | Set custom props per each cell. |
| labels | Object | {days: 'Days',hours: 'Hours',minutes: 'Minutes',seconds: 'Seconds',} | Set custom props per each header cell. |



# References

- [vue2-flip-countdown](https://github.com/philipjkim/vue2-flip-countdown)
- [vuejs-countdown](https://github.com/getanwar/vuejs-countdown)
- [Demo for 'Flip clock & countdown, Vue'](https://codepen.io/shshaw/pen/BzObXp)

## Requirements

- [Vue](https://vuejs.org/) version **^3.0.0**

## License

**MIT** (c) Emre Coşkunçay
