var list = [
    {
        src: '//img10.360buyimg.com/n0/s80x80_jfs/t1/128193/24/8382/179784/5f22a1feE8d00f8db/b9f2257379875ca6.jpg.dpg',
        title: '海贼王蒙奇D路飞四档手办超大雕像 大型蛇人模型 大猿王造型摆件 和之国路',
        introduce: '和之国路飞(凯多龙)',
        number: 1,
        price: '￥798.00',
    },
    {
        src: 'https://img11.360buyimg.com/n0/s80x80_jfs/t1/132488/21/14459/212742/5f9f6785E8f7b7256/f1b0859a9583a1f2.jpg.dpg',
        title: '虔生缘 航海王海贼王手办动漫草帽路飞四档超大型全套限量版模型生日礼物',
        introduce: '群鸦炮路飞',
        number: 1,
        price: '￥1388.00'
    },
    {
        src: 'https://img30.360buyimg.com/n0/s80x80_jfs/t1/133363/3/3740/549390/5f018eebEeec6a08a/fa6adf7f6be42e62.jpg.dpg',
        title: '平安夜圣诞节元旦礼物海贼王手办四皇模型路飞索隆艾斯公仔动漫生日礼物摆',
        introduce: '四皇',
        number: 1,
        price: '￥968.00'
    },
    {
        src: 'https://img13.360buyimg.com/n0/s80x80_jfs/t1/111166/23/16170/71058/5f4646d0E93219cd4/0fc37ea8227cfd38.jpg.dpg',
        title: '海贼王手办索隆阿修罗日版三千世界三把刀原装万代和之国手办模型 万代',
        introduce: '万代 MEGAHOUSE',
        number: 1,
        price: '￥4,184.00'
    },
    {
        src: 'https://img14.360buyimg.com/n0/s80x80_jfs/t1/130798/2/8835/137350/5f4dfadfE18abe067/4d203c28c57bd60a.jpg.dpg',
        title: '小棒槌GK 弗兰奇将军 海贼王 限量手办雕像 现货 邮费保价到付',
        introduce: '现货',
        number: 1,
        price: '￥8,133.00'
    },
    {
        src: 'https://img12.360buyimg.com/n0/s80x80_jfs/t1/127656/31/10528/242276/5f41cc75Ec66c03d7/70d57e1b24e6b1a4.jpg.dpg',
        title: '海贼王GK和之国和服路飞F3三档大手雕像手办原色电镀色男女朋友 雷神艾',
        introduce: '雷神艾尼路',
        number: 1,
        price: '￥1,656.00'
    },
    {
        src: 'https://img30.360buyimg.com/n0/s80x80_jfs/t1/128027/27/10345/205973/5f41cc74E127649fb/b1ad95c27d642433.jpg.dpg',
        title: '海贼王GK和之国和服路飞F3三档大手雕像手办原色电镀色男女朋友 可乐路',
        introduce: '可乐路飞',
        number: 1,
        price: '￥1,062.00'
    },
    {
        src: 'https://img11.360buyimg.com/n0/s80x80_jfs/t1/120717/31/10261/162269/5f3f47f8Ef5f63788/803954c96e805dea.jpg.dpg',
        title: '海贼王手办 GK 三千世界索隆双头雕 大型 大 模型 摆件 路飞 索隆+红衣索',
        introduce: '索隆+红衣索隆',
        number: 1,
        price: '￥1,546.00'
    }
];
var content = document.querySelector('.shopping-content');
var resultMoney = document.getElementsByClassName('result')[0];
function render(src, title, introduce, price, number) {
    var element = document.createElement('div');
    element.className = 'shopping-list';
    element.innerHTML = `
    <img src="${src}" alt="">
        <div class="title">${title}</div>
        <div class="introduce">${introduce}</div>
        <div class="price">${price}</div>
        <span class="reduce"->-</span>
        <div class="number">${number}</div>
        <span class="plus">+</span>
        <div class="total">${price}</div>
        <div class="operation">
            <span class="delete">删除</span>
        </div>
    `
    content.appendChild(element);
};
for (var i = 0; i < list.length; i++) {
    var temp = list[i];
    render(temp.src, temp.title, temp.introduce, temp.price, temp.number, temp.total);
}

var leftBtn = document.getElementsByClassName('reduce');
var rightBtn = document.getElementsByClassName('plus');
var number = document.getElementsByClassName('number');
var deleteBtn = document.getElementsByClassName('delete');
function calculation(total, num, price) {
    return num * price;
}

function findIndex(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == target) {
            return i;
        }
    }
}

function getIndex(e) {
    var node = e.target.parentNode.parentNode.children;
    var index = findIndex(node, e.target.parentNode)
}

function renderNum(target, num) {
    target.innerHTML = num;
}
var result = null;
var money = 0;
for (let j = 0; j < leftBtn.length; j++) {
    leftBtn[j].onclick = function (e) {
        var target = e.target.parentNode.children[5];
        var num = target.innerHTML;
        var total = e.target.parentNode.children[7];
        var price = (target.parentNode.children[3].innerHTML).slice(1);
        if (num <= 1) {
            return;
        } else {
            num--;
        }
        result = calculation(total, num, price).toFixed(2);
        total.innerHTML = '￥' + result;
        renderNum(target, num);
        addMoney();
    }

    rightBtn[j].onclick = (e) => {
        var sub = getIndex(e);
        var target = e.target.parentNode.children[5];
        var num = target.innerHTML;
        var total = e.target.parentNode.children[7];
        var price = (target.parentNode.children[3].innerHTML).slice(1);
        num++;
        result = calculation(total, num, price).toFixed(2);
        total.innerHTML = '￥' + result;
        renderNum(target, num);
        addMoney();
    }

    deleteBtn[j].onclick = (e) => {
        var node = e.target.parentNode.parentNode.parentNode.children;
        var index = findIndex(node, e.target.parentNode.parentNode);
        var removeChild = content.children[index];
        content.removeChild(removeChild)
        addMoney();
    }

}

function addMoney() {
    var result = 0;
    for (var i = 1; i <= leftBtn.length; i++) {
        money = (content.children[i].children[7].innerHTML).slice(1);
        money = Number(money.replace(/,/, ""));
        result += money;
        console.log(result)
    }
    resultMoney.innerHTML = result;
}