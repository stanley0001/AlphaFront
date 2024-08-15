import { Client } from "./client";

export interface ClientResponseModel {
    page:any;
    totalPages:any;
    size:any;
    totalElements:any;
    message:any;
    body:Client[];
    errors:any;
}