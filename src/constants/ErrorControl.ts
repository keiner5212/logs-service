export enum HttpStatusCode {
    Ok = 200,
    Created = 201,
    NoContent = 204,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    Conflict = 409,
    InternalServerError = 500
}

export enum ErrorControl {
    SUCCESS = 0,
    ERROR = 1,
    PERSONALIZED = 2
}

export type DaoResponse = [ErrorControl, any, HttpStatusCode] 