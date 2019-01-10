import * as express from "express"
import {UserRepository} from "./userrepository"
import {User} from "./user"

export class UserController extends Object {

    static async login(req: express.Request, res: express.Response) {

        let username: string = req.body["username"] || req.query["username"];
        let password: string = req.body["password"] || req.query["password"];

        try {
            let results: User[] = await UserRepository.findByNameAndPass(username, password);
            if (results.length !== 1) {
                return res.json({"error": new Error("服务内部错误").message});
            }
            return res.json(results)
        } catch (err) {
            return res.json({"error": err.message})
        }
    }

    static async generateSession(req: express.Request, res: express.Response) {
        let username: string = req.body["username"] || req.query["username"];
        let password: string = req.body["password"] || req.query["password"];
        try {
            let items: User[] = [];
            let results = await UserRepository.findByName(username);
            for (let i: number = 0; i < results.length; i++) {
                if (results[i].pass == password) {
                    items.push(results[i])
                }
            }
            if (items.length !== 1) {
                return res.json({"error": new Error("服务内部错误").message});
            }
            return res.json(items[0])
        } catch (err) {
            return res.json({"error": err.message})
        }

    }

    static async addAdmin(req: express.Request, res: express.Response) {
        let username: string = req.body["username"];
        let password: string = req.body["password"];

        let admin: User = new User();
        admin.name = username;
        admin.pass = password;
        admin.roleId = 2;
        try {
            let adminId = await UserRepository.save(admin);
            return res.json({"insertId": adminId})
        } catch (err) {
            return res.json({"error": err.message})
        }
    }

    static async modifyDescriptionByUserId(req: express.Request, res: express.Response) {
        let userId: number = req.params["userId"];
        let description: string = req.body["description"];

        try {
            let affectedRowsNum = await UserRepository.updateDescriptionByPrimaryKey(userId, description);
            return res.json({"affectedRows": affectedRowsNum})
        } catch (err) {
            return res.json({"error": err.message})
        }
    }

    static async getUserById(req: express.Request, res: express.Response) {
        let userId: number = req.params["userId"] || 0;
        try {
            let results = await UserRepository.findById(userId);
            return res.json(results)
        } catch (err) {
            return res.json({"error": err.message})
        }
    }
}
