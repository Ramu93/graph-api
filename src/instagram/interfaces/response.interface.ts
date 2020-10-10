export enum ResponseType {
    SUCCESS = 'success',
    FAILURE = 'failure'
}

export interface Response {
    message: ResponseType;
}