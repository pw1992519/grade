var curMode = 'ADD';
var curItemId = null;

function clearForm() {
    $("#title").val('');
    $("#subjectCode").val('');
}

function closeOverlay() {
    var overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
}

function handleAdd() {
    var overlay = document.getElementById('overlay');
    overlay.style.display = 'flex';
    clearForm();
    $("#form-container-tit").text('添加学科');
    curMode = 'ADD';
}

function handleEdit(id, title, subjectCode) {
    curItemId = id;
    var overlay = document.getElementById('overlay');
    overlay.style.display = 'flex';
    $("#title").val(title);
    $("#subjectCode").val(subjectCode);
    $("#form-container-tit").text('编辑学科');
    curMode = 'EDIT';
}

function handleEnter() {
    if (!$("#title").val()) {
        alert('请输入学科用户名！');
        return;
    }
    if (!$("#subjectCode").val()) {
        alert('请输入学科密码！');
        return;
    }
    if (curMode == 'ADD') {
        $.ajax({
            url: baseUrl + '/api/subjects',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                title: $("#title").val(),
                subjectCode: $("#subjectCode").val(),
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
            url: baseUrl + '/api/subjects/' + curItemId,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({
                title: $("#title").val(),
                subjectCode: $("#subjectCode").val(),
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
        url: baseUrl + '/api/subjects',
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
                        <td>${item.title}</td>
                        <td>${item.subjectCode}</td>
                        <td>${date2Local(item.created_at)}</td>
                        <td style="width: 133px;">
                            <button onclick="handleEdit('${item.id}', '${item.title}', '${item.subjectCode}')" class="btn-edit">编辑</button>
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
        url: baseUrl + '/api/subjects/' + id,
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