// ---------------------- 切换两个盒子 ----------------------
$('.login a').on('click', function() {
    $('.login').hide().next().show();
});

$('.register a').on('click', function() {
    $('.login').show().next().hide();
});
//注册功能
//表单提交>阻止默认行为>收集表单数据(查询字符串)>Ajax提交
$('.register form').on('submit', function(e) {
        e.preventDefault();
        var data = $(this).serialize();
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: data,
            success: function(res) {
                layer.msg(res.message);
                if (res.status === 0) {
                    //清空输入框，找到表单，转成DOM对象，调用DOM方法reset，重置表单
                    $('.register form')[0].reset();
                    //切换到登录的盒子
                    $('.login').show().next().hide();
                }
            }
        })
    })
    //自定义表单验证
    //必须使用layui的内置模块-FORM模块
    //只要使用layui的模块，必须加载模块
var form = layui.form;
//调用form模块内置方法verify,自定义验证规则
form.verify({
    //键(验证规则)：值(验证方法)
    user: [/^[a-zA-Z0-9]{2,10}$/, '用户只能是数字字母，且2~10位'],
    len: [/^\S{6,12}$/, '密码6~12位且不能有空格'],
    same: function(val) {
        // 形参，表示使用该验证规则的输入框的值（谁用这个验证规则，val表示谁的值）
        // 案例中，重复密码使用了这个验证规则，所以形参val表示输入的重复密码
        if (val !== $('.pwd').val()) {
            // return '错误提示'
            return '两次密码不一致';
        }
    }
})

//登录功能
//找到表单，注册submit事件--> 阻止默认行为——>收集表单数据——>Ajax提交
$('.login form').on('submit', function(e) {
    e.preventDefault();
    var data = $(this).serializeArray();
    $.ajax({
        type: "POST",
        url: '/api/login',
        data: data,
        //请求成功后，触发下面的success
        success: function(res) {
            //提示
            layer.msg(res.message);
            if (res.status === 0) {
                //登录成功后，把token保存到本地存储中
                localStorage.setItem('token', res.token);
                location.href = './index.html';
            }
        },
        //失败后触发
        error: function(xhr) {
            var res = xhr.responseJSON; //表示响应的结果
            if (res && res.status === 1) {
                layer.msg(res.message);
            }
        },
        // beforeSend: function () {
        //     //请求发送之前触发
        // },
        // complete: function (xhr) {
        //     //请求完成（成功、失败）后触发
        // }
    })
})