import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { siteUserModel } from '../models/siteUserModel';


export class SiteUserService{

    

    getUserByEmail(emailAddress:string){
        return siteUserModel.findAll({
            where:{
                email:emailAddress
            }, 
            raw:true
        }).then(siteUserData =>{
            return siteUserData;
        });
    }

    registerUser(email:string,password:string,firstname:string,lastname:string,saltRounds:number){
        return this.getUserByEmail(email).then(function(searchResult){
            if(searchResult.length === 0){
                return bcrypt.hash(password,saltRounds).then(hash =>{
                    return siteUserModel.create({
                        email:email,
                        password:hash,
                        firstname:firstname,
                        lastname:lastname
                    }).then(u => {
                       return u
                    });
                });
            } 
        });
    }
     

    verifyToken(token: string,jwtsecret:string) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, jwtsecret, (err, decoded) => {
                if (err) {
                    resolve(false)
                    return
                }
                
                resolve(true)
                return
            })
        }) as Promise<boolean>
    }

}