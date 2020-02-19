// https://stackoverflow.com/questions/3969475/javascript-pause-settimeout
export class Timer {
  private timerId: number;
  private start: number;
  private remaining: number;
  private callback: any;
  private _paused = false;
  public get paused () {
    return this._paused;
  }

  constructor(callback: any, delay: number) {
    this.callback = callback;
    this.timerId = delay;
    this.start = delay;
    this.remaining = delay;
    this.resume();
  }

  public pause () {
    this._paused = true;
    window.clearTimeout(this.timerId);
    this.remaining -= Date.now() - this.start;
  }

  public resume() {
    this._paused = false;
    this.start = Date.now();
    window.clearTimeout(this.timerId);
    this.timerId = window.setTimeout(this.callback, this.remaining);
  };

  public stop() {
    window.clearTimeout(this.timerId);
  }
}
