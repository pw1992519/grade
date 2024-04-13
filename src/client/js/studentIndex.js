function handleSearch() {
    if (!$("#subjectId").val()) {
        alert('请选择学科！');
        return;
    }
    $.ajax({
        url: baseUrl + '/api/scores',
        method: 'GET',
        data: {
            subjectId: $("#subjectId").val(),
            studentId: userinfo.id
        },
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
$("#uname").text(userinfo.username)
$("#ustuno").text(userinfo.stuNo)
$("#uclzz").text(userinfo.clzz)