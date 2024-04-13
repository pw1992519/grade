const mysql = require('mysql');

// 创建 MySQL 连接
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'cryptdb',
    database: 'grades'
});

// 连接到 MySQL 数据库
connection.connect(function (err) {
    if (err) {
        console.error('数据库连接失败: ' + err.stack);
        return;
    }
    console.log('数据库连接成功');
});

module.exports = connection;