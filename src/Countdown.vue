<template>
<div class="flip-clock">
    <template v-for="data in timeData" :key="data.label">
        <span class="flip-clock__piece" :id="data.elementId" v-show="data.show">
            <div v-if="flipAnimation">
                <span class="flip-clock__card flip-card">
                    <b class="flip-card__top">{{twoDigits(data.current)}}</b>
                    <b class="flip-card__bottom" :data-value="twoDigits(data.current)"></b>
                    <b class="flip-card__back" :data-value="twoDigits(data.previous)"></b>
                    <b class="flip-card__back-bottom" :data-value="twoDigits(data.previous)"></b>
                </span>
                <span class="flip-clock__slot">{{ data.label }}</span>
            </div>
            <div v-else>
                <span class="flip-clock__slot">{{ data.label }}</span>
                <span class="no-animation__card">{{twoDigits(data.current)}}</span>
            </div>
        </span>
    </template>
</div>
</template>

<script>
import {
    computed,
    onBeforeMount,
    onMounted,
    onUnmounted,
    toRefs,
    ref,
    watch
} from 'vue'

import moment from "moment";
const uuidv4 = require('uuid/v4');
const fmt = "YYYY-MM-DD HH:mm:ss";

export default {
    name: 'vue3-flip-countdown',
    setup(props) {
        const uuid = uuidv4();
        const {
            deadline,
            stop,
            showDays,
            showHours,
            showMinutes,
            showSeconds,
            labels,
        } = toRefs(props);

        let now = ref(Math.trunc(new Date().getTime() / 1000));
        let date = ref(null);
        let interval = ref(null);
        let diff = ref(0);
        let show = ref(false);
        let timeData = ref([{
                current: 0,
                previous: 0,
                label: labels.value.days,
                elementId: 'flip-card-days-' + uuid,
                show: showDays.value,
            },
            {
                current: 0,
                previous: 0,
                label: labels.value.hours,
                elementId: 'flip-card-hours-' + uuid,
                show: showHours.value,
            },
            {
                current: 0,
                previous: 0,
                label: labels.value.minutes,
                elementId: 'flip-card-minutes-' + uuid,
                show: showMinutes.value,
            },
            {
                current: 0,
                previous: 0,
                label: labels.value.seconds,
                elementId: 'flip-card-seconds-' + uuid,
                show: showSeconds.value,
            },
        ]);

        const updateAllCards = () => {
            updateTime(0, days);
            updateTime(1, hours);
            updateTime(2, minutes);
            updateTime(3, seconds);
        }

        const twoDigits = (value) => {
            if (value.toString().length <= 1) {
                return '0' + value.toString();
            }
            return value.toString();
        }

        const updateTime = (idx, newValue) => {
            if (idx >= timeData.value.length || newValue === undefined) {
                return;
            }

            // if (window['requestAnimationFrame']) {
            //     frame = requestAnimationFrame(updateTime.bind(this));
            // }

            const d = timeData.value[idx];
            const val = newValue.value < 0 ? 0 : newValue.value;
            const el = document.querySelector(`#${d.elementId}`);

            if (val !== d.current) {
                d.previous = d.current;
                d.current = val;

                if (el) {
                    el.classList.remove('flip');
                    void el.offsetWidth;
                    el.classList.add('flip');
                }

                if (idx === 0) {
                    const els = el.querySelectorAll('span b');
                    if (els) {
                        for (let e of els) {
                            const cls = e.classList[0];
                            if (newValue.value / 1000 >= 1) {
                                if (!cls.includes('-4digits')) {
                                    const newCls = cls + '-4digits';
                                    console.log("🚀 ~ file: Countdown.vue ~ line 135 ~ updateTime ~ newCls", newCls)
                                    e.classList.add(newCls);
                                    e.classList.remove(cls);
                                }
                            } else {
                                if (cls.includes('-4digits')) {
                                    const newCls = cls.replace('-4digits', '');
                                    e.classList.add(newCls);
                                    e.classList.remove(cls);
                                }
                            }
                        }
                    } else {
                        console.log("yoook")
                    }
                }
            }
        }

        watch(deadline, (newVal) => {
            const endTime = newVal;
            date.value = Math.trunc(Date.parse(endTime.replace(/-/g, '/')) / 1000);
            if (!date.value) {
                throw new Error("Invalid props value, correct the 'deadline'");
            }
        })

        watch(now, () => {
            diff.value = date.value - now.value;
            if (diff.value <= 0 || stop.value) {
                diff.value = 0;
                updateTime(3, 0);
            } else {
                updateAllCards();
            }
        })

        watch(diff, (newVal) => {
            if (newVal === 0) {
                // $emit('timeElapsed');
                updateAllCards();
            }
        })

        let seconds = computed(() => {
            return Math.trunc(diff.value) % 60;
        });

        let minutes = computed(() => {
            return Math.trunc(diff.value / 60) % 60;
        });
        let hours = computed(() => {
            return Math.trunc(diff.value / 60 / 60) % 24;
        });
        let days = computed(() => {
            return Math.trunc(diff.value / 60 / 60 / 24);
        });

        onMounted(() => {
            if (diff.value !== 0) {
                show.value = true;
            }
        });

        onBeforeMount(() => {
            if (!deadline.value) {
                throw new Error("Missing props 'deadline'");
            }
            const endTime = deadline.value;
            date.value = Math.trunc(Date.parse(endTime.replace(/-/g, '/')) / 1000);
            if (!date.value) {
                throw new Error("Invalid props value, correct the 'deadline'");
            }
            interval.value = setInterval(() => {
                now.value = Math.trunc(new Date().getTime() / 1000);
            }, 1000);

        });

        onUnmounted(() => {
            // if (window['cancelAnimationFrame']) {
            //     cancelAnimationFrame(frame);
            // }
            clearInterval(interval.value);
        });

        return {
            now,
            date,
            interval,
            diff,
            show,
            timeData,
            twoDigits,
        }
    },
    props: {
        deadline: {
            type: String,
            default: moment()
                .add(999, "d")
                .add(10, "s")
                .format(fmt),
        },
        stop: {
            type: Boolean,
        },
        flipAnimation: {
            type: Boolean,
            default: true,
        },
        showDays: {
            type: Boolean,
            required: false,
            default: true,
        },
        showHours: {
            type: Boolean,
            required: false,
            default: true,
        },
        showMinutes: {
            type: Boolean,
            required: false,
            default: true,
        },
        showSeconds: {
            type: Boolean,
            required: false,
            default: true,
        },
        labels: {
            type: Object,
            required: false,
            default: function () {
                return {
                    days: 'Days',
                    hours: 'Hours',
                    minutes: 'Minutes',
                    seconds: 'Seconds',
                };
            },
        },
        mainColor: {
            type: String,
            default: '#EC685C'
        },
        secondFlipColor: {
            type: String,
            default: (props) => props.mainColor,
        },
        mainFlipBackgroundColor: {
            type: String,
            default: '#222222'
        },
        secondFlipBackgroundColor: {
            type: String,
            default: '#393939'
        },
        labelColor: {
            type: String,
            default: '#222222'
        }

    },

};
</script>

<style lang="less" scoped>
.no-animation__card {
    font-weight: 500;
    font-size: 2rem;
    line-height: 1.5;
    display: block;
    color: v-bind(mainColor);
}

.flip-clock {
    text-align: center;
    perspective: 600px;
    margin: 0 auto;

    *,
    *:before,
    *:after {
        box-sizing: border-box;
    }
}

.flip-clock__piece {
    display: inline-block;
    margin: 0 0.2vw;

    @media (min-width: 1000px) {
        margin: 0 5px;
    }
}

.flip-clock__slot {
    font-size: 1rem;
    line-height: 1.5;
    display: block;
    color: v-bind(labelColor);
}

@halfHeight: 0.72em;
@borderRadius: 0.15em;

.flip-card {
    display: block;
    position: relative;
    padding-bottom: @halfHeight;
    font-size: 2.25rem;
    line-height: 0.95;
}

@media (min-width: 1000px) {
    .flip-clock__slot {
        font-size: 1.2rem;
    }

    .flip-card {
        font-size: 3rem;
    }
}

.flip-card__top,
.flip-card__bottom,
.flip-card__back-bottom,
.flip-card__back::before,
.flip-card__back::after {
    display: block;
    height: @halfHeight;
    color: v-bind(mainColor);
    background: v-bind(mainFlipBackgroundColor);
    padding: 0.23em 0.15em 0.4em;
    border-radius: @borderRadius @borderRadius 0 0;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    transform-style: preserve-3d;
    width: 2.1em;
    height: @halfHeight;
}

.flip-card__top-4digits,
.flip-card__bottom-4digits,
.flip-card__back-bottom-4digits,
.flip-card__back-4digits::before,
.flip-card__back-4digits::after {
    display: block;
    height: @halfHeight;
    color: v-bind(mainColor);
    background: v-bind(mainFlipBackgroundColor);
    padding: 0.23em 0.15em 0.4em;
    border-radius: @borderRadius @borderRadius 0 0;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    transform-style: preserve-3d;
    width: 2.65em;
    height: @halfHeight;
}

.flip-card__bottom,
.flip-card__back-bottom,
.flip-card__bottom-4digits,
.flip-card__back-bottom-4digits {
    color: v-bind(secondFlipColor);
    position: absolute;
    top: 50%;
    left: 0;
    border-top: solid 1px #000;
    background: v-bind(secondFlipBackgroundColor);
    border-radius: 0 0 @borderRadius @borderRadius;
    pointer-events: none;
    overflow: hidden;
    z-index: 2;
}

.flip-card__back-bottom,
.flip-card__back-bottom-4digits {
    z-index: 1;
}

.flip-card__bottom::after,
.flip-card__back-bottom::after,
.flip-card__bottom-4digits::after,
.flip-card__back-bottom-4digits::after {
    display: block;
    margin-top: -@halfHeight;
}

.flip-card__back::before,
.flip-card__bottom::after,
.flip-card__back-bottom::after,
.flip-card__back-4digits::before,
.flip-card__bottom-4digits::after,
.flip-card__back-bottom-4digits::after {
    content: attr(data-value);
}

.flip-card__back,
.flip-card__back-4digits {
    position: absolute;
    top: 0;
    height: 100%;
    left: 0%;
    pointer-events: none;
}

.flip-card__back::before,
.flip-card__back-4digits::before {
    position: relative;
    overflow: hidden;
    z-index: -1;
}

.flip .flip-card__back::before,
.flip .flip-card__back-4digits::before {
    z-index: 1;
    animation: flipTop 0.3s cubic-bezier(0.37, 0.01, 0.94, 0.35);
    animation-fill-mode: both;
    transform-origin: center bottom;
}

.flip .flip-card__bottom,
.flip .flip-card__bottom-4digits {
    transform-origin: center top;
    animation-fill-mode: both;
    animation: flipBottom 0.6s cubic-bezier(0.15, 0.45, 0.28, 1);
}

@keyframes flipTop {
    0% {
        transform: rotateX(0deg);
        z-index: 2;
    }

    0%,
    99% {
        opacity: 1;
    }

    100% {
        transform: rotateX(-90deg);
        opacity: 0;
    }
}

@keyframes flipBottom {

    0%,
    50% {
        z-index: -1;
        transform: rotateX(90deg);
        opacity: 0;
    }

    51% {
        opacity: 1;
    }

    100% {
        opacity: 1;
        transform: rotateX(0deg);
        z-index: 5;
    }
}
</style>
