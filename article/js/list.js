// 获取文章的请求参数
var data = {
    pagenum: 1, // 页码值，即获取第 n 页的数据
    pagesize: 2, // 每页显示几条数据
}

// 定义模板引擎的过滤器函数
template.defaults.imports.dateFormat = function(time) {
    // console.log(time); // 2021-01-16T08:40:41.000Z
    var date = new Date(time);
    var y = date.getFullYear();
    var m = addZero(date.getMonth() + 1);
    var d = addZero(date.getDate());
    return y + '-' + m + '-' + d;
}

// 补零函数
function addZero(n) {
    return n < 10 ? '0' + n : n;
}

//获取文章列表，渲染
function renderArticle() {
    $.ajax({
        url: '/my/article/list',
        data: data,
        success: function(res) {
            // 调用模板引擎，渲染数据
            var str = template('tpl-article', res);
            $('tbody').html(str);
            // res.total 表示数据总数
            // 当ajax请求成功后，然后再实现分页
            showPage(res.total);
        }
    });
}
renderArticle();