//通用配置文件

//根路径
var baseUrl = "http://www.itcbc.com:8080";

$.ajaxPrefilter(function(option) {
    //option 表示ajax请求的选项，我们可以对选项进行修改

    option.url = baseUrl + option.url;
    //配置headers，因为请求以 /my开头的接口的时候，必须带请求头
    option.headers = {
        Authorization: localStorage.getItem('token')
    };

    option.complete = function(xhr) {
        var res = xhr.responseJSON;
        if (res && res.status === 1 && res.message === '身份认证失败！') {
            localStorage.removeItem('token');
            location.href = './login.html';
        }
        // 其他错误
        if (res && res.status === 1) {
            layer.msg(res.message);
        }
    }
})