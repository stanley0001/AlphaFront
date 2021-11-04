import { HttpStatusCode } from "@angular/common/http";


export interface authResponse{
    httpStatus: HttpStatusCode,
    httpStatusCode: Number,
    message: string,
    reason: string,
    user: {
      accountNonExpired: true,
      accountNonLocked: true,
      authorities: [
        {
          authority: string
        }
      ],
      credentialsNonExpired: true,
      enabled: true,
      password: string,
      username: string
    }
  }