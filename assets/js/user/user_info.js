$(function() {
    const form = layui.form
    form.verify({
        nickname: (value) => {
            if (value.length > 6){
                return '昵称长度不能超过6个字符'
            }
        },
    })

    const initUserinfo = () => {
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success: (res) => {
                if (res.status !== 0) layer.msg(res.message);
                layer.msg('获取用户信息成功');
                console.log(res);
                form.val('formUserInfo', res.data);
            }
        })
    }

    initUserinfo()

    $('#btnReset').click((e) => {
        e.preventDefault();
        initUserinfo();
    })

    $('.layui-form').submit(function(e){
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg('更新用户信息成功');
                window.parent.getUserinfo();

            }

        })
    })
})