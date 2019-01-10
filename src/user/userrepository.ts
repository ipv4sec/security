import {User} from "./user"
import {Mysql} from "../db/mysql"

export class UserRepository extends Object {

    static async findByNameAndPass(name: string, pass: string): Promise<User[]> {
        let sql: string =
            "SELECT `id`, `name`, `pass`, `description`, `role_id` FROM `user` WHERE `name` = '" + name +
            "' AND `pass` = '" + pass + "'";
        console.log("Executed SQL:", sql);
        return new Promise<User[]>(function (resolve, reject) {
            Mysql.client.query(sql, function (error, results) {
                if (error) {
                    return reject(error)
                }
                let users: User[] = [];
                for (let i: number = 0; i < results.length; i++) {
                    let u = new User();
                    u.description = results[i]["id"];
                    u.name = results[i]["name"];
                    u.pass = results[i]["pass"];
                    u.description = results[i]["description"];
                    u.roleId = results[i]["role_id"];
                    users.push(u)
                }
                return resolve(users);
            });
        })
    }

    static async findByName(name: string): Promise<User[]> {
        let sql: string = "SELECT `id`, `name`, `pass`, `description`, `role_id` FROM `user` WHERE `name` = ?";
        return new Promise<User[]>(function (resolve, reject) {
            Mysql.client.query(sql, [name], function (error, results) {
                if (error) return reject(error);
                let users: User[] = [];
                for (let i: number = 0; i < results.length; i++) {
                    let u = new User();
                    u.description = results[i]["id"];
                    u.name = results[i]["name"];
                    u.pass = results[i]["pass"];
                    u.description = results[i]["description"];
                    u.roleId = results[i]["role_id"];
                    users.push(u)
                }
                return resolve(users);
            });
        })
    }

    static async findById(id: number): Promise<User> {
        let sql: string = "SELECT `id`, `name`, `pass`, `description`, `role_id` FROM `user` WHERE `id` = ?";
        return new Promise<User>(function (resolve, reject) {
            Mysql.client.query(sql, [id], function (error, results) {
                if (error) reject(error);
                if (results.length == 1) {
                    let u = new User();
                    u.description = results[0]["id"];
                    u.name = results[0]["name"];
                    u.pass = results[0]["pass"];
                    u.description = results[0]["description"];
                    u.roleId = results[0]["role_id"];
                    return resolve(u);
                }else {
                    return reject(new Error(`未发现id为${ id }的用户`));
                }
            });
        })
    }

    static async save(item: User): Promise<number> {
        let sql: string = "INSERT INTO `user`(`name`, `pass`, `role_id`) VALUES (?,?,?)";
        return new Promise<number>(function (resolve, reject) {
            Mysql.client.query(sql, [item.name, item.pass, item.roleId], function (error, results) {
                if (error) return reject(error);
                return resolve(results["insertId"]);
            });
        })
    }

    static async updateDescriptionByPrimaryKey(id: number, description: string): Promise<number> {
        let sql: string = "UPDATE `user` SET `description` = ? WHERE `id` = ?";
        return new Promise<number>(function (resolve, reject) {
            Mysql.client.query(sql, [description, id], function (error, results) {
                if (error) return reject(error);
                return resolve(results["affectedRows"]);
            });
        })
    }

}