const db = require("../db");

exports.update = async (req, res) => {
    const {
        id
    } = req.params;
    const {
        body
    } = req;

    // 检查是否存在重复的 username 或 stuNo
    db.query('SELECT * FROM students WHERE (username = ? OR stuNo = ?) AND id != ?', [body.username, body.stuNo, id], (error, results, fields) => {
        if (error) throw error;

        if (results.length > 0) {
            res.json({
                code: -1,
                msg: "重复的用户名或学号!", 
            }); 
            return;
        }

        db.query('UPDATE students SET ? WHERE id = ?', [body, id], (error, results, fields) => {
            if (error) throw error;

            db.query('SELECT * FROM students WHERE id = ?', [id], (error, data, fields) => {
                if (error) throw error;

                res.json({
                    code: 200,
                    msg: "Updated successfully!",
                    data: data[0]
                });
            });
        });
    });
};

exports.destroy = async (req, res) => {
    const {
        id
    } = req.params;

    db.query('DELETE FROM students WHERE id = ?', [id], (error, results, fields) => {
        if (error) throw error;

        res.json({
            code: 200,
            msg: "更新成功!"
        });
    });
};

exports.create = async (req, res) => {
    const {
        body
    } = req;
    // 检查是否存在重复的 username 或 stuNo
    db.query('SELECT * FROM students WHERE username = ? OR stuNo = ?', [body.username, body.stuNo], (error, results, fields) => {
        if (error) throw error;

        if (results.length > 0) {
            res.json({
                code: -1,
                msg: "重复的用户名或学号!",
            });
            return;
        }
        db.query('INSERT INTO students SET ?', body, (error, results, fields) => {
            if (error) throw error;
            db.query('SELECT * FROM students WHERE id = ?', results.insertId, (error, data, fields) => {
                if (error) throw error;

                res.json({
                    code: 200,
                    msg: "新增学生成功!",
                    data: data[0]
                });
            });
        });
    });
};

exports.index = async (req, res) => {
    let {
        username
    } = req.query;
    let sql = 'SELECT * FROM students';

    if (username) {
        sql += ` WHERE username LIKE '%${username}%'`;
    }

    db.query(sql, (error, results, fields) => {
        if (error) throw error;

        res.json({
            code: 200,
            msg: "查询成功!",
            data: results
        });
    });
};

exports.detail = async (req, res) => {
    const {
        id
    } = req.params;

    db.query('SELECT * FROM students WHERE id = ?', [id], (error, results, fields) => {
        if (error) throw error;

        res.json({
            code: 200,
            msg: "查询成功!",
            data: results[0]
        });
    });
};