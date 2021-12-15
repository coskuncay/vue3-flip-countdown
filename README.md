# vue3-flip-countdown

> Customize Countdown timer with Flip Animation for [Vue](https://vuejs.org/ "Vue Homepage") 3.x

> [vue3-flip-countdown.netlify.app](https://vue3-flip-countdown.netlify.app/)


<p align="center">
  
![Netlify Status](https://api.netlify.com/api/v1/badges/69e11230-2c8b-4725-9540-7c0a861294e4/deploy-status)
  <img src="https://img.shields.io/npm/l/vue3-flip-countdown" />
  <a href="https://github.com/vuejs/awesome-vue"><img src="https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg"/></a>
  <a href="https://www.npmjs.com/package/vue3-flip-countdown"><img src="https://img.shields.io/npm/v/vue3-flip-countdown"/> 
   <img src="https://img.shields.io/npm/dt/vue3-flip-countdown"/></a>
  <a href="https://vuejs.org/"><img src="https://img.shields.io/badge/vue-3.x-brightgreen.svg"/></a>
</p>


## [Demo](https://vue3-flip-countdown.netlify.app/)


<a href="https://vue3-flip-countdown.netlify.app/" target="_blank"><img src="https://user-images.githubusercontent.com/29631083/142426544-536cc337-106b-4f3f-ba09-85f1062e3c5c.gif" width="800"/></a>


## Table of contents
  

- [Demo](#demo)
- [Installation](#installation)
- [Global Usage](#global-usage)
- [Single File Component Usage](#single-file-component-usage)
- [Emits](#emits)
- [Props](#props)
- [References](#references)
- [Requirements](#requirements)
- [License](#license)

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

## Emits

| Name | Description | 
| --- | --- |
| timeElapsed | event that created when the time came | 

## Props

| Name | Type | Default | 
| --- | --- | --- |
| deadlineISO | String<br>YYYY-MM-DDTHH:mm:ss.sssZ |  | 
| deadline | String<br>YYYY-MM-DD HH:mm:ss | 32d,0h,0m,10s | 
| deadlineDate | Date |  | 
| countdownSize | String | 3rem | 
| labelSize | String | 1.2rem | 
| flipAnimation | Boolean | true |
| mainColor | String | '#EC685C' |
| secondFlipColor | String | props.mainColor | 
| mainFlipBackgroundColor | String | '#222222' | 
| secondFlipBackgroundColor | String | '#393939' |
| labelColor | String | '#222222' |
| showLabels | Boolean | true |
| stop | Boolean |  |
| showDays | Boolean | true |
| showHours | Boolean | true |
| showMinutes | Boolean | true |
| showSeconds | Boolean | true |
| labels | Object | {days: 'Days',hours: 'Hours',minutes: 'Minutes',seconds: 'Seconds',} |



# References

- [vue2-flip-countdown](https://github.com/philipjkim/vue2-flip-countdown)
- [vuejs-countdown](https://github.com/getanwar/vuejs-countdown)
- [Demo for 'Flip clock & countdown, Vue'](https://codepen.io/shshaw/pen/BzObXp)

## Requirements

- [Vue](https://vuejs.org/) version **3.x.x**

## License

[MIT](https://choosealicense.com/licenses/mit/) Copyright (c) 2021, [Emre Coşkunçay](https://github.com/coskuncayemre)
