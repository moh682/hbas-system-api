import mysql from 'mysql';
import colors from 'colors';

class DbConnector {

   private static connection: mysql.Connection;

   static getConnection = (): mysql.Connection => {

      if (DbConnector.connection === undefined) {
         DbConnector.connection = mysql.createConnection({
            host: 'localhost',
            user: 'backend',
            password: 'a70427c3-0b76-4628-b0c1-9910aa75e138',
            database: 'backend'
         })
         return DbConnector.connection;
      } else {
         return DbConnector.connection;
      }
   }
}

let connection = DbConnector.getConnection();

connection.on('error', (error) => {
   console.log(colors.red('Mysql Connection Error: '), error);
})

connection.on('connect', () => {
   console.log(colors.green('Mysql Connection have been established'));
})

export default connection;