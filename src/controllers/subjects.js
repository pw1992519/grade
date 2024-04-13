const db = require("../db");

exports.update = async (req, res) => {
    const {
        id
    } = req.params;
    const {
        body
    } = req;

    // 检查是否存在重复的 title 或 subjectCode
    db.query('SELECT * FROM subjects WHERE (title = ? OR subjectCode = ?) AND id != ?', [body.title, body.subjectCode, id], (error, results, fields) => {
        if (error) throw error;

        if (results.length > 0) {
            res.json({
                code: -1,
                msg: "重复的学科名称或学科码!", 
            }); 
            return;
        }

        db.query('UPDATE subjects SET ? WHERE id = ?', [body, id], (error, results, fields) => {
            if (error) throw error;

            db.query('SELECT * FROM subjects WHERE id = ?', [id], (error, data, fields) => {
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

    db.query('DELETE FROM subjects WHERE id = ?', [id], (error, results, fields) => {
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
    // 检查是否存在重复的 title 或 subjectCode
    db.query('SELECT * FROM subjects WHERE title = ?', [body.title, body.subjectCode], (error, results, fields) => {
        if (error) throw error;

        if (results.length > 0) {
            res.json({
                code: -1,
                msg: "重复的学科名称或学科码!",
            });
            return;
        }
        db.query('INSERT INTO subjects SET ?', body, (error, results, fields) => {
            if (error) throw error;
            db.query('SELECT * FROM subjects WHERE id = ?', results.insertId, (error, data, fields) => {
                if (error) throw error;

                res.json({
                    code: 200,
                    msg: "新增成功!",
                    data: data[0]
                });
            });
        });
    });
};

exports.index = async (req, res) => {
    let {
        title
    } = req.query;
    let sql = 'SELECT * FROM subjects';

    if (title) {
        sql += ` WHERE title LIKE '%${title}%'`;
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

    db.query('SELECT * FROM subjects WHERE id = ?', [id], (error, results, fields) => {
        if (error) throw error;

        res.json({
            code: 200,
            msg: "查询成功!",
            data: results[0]
        });
    });
};