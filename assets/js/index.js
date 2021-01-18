//获取用户信息，渲染到头像区域
function getUserInfo() {
    $.ajax({
        url: '/my/user/userinfo',
        success: function(res) {
            // console.log(res);
            if (res.status === 0) {
                //欢迎你,xxx
                var name = res.data.nickname || res.data.username;
                $('.username').text(name);
                //头像
                if (res.data.user_pic) {
                    //有图片
                    $('.layui-nav-img').attr('src', res.data.user_pic).show();
                    $('.text-avatar').hide();
                } else {
                    //没有图片
                    var first = name.substr(0, 1).toUpperCase();
                    //show方法作用是恢复元素默认的样式
                    $('.text-avatar').text(first).css('display', 'inline-block');
                }
            }
        }
    })
}
getUserInfo();
//退出功能
//删除token 页面跳转到login.html
$('#logout').on('click', function(e) {
    e.preventDefault();
    layer.confirm('你确定要退出吗?', function(index) {
        //do something
        localStorage().removeItem('token');
        location.href = './login.html';
        layer.close(index);
    });
});