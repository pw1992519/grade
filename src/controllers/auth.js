const db = require("../db");

exports.login = async (req, res) => {
    const {
        username,
        pwd,
        role
    } = req.body;

    let tableName = '';
    if (role === 'student') {
        tableName = 'students';
    }
    if (role === 'admin') {
        tableName = 'admins';
    }
    const query = `SELECT * FROM ${tableName} WHERE username = ? AND pwd = ?`;
    db.query(query, [username, pwd], (error, results, fields) => {
        if (error) {
            res.status(500).json({
                error: 'Internal Server Error'
            });
            return;
        }

        if (results.length === 0) {
            res.json({
                code: -1,
                msg: "用户名或密码错误!",
            });
            return;
        }

        const user = results[0];
        res.json({
            code: 200,
            msg: "登录成功!",
            data: user
        });
    });
};

