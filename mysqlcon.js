const mysql = require('mysql2');

class Database {
  getConnection() {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      //Si no tiene configurado el mysql con contrasena la siguiente
      // no es necesaria
      password: 'admin123',
      database: 'db_ia'
    });
    return connection;
  }

}
module.exports = Database;


