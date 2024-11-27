export class Visit {
    id: number;
    timeUnixMs: number

    constructor(id: number, timeUnixMs: number) {
        this.id = id;
        this.timeUnixMs = timeUnixMs;
    }
}