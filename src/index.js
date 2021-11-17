import Countdown from './Countdown.vue'

function install(app) {

    if (install.installed) {
        return
    }

    install.installed = true

    app.component(Countdown.name, Countdown)
}

export default install

export {
    install,
    Countdown,
}