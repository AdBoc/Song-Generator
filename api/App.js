import express from 'express'
import routesHandler from './src/routes/routes-handler'
import bodyParser from 'body-parser';
import mongoDbService from './src/services/mongo-db.service';
import passport from "passport";
import jwtAuthenticate from './src/middeleware/jwt-authenticate';

const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    // res.header("Content-Disposition");
    next();
});

passport.use(jwtAuthenticate);
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

mongoDbService.connect();
mongoDbService.init();

app.get('/song', passport.authenticate('jwt', { session: false }), routesHandler.getSong)
app.post('/song/add', passport.authenticate('jwt', { session: false }), routesHandler.addSong)
app.post('/user/register', routesHandler.registerUser)
app.post('/user/login', routesHandler.loginUser)
app.put('/user/update', passport.authenticate('jwt', { session: false }), routesHandler.updateUser)
app.get('/user/me', passport.authenticate('jwt', { session: false }), routesHandler.userInfo)
app.get('/*', routesHandler.notFound)

app.listen(2137, () => {
    console.log('listening on port 2137');
})