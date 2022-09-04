import { User } from "src/entity/User";
import { Request, Response } from "express";

export interface MyContext{
    res: Response,
    req: Request,
    user: User,
    id: string
}