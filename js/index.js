

$('.swiper-1').swiper({
    list: $('.focus-item-img'),
    type: 'fade',
    autoChange: true,
    autoTime: 3000,
    spotPosition:'left'
});
$('.swiper-2').swiper({
    list: $('.focus-item__recommend'),
    type: 'fade',
    autoChange: true,
    autoTime: 10000,
    showSpotBtn: false,
    showChangeBtn: 'hover'
});

$('.seckill-list').swiper({
    list: $('.seckill-list-item'),
    type: 'animation',
    autoTime: 10000,
    showSpotBtn: false,
})
$('.seckill-brand').swiper({
    list: $('.brand-item'),
    type: 'animation',
    autoTime: 2000,
    autoChange: true,
    showChangeBtn: 'hidden',
    spotPosition: 'center'
});
$('.shortcut').load("./shortcut/index.html");
$('.header').load("./header/index.html");

$('.fs-1').load('./fs/fs1.html');
$('.fs-3').load('./fs/fs3.html');

$('.seckill-count').load('./seckill/index.html')

$('.footer').load('./footer/index.html');

