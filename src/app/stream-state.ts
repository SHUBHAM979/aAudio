export interface StreamState {
    playing : boolean;
    readableCurrentTime : string;
    readableDuration : String;
    duration : number | undefined;
    currentTime : number | undefined;
    canplay : boolean;
    error : boolean;
}