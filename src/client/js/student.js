var curMode = 'ADD';
var curItemId = null;

function clearForm() {
    $("#username").val('');
    $("#pwd").val('');
    $("#stuNo").val('');
    $("#clzz").val('');
}

function closeOverlay() {
    var overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
}

function handleAdd() {
    var overlay = document.getElementById('overlay');
    overlay.style.display = 'flex';
    clearForm();
    $("#form-container-tit").text('添加学生');
    curMode = 'ADD';
}

function handleEdit(id, username, pwd, stuNo, clzz) {
    curItemId = id;
    var overlay = document.getElementById('overlay');
    overlay.style.display = 'flex';
    $("#username").val(username);
    $("#pwd").val(pwd);
    $("#stuNo").val(stuNo);
    $("#clzz").val(clzz);
    $("#form-container-tit").text('编辑学生');
    curMode = 'EDIT';
}

function handleEnter() {
    console.log("a = ", $("#username").val())
    if (!$("#username").val()) {
        alert('请输入学生用户名！');
        return;
    }
    if (!$("#pwd").val()) {
        alert('请输入学生密码！');
        return;
    }
    if (!$("#stuNo").val()) {
        alert('请输入学号！');
        return;
    }
    if (!$("#clzz").val()) {
        alert('请请输入班级！');
        return;
    }
    if (curMode == 'ADD') {
        $.ajax({
            url: baseUrl + '/api/students',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                username: $("#username").val(),
                pwd: $("#pwd").val(),
                stuNo: $("#stuNo").val(),
                clzz: $("#clzz").val(),
            }),
            success: function (data) {
                if (data.code === 200) {
                    alert('创建成功！');
                    getData();
                    closeOverlay();
                }else{
                    alert(data.msg);
                }
            },
            error: function (error) {
                console.error('发生错误:', error);
            }
        });
    } else {
        $.ajax({
            url: baseUrl + '/api/students/' + curItemId,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({
                username: $("#username").val(),
                pwd: $("#pwd").val(),
                stuNo: $("#stuNo").val(),
                clzz: $("#clzz").val(),
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
        url: baseUrl + '/api/students',
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
                        <td>${item.username}</td>
                        <td>${item.pwd}</td>
                        <td>${item.stuNo}</td>
                        <td>${item.clzz}</td>
                        <td>${date2Local(item.created_at)}</td>
                        <td style="width: 133px;">
                            <button onclick="handleEdit('${item.id}', '${item.username}', '${item.pwd}', '${item.stuNo}', '${item.clzz}')" class="btn-edit">编辑</button>
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
        url: baseUrl + '/api/students/' + id,
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