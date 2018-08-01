import { IncomingHttpHeaders } from 'http';
import { RequestHandler } from 'express';
import { SiteUserService } from '../services/siteUserService';

const siteUserSvc = new SiteUserService();

//local functions
function removeJWTSalt(token){
    var cleantoken = "";
    var splitjwt = token.split('.');    
    var cleanmiddle = splitjwt[1].substr(1).slice(0, -1);
    cleantoken =   splitjwt[0] + '.' +  cleanmiddle + '.' + splitjwt[2];     
    return cleantoken;
};


function getTokenFromHeaders(header:IncomingHttpHeaders){
    const headertest= header.authorization as string;

    if(!headertest){
        return headertest;
    }
    else{
        return headertest.split(' ')[1];
    }
}


export const tokenMiddleware: (() => RequestHandler) = (() => (req, res, next) => {
    const token = getTokenFromHeaders(req.headers) || req.query.token || req.body.token || ''
    const hasAccess = siteUserSvc.verifyToken(removeJWTSalt(token),process.env.TOKENSECRET);
  
    hasAccess.then(a => {
      if (!a)
        return res.status(403).send({ message: 'No access' })
      next()
    })
  })