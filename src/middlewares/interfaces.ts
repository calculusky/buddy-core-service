import { User } from "@/models/sql/User";
import { Request } from "express";

export interface RequestWithUser extends Request {
    user?: User;
}
