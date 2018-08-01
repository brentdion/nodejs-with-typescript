import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
 
import { tokenMiddleware } from './middleware/tokenMiddleware';

//import controller files
import { SiteUserInitializeCtrl } from './controllers/siteUserController';
import { LoginInitializeCtrl } from './controllers/loginController';

const app = express();

process.env.PORT = '3000';
process.env.SALTROUNDS = '12';
process.env.TOKENSECRET = 'ChangeME!';

var publicRoutes = express.Router();
var secureRoutes = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");  
    next();
});

secureRoutes.use(tokenMiddleware());

app.use('/sapi',secureRoutes);
app.use('/api',publicRoutes);

//initialize the controllers
SiteUserInitializeCtrl(secureRoutes,publicRoutes);
LoginInitializeCtrl(secureRoutes,publicRoutes);

//default blank route
app.get('/',function(request,response,next){
    response.send('Service is running...');
});

//start the server
app.listen(parseInt(process.env.PORT), function(){
    console.log('Listening on port ' + process.env.PORT);
});