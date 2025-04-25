import mysql from 'mysql2';

export const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Mudar@123',
    database: 'users',
});