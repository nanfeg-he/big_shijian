$(function () {
    getUserInfo()


    var layer = layui.layer


    $('#btnLogout').on('click', function () {
        // 提示用户是否确认退出
        layer.confirm('确定退出登录?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //do something
            // 清空本地存储中的 token
            localStorage.removeItem('token')
            // 重新跳转到登录页面
            location.href = '/login.html'

            // 关闭 confirm 询问框
            layer.close(index)
        })
    })



})


// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        /*  headers: {
             Authorization: localStorage.getItem('token') || ''
         }, */
        success: function (res) {
            console.log(res)
            if (res.status !== 0) {
                return layui.layer.msg("获取用户信息失败")
            } else {
                renderAvatar(res.data)
            }
        },

        complete: function (res) {
            // console.log(res)
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                // 强制清空 token
                localStorage.removeItem('token')
                //强制跳转到登录页面
                location.href = '/login.html'
            }
        }
    })

}


// 渲染用户的头像
function renderAvatar(user) {
    // 获取用户的名称
    var name = user.nickname || user.username
    //  设置欢迎
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    //  按需渲染用户的头像
    if (user.user_pic !== null) {
        //  渲染图片头像
        $('.layui-nav-img')
            .attr('src', user.user_pic)
            .show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar')
            .html(first)
            .show()
    }
}