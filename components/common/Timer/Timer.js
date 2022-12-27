export default class Timer {
    constructor(callback) {
        this._callback = callback;
        this._time = 0;
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

        let now = new Date() / 1000;
        let diff = Math.floor(this._time - now);
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

        result.totalTime = diff;
        this._callback(result);
    }
}
