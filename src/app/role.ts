import { getLocaleDateFormat } from "@angular/common";
import { Permission } from "./permission";
export interface Role{
roleId:Number;
roleName:String;
description:String;
roleType:String;
roleStatus:String;
addedBy:String;
createdAt:Date;
permissions:Permission[];
}

