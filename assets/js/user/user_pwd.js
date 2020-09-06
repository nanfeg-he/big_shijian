$(function () {
    var form = layui.form

    form.verify({
        pwd: [/^[\S]{6,12}$/, "密码必须要6到12位,且不能为空格"],
        samepwd: function (value) {
            if (value === $("[name=oldPwd]").val()) {
                return "新旧密码不能一致"
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return "两次密码不一致"
            }
        }
    })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            //携带的参数看后端要求
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新密码失败！')
                }
                layui.layer.msg('更新密码成功！')
                // 重置表单
                $('.layui-form')[0].reset()
            }
        })
    })
})