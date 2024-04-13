const db = require("../db");

exports.update = async (req, res) => {
    const {
        id
    } = req.params;
    const {
        body
    } = req;
    // 检查是否存在重复的学生、学科数据
    db.query('SELECT * FROM scores WHERE studentId = ? AND subjectId = ? AND id != ?', [body.studentId, body.subjectId, id], (error, results, fields) => {
        if (error) throw error;

        if (results.length > 0) {
            res.json({
                code: -1,
                msg: "已存在该学生、该学科的数据!",
            });
            return;
        }
        // 不存在重复数据，执行更新操作
        db.query('UPDATE scores SET ? WHERE id = ?', [body, id], (error, results, fields) => {
            if (error) throw error;

            // 返回更新后的数据 
            db.query('SELECT * FROM scores WHERE id = ?', [id], (error, data, fields) => {
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

    db.query('DELETE FROM scores WHERE id = ?', [id], (error, results, fields) => {
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
    const {
        studentId,
        subjectId
    } = body;

    // 检查是否已存在该学生、该学科的数据
    db.query('SELECT * FROM scores WHERE studentId = ? AND subjectId = ?', [studentId, subjectId], (error, results, fields) => {
        if (error) throw error;

        if (results.length > 0) {
            res.json({
                code: -1,
                msg: "已存在该学生、该学科的数据!",
            });
            return;
        }

        // 不存在重复数据，执行新增操作
        db.query('INSERT INTO scores SET ?', body, (error, results, fields) => {
            if (error) throw error;
            db.query('SELECT * FROM scores WHERE id = ?', results.insertId, (error, data, fields) => {
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
    let { studentId, subjectId } = req.query;
    let sql = 'SELECT scores.*, students.username AS student_username, subjects.title AS subject_title FROM scores';
    sql += ' LEFT JOIN students ON scores.studentId = students.id';
    sql += ' LEFT JOIN subjects ON scores.subjectId = subjects.id';
    sql += ' WHERE 1';

    if (studentId) {
        sql += ` AND scores.studentId = ${studentId}`;
    }

    if (subjectId) {
        sql += ` AND scores.subjectId = ${subjectId}`;
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

    db.query('SELECT * FROM scores WHERE id = ?', [id], (error, results, fields) => {
        if (error) throw error;

        res.json({
            code: 200,
            msg: "查询成功!",
            data: results[0]
        });
    });
};