import { Router } from 'express';
import { SiteUserService } from '../services/siteUserService';
import { siteUserModel } from '../models/siteUserModel';


const siteUserSvc = new SiteUserService();

export const SiteUserInitializeCtrl = function(secureRoute:Router,publicRoute:Router){

    publicRoute.get('/siteUser/getusertest',function(req,res){
        res.send({
            status:true,
            message:'Test endpoint passed'
        });
    });

    secureRoute.post('/siteUser/getusertestsecure',function(req,res){
        res.send({
            status:true,
            message:'Secure Test endpoint passed'
        });
    });

    publicRoute.post('/siteUser/Register',function(req,res){
        var emailAddress = req.body.emailAddress;
        var password = req.body.password;
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;


        
        
        siteUserSvc.registerUser(emailAddress,password,firstname,lastname,parseInt(process.env.SALTROUNDS)).then(function(result){
             
            if(result !== undefined){
                res.send({
                    status:true,
                    message:'User successfully registered'
                });
            }
            else{
                res.send({
                    status:false,
                    message:'Error occurred when registering user'
                });
            }   
        });        
    });
};