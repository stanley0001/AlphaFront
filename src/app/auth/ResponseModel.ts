import { HttpStatusCode } from "@angular/common/http";

export interface ResponseModel{
    message: string;
    reason: String;
    httpStatus: HttpStatusCode;
    httpCode: Number;
}