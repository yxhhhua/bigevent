var form = layui.form;

//完成数据回填
function renderUser() {
    $.ajax({
        url: '/my/user/userinfo',
        success: function(res) {
            console.log(res);
            if (res.status === 0) {
                // 使用layui提供的数据回填方法
                // form.val('表单的lay-filter属性值', '对象形式的数据(对象的key要和表单各项的name属性值相同)');
                form.val('user', res.data);
            }
        }
    })
}
renderUser();

//完成用户信息的修改
$('from').on('submit', function(e) {
    e.preventDefault();
    // serialize系列不能收集到禁用状态的值
    var data = $(this).serializeArray();
    $.ajax({
        type: 'POST',
        url: '/my/user/userinfo',
        data: data,
        success: function(res) {
            layer.msg(res.message);
            if (res.status === 0) {
                window.parent.getUserInfo();
            }
        }
    })
});

//重置
$('button[type=reset]').on('click', function(e) {
    e.preventDefault();
    renderUser();
})