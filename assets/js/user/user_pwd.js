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
})