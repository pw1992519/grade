let baseUrl = 'http://localhost:5000';
let userinfo = window.sessionStorage.getItem('userinfo');
if (userinfo) {
    userinfo = JSON.parse(userinfo);
    if (document.getElementById('headpic')) {
        if(userinfo.clzz){
            $('#headpic').prop('src', '../img/boy.png')
        }else{
            $('#headpic').prop('src', '../img/admin.png')
        }
        $('#husername').text(userinfo.username)
    }
    $("#logout").click(function () {
        window.sessionStorage.removeItem('userinfo');
        window.location.href = './login.html';
    })
}else{
    if((window.location.href.indexOf('login') == -1)){
        window.location.href = './login.html';
    }
}

function date2Local(utcTimeString) {
    const date = new Date(utcTimeString);
    const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    const formattedDate = localDate.toISOString().split('T')[0];
    const formattedTime = localDate.toTimeString().split(' ')[0];
    return `${formattedDate} ${formattedTime}`;
}