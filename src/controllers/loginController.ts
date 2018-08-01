import { SiteUserService } from '../services/siteUserService';
import { Router } from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
  

const siteUserSvc = new SiteUserService();

function addJWTSalt(token){
    var dirtytoken = ""; 
    var splitjwt = token.split('.');
    var cleanmiddle = splitjwt[1];
    dirtytoken = splitjwt[0] + '.e' +  cleanmiddle + 'g.' + splitjwt[2];     
    return dirtytoken;
};

export interface IToDoDto {
    dataValues: any;
    
  };


export const LoginInitializeCtrl = function(secureRoute:Router,publicRoute:Router){

    publicRoute.post('/login',function(request,response){
        
        var emailtest = request.body.emailAddress;
        var pwdTest = request.body.password;       
        
        siteUserSvc.getUserByEmail(emailtest).then(function(result){
            if( result.length > 0){

               console.log(result[0].password);
                
                var pwdHash_fromDB = result[0].password;
                bcrypt.compare(pwdTest, pwdHash_fromDB, function (err, res) {
                    if (res === true) {
                        var user = {
                            username: result[0].email
                        };
    
                        var token = jwt.sign(user, process.env.TOKENSECRET, {
                            expiresIn: 30000
                        });

                        var dirtiedtoken = addJWTSalt(token);                      

                        response.send({
                            success: true,
                            token: dirtiedtoken
                        });
                    }
                    else {
                        response.send({
                            success: false,
                            token: 'Invalid Login Info!'
                        });                       
                    }
                });
            }
            else{
                response.send({
                    success: false,
                    token: 'Invalid Login Info!'
                });              
            }   

        });
    });
 
};