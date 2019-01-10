import * as express from 'express'
import * as bodyParser from "body-parser"
import {Mysql} from "./db/mysql"
import {UserController} from "./user/usercontroller"

Mysql.Initialization();

let router: express.Application = express();

router.use(bodyParser.json());
router.use(express.static('static'));

router.all('/login', UserController.login);

router.post('/session', UserController.generateSession);
router.put('/user', UserController.addAdmin);
router.post('/user/:userId', UserController.modifyDescriptionByUserId);
router.get('/user/:userId', UserController.getUserById);

router.listen(3000);