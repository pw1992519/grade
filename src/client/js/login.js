$(document).ready(function () {
    $("#loginForm").submit(function (event) {
        event.preventDefault();
        var username = $("#username").val();
        var pwd = $("#password").val();
        var role = $('input[name="role"]:checked');
        if (!username) {
            alert('请输入用户名！')
            return;
        }
        if (!pwd) {
            alert('请输入密码！')
            return;
        }
        if (!username) {
            alert('请输入用户名！')
            return;
        }
        if (role.length == 0) {
            alert('请选择角色！')
            return;
        }
        role = role.val();
        $.ajax({
            url: baseUrl + '/api/auth/login',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                username,
                pwd,
                role
            }),
            success: function (data) {
                if (data.code === 200) {
                    alert('登录成功');
                    window.sessionStorage.userinfo = JSON.stringify(data.data);
                    if (role == 'student') {
                        window.location.href = "./studentIndex.html";
                    } else {
                        window.location.href = "./student.html";
                    }
                } else {
                    alert('登录失败: ' + data.msg);
                }
            },
            error: function (error) {
                console.error('发生错误:', error);
            }
        });
    });
});