const {
    ev_supList
} = require("../util/util");


class EventObj {
    constructor() {
        this.subscribe = {}
    }
    on(channel, fn) {
        let old = this.subscribe[channel] ? this.subscribe[channel].func : undefined;
        if (old == undefined) this.subscribe[channel] = {}
        this.subscribe[channel].func = function(_args) {
            if (typeof old == "function") {
                old(_args);
            }
            fn(_args);
        }
    }
    emit(channel, _args) {
        if (this.subscribe[channel] !== undefined) {
            if (typeof this.subscribe[channel].func == "function") {
                this.subscribe[channel].func(_args);
            }
        }
    }
    clear() {
        this.subscribe = {};
    }
}
class EventObjForEle extends EventObj {
    constructor(ele) {
        super();
        this.el = ele;
        this.__init_nativeEv();
    }
    __init_nativeEv() {
        ev_supList.forEach(evName => {
            this.el.addEventListener(evName, e => {
                // window.requestIdleCallback(() => this.emit(evName, e))
                // setTimeout(() => this.emit(evName, e), 1);
                this.emit(evName, e)
            })
        })
    }
}

module.exports = EventObjForEle;
