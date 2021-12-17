<template>
<Countdown deadlineISO="2021-12-17T11:27:50.481Z" deadline="2023-12-12 00:00:00" :deadlineDate="date" @timeElapsed='timeElapsed'/>
</template>

<script>
import Countdown from './Countdown.vue'
export default {
    name: 'App',
    components: {
        Countdown
    },
    setup() {
        const date = new Date('2044-08-12T16:17:13.481Z');
        const timeElapsed = () => {
            console.log("timeElapsedtimeElapsedtimeElapsed")
        };
        return {
            timeElapsed,
            date
        }
    }
}
</script>

<style>
</style>
