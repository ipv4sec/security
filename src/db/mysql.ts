import * as mysql from "mysql"

export class Mysql extends Object {

    static client: mysql.Connection;

    static Initialization() {
        let config: mysql.ConnectionConfig = {
            host: 'gen8',
            user: 'root',
            password: 'passwd',
            database: 'example'
        };
        Mysql.client = mysql.createConnection(config);
        Mysql.client.connect();
    }
}
