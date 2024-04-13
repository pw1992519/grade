var curMode = 'ADD';
var curItemId = null;

function clearForm() {
    $("#studentId").val('');
    $("#subjectId").val('');
    $("#score").val('');
}

function closeOverlay() {
    var overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
}

function handleAdd() {
    var overlay = document.getElementById('overlay');
    overlay.style.display = 'flex';
    clearForm();
    $("#form-container-tit").text('添加成绩');
    curMode = 'ADD';
}

function handleEdit(id, studentId, subjectId, score) {
    curItemId = id;
    var overlay = document.getElementById('overlay');
    overlay.style.display = 'flex';
    $("#studentId").val(studentId);
    $("#score").val(Number(score));
    $("#subjectId").val(subjectId);
    $("#form-container-tit").text('编辑成绩');
    curMode = 'EDIT';
}

function handleEnter() {
    if (!$("#studentId").val()) {
        alert('请选择学生！');
        return;
    }
    if (!$("#subjectId").val()) {
        alert('请选择学科！');
        return;
    }
    if ($("#score").val() == '') {
        alert('请输入分数！');
        return;
    }
    if (Number($("#score").val()) < 0 || Number($("#score").val()) > 100) {
        alert('请输入0到100的分数！');
        return;
    }
    if (curMode == 'ADD') {
        $.ajax({
            url: baseUrl + '/api/scores',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                studentId: $("#studentId").val(),
                subjectId: $("#subjectId").val(),
                score: Number($("#score").val()),
            }),
            success: function (data) {
                if (data.code === 200) {
                    alert('创建成功！');
                    getData();
                    closeOverlay();
                } else {
                    alert(data.msg);
                }
            },
            error: function (error) {
                console.error('发生错误:', error);
            }
        });
    } else {
        $.ajax({
            url: baseUrl + '/api/scores/' + curItemId,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({
                studentId: $("#studentId").val(),
                subjectId: $("#subjectId").val(),
                score: Number($("#score").val()),
            }),
            success: function (data) {
                if (data.code === 200) {
                    alert('编辑成功！');
                    getData();
                    closeOverlay();
                }
            },
            error: function (error) {
                console.error('发生错误:', error);
            }
        });
    }
}

function getData() {
    $.ajax({
        url: baseUrl + '/api/scores',
        method: 'GET',
        contentType: 'application/json',
        success: function (data) {
            if (data.code === 200) {
                console.log("data = ", data)
                if (data.data.length == 0) {
                    $('.empty').show();
                } else {
                    $('.empty').hide();
                }
                let html = '';
                data.data
                    .forEach((item) => {
                        html += `
                    <tr>
                        <td>${item.student_username}</td>
                        <td>${item.subject_title}</td>
                        <td>${item.score}</td>
                        <td>${date2Local(item.created_at)}</td>
                        <td style="width: 133px;">
                            <button onclick="handleEdit('${item.id}', '${item.studentId}', '${item.subjectId}', '${item.score}')" class="btn-edit">编辑</button>
                            <button onclick="handleDelete('${item.id}')" class="btn-delete">删除</button>
                        </td>
                    </tr>
                    `;
                    })
                $('#tableBody').html(html);

            }
        },
        error: function (error) {
            console.error('发生错误:', error);
        }
    });

}
getData();

function handleDelete(id) {
    $.ajax({
        url: baseUrl + '/api/scores/' + id,
        method: 'DELETE',
        contentType: 'application/json',
        success: function (data) {
            if (data.code === 200) {
                alert('删除成功！');
                getData();
            }
        },
        error: function (error) {
            console.error('发生错误:', error);
        }
    });
}


function getStudents() {
    $.ajax({
        url: baseUrl + '/api/students',
        method: 'GET',
        contentType: 'application/json',
        success: function (data) {
            if (data.code === 200) {
                let html = '';
                data.data
                    .forEach((item) => {
                        html += `
                        <option value="${item.id}">${item.username}</option>
                    `;
                    })
                $('#studentId').html(html);
            }
        },
        error: function (error) {
            console.error('发生错误:', error);
        }
    });

}
getStudents();

function getSubjects() {
    $.ajax({
        url: baseUrl + '/api/subjects',
        method: 'GET',
        contentType: 'application/json',
        success: function (data) {
            if (data.code === 200) {
                let html = '';
                data.data
                    .forEach((item) => {
                        html += `
                        <option value="${item.id}">${item.title}</option>
                    `;
                    })
                $('#subjectId').html(html);
            }
        },
        error: function (error) {
            console.error('发生错误:', error);
        }
    });

}
getSubjects();