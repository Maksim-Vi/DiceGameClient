import moment from "moment/moment";

export default class Timer {
    constructor(callback, useTimezone = false) {
        this._callback = callback;
        this._time = 0;
        this._useTimezone = useTimezone;
        this.interval = null;
    }

    start(time) {
        this._time = time;
        this.interval = setInterval(()=>{
            this.onTick();
        }, 1000);
        this.onTick();
    }

    stop() {
        clearInterval(this.interval);
    }

    onTick() {
        let result = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            totalTime: 0
        };

        let currentTime =  new Date();
        if(this._useTimezone){
            let thisMoment = moment().utcOffset('+0300').format('YYYY-MM-DD HH:mm:ss')
            currentTime = Date.parse(thisMoment)
        }

        let now = +currentTime / 1000;
        let diff = Math.floor(this._time - now);

        result.totalTime = diff;

        if(diff <= 0) {
            clearInterval(this.interval);
            result.totalTime = diff;
            this._callback(result);
            return;
        }
        result.days = Math.floor(diff / 86400);
        diff -= result.days * 86400;
        result.hours = Math.floor(diff / 3600);
        diff -= result.hours * 3600;
        result.minutes = Math.floor(diff / 60);
        diff -= result.minutes * 60;
        result.seconds = Math.floor(diff);

        this._callback(result);
    }
}
