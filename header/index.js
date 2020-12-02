(function() {
    

$('.logo').hover(function () {
    $('.logo-title').removeClass('hover-out');
    if (!$('.logo-bg').hasClass('animate-start')) {
        $('.logo-title').removeClass('animate-end');
        $('.logo-bg').css({
            backgroundImage: 'url("http://img1.360buyimg.com/da/jfs/t1/15264/1/11653/343050/5c90a38aEdb3eb3a8/f0c3252484139946.gif?v=' + new Date().getTime() +'")'
        }).addClass('animate-start');
        setTimeout(function() {
            $('.logo-bg').removeClass('animate-start');
            $('.logo-title').addClass('animate-end');
        }, 5000)
    }
    $('.logo-title').addClass('show-bg');
}, function () {
    if(!$('.logo-bg').hasClass('animate-start')) {
        $('.logo-title').addClass('animate-end');
        $('.logo-title').removeClass('show-bg');
    } 
    $('.logo-title').addClass('hover-out');
})
window.dealData = function (res) {
    console.log(res);
    var data = res.result;
    var str = "";
    data.forEach(function (item) {
        str += `<li>${item[0]}</li>`
    });
    $('.search-list').html(str).show()
}
var timer = null;
$('#search-inp').on('input', function () {
    clearTimeout(timer);
    var val = $(this).val();
    timer = setTimeout(function () {
        $.ajax({
            url: "https://suggest.taobao.com/sug",
            data: {
                code: 'utf-8',
                q: val,
                callback: 'dealData',
            },
            dataType: 'jsonp',
            type: 'get'
        });
    }, 500)
}).click(function () {
    $('.search-list').show();
});
$('.search-box').mouseleave(function () {
    $('.search-list').hide();
})

}())