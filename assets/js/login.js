$(function () {

    $('#inputUsername').focus();
    $('#btnLogin').click(function () {
        var username = $('#inputUsername').val();
        var password = $('#inputPassword').val();
        if ($.trim(username) == '') {
            $('#inputUsername').focus();
            layer.msg('用户名不能空！', { icon: 7 });
            return false;
        }
        if ($.trim(password) == '') {
            $('#inputPassword').focus();
            layer.msg('密码不能空！', { icon: 7 });
            return false;
        }

        login(username, password);

        return false;
    });
});

