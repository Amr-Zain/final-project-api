import { Request, Response } from "express";
import datastore from '../datastore/services/index';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { StatusCodes } from 'http-status-codes';
import  User  from "../schema/user";
import { RequestWithUserSession } from "../types/util";
//u have to add profile img url to the schema and hanle its req

export const createUser = async(req :Request, res :Response)=>{
    const user = req.body;
    user.createdAt = Date.now();
    user.id = crypto.randomUUID(); 
    const doesEmailexist = await datastore.getUserByEmail(user.email);
    if(doesEmailexist){
        res.status(StatusCodes.CONFLICT).json({message: 'this email already exist'});
        return;
    }
    const doesPhoneexist = await datastore.getUserByPhone(user.phone);
    if(doesPhoneexist){
        res.status(StatusCodes.CONFLICT).json({message: 'this phone already exist'});
        return;
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    
    const createdUser = await datastore.createUser(user);
    res.status(StatusCodes.OK).json({ data: createdUser, message: 'user created' });
}
export const getAuthedUser =async (req :RequestWithUserSession, res :Response) => {
    const { id } = req.user;
    const user = await datastore.getUserById(id);
    if(!user) return res.status(StatusCodes.BAD_REQUEST).json({ message: ' user not found'});
    return res.status(StatusCodes.ACCEPTED).json({ user })
}
export const postUserImage = async(req :RequestWithUserSession, res :Response)=>{
    const { id } = req.user; 
    
    res.status(StatusCodes.OK).json({  message: 'imageUploaded' });
}
/* const preuploadMiddleware = (req, res, next) => {
    req.articaleId = randomUUID();
    const p = path.resolve(__dirname, '../../public/article/' , req.articaleId );
    req.Path = p;
    
    fs.mkdirSync(p);
    next();
  }; */
/* 
export const getUserById =async (req: Request, res :Response)=>{
    const user = await datastore.getUserById(req.params.id);
    
    if(!user) res.status(StatusCodes.NOT_FOUND).json({ mess: 'user not found'});
    delete user.password;
    delete user.createdAt;

    res.status(StatusCodes.OK).json({ data: [user] });
}

export const listUserArticales =async (req: Request, res :Response)=>{
    const user = await datastore.getUserById(req.params.id);
    if(!user) res.status(StatusCodes.NOT_FOUND).json({ mess: 'user not found'});

    const userArticles :Article[] = await datastore.getUserArticles(user.id)
    res.status(StatusCodes.OK).json({ data: userArticles });
} */
