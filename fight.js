var all_cards = new Array(), //所有卡牌
    my,
    en,
    my_follower = new Array(), //我方随从
    en_follower = new Array(), //地方随从
    my_hc = new Array(), //我方手牌
    en_hc = new Array(), //敌方手牌
    my_store = new Array(), //我的卡组
    en_store = new Array(), //
    my_list = new Array(), //我的卡组(数字版)
    en_list = new Array(); //

start();//游戏开始 ,进行初始化以及第一次发牌

//创建新的我
function newmy() {
    my = {
        blood: 30,
        magic: 1
    }

}
//创建新的敌人
function newen() {
    en = {
        blood: 30,
        magic: 1
    }
}
//设置所有卡牌
function setAllCards() {
    var j = 0;
    for (var i = 0; i < 10; i++) {
        j = i * 3;
        all_cards[j] = newcard(i, j, j + 1);
        all_cards[j + 1] = newcard(i, j + 1, j);
        all_cards[j + 2] = newcard(i, j + 1, j + 1);
    }
}
//创造新卡
function newcard(a, b, c) {
    return card = {
        magic: a,
        attack: b,
        blood: c
    }
}
//根据list设置卡组
function setstore(list) {
    var store = new Array();
    for (var i = 0; i < 30; i++) {
        store[i] = all_cards[list[i]];
    }
    return store;
}


//开始游戏
function start() {
    // 初始化所有卡牌种类
    setAllCards();

    //初始化我和对手
    newmy();
    newen();

    //我方和对方的卡组
    for (var i = 0; i < 30; i++) {
        my_list[i] = i;
    }
    my_store = setstore(my_list);

    for (var i = 0; i < 30; i++) {
        en_list[i] = i;
    }
    en_store = setstore(en_list);
    getCard("my", 3); //我抽三张
    getCard("en", 3); //敌人抽三张

}

//抽牌
function getCard(who, num) {
    var ran; //随机数 0-30
    var element; //存放创建的元素
    var container; //手牌的父层div
    if (who == "my") { //如果是给我牌
        for (var i = 0; i < num; i++) {

            //在页面中添加卡牌
            container = $("#mycard").children("div").get(0);
            element = $("<div></div>").appendTo(container);
            element.attr("class", "handcard");
            element.css("z-index", my_hc.length * 100 + 100);
            //加手牌 , 删牌库
            ran = Math.round(Math.random() * my_store.length);
            my_hc[my_hc.length] = {
                card:my_store[ran],
                element:$(element[0])
            }
            my_store[ran] = my_store[my_store.length - 1];
            my_store.length -= 1;
            changeRotate(); //刷新角度
        }
    } else if (who == "en") { //如果是给我牌
        for (var i = 0; i < num; i++) {
            container = $("#encard").children("div").get(0);
            element = $("<div></div>").appendTo(container);
            element.attr("class", "handcard");
            element.css("z-index", en_hc.length * 100 + 100);
            //加手牌 , 删牌库
            ran = Math.round(Math.random() * en_store.length);
            en_hc[en_hc.length] = {
                card:en_store[ran],
                element:$(element[0])
            }
            en_store[ran] = en_store[en_store.length - 1];
            en_store.length -= 1;
            changeRotate();
        }
    } else {
        console.log("wrong") //这是不可能的hhh
    }
}

function changeRotate() {
    var num;//手牌数量
    var angle;//角度
    num = my_hc.length;
    
    for (var i = 0; i < num; i++) {
        angle = (2*i-num+1)*3;//每张牌间隔6deg

        my_hc[i].element.css("transform","rotate("+angle+"deg)");
        my_hc[i].element.hover(function(){
            var x = i-1;
            var left = (2*x-num+1)*5+50
            my_hc[x].element.css("left",left+"%");
            my_hc[x].element.css("z-index","2000");
            my_hc[x].element.css("transform","rotate(0deg) scale(2, 2) translate(0, 60px)");
        },function(){
            var x = i-1;
            var theAngle = angle;
            console.log(theAngle);console.log(theAngle);
            my_hc[x].element.css("left","");
            my_hc[x].element.css("z-index",x*100+100);
            my_hc[x].element.css("transform","rotate("+theAngle+"deg)");
        });
    }
}

//在随从上点击鼠标
function press(e) {
    attacker = e; //攻击者(全局变量)
}

//在对面随从或英雄头上松开鼠标
function attacked(e) {
    victim = e; //受害者(全局变量)

    hit();
    if (isHeroDie()) {
        gameOver();
    }
}

//攻击事件
function hit() {
    if (attacker == canAttack) { //伪代码 , 表示为可攻击者
        if (victim == canHurt) { //伪代码 , 表示为可被攻击者
            attacker.blood -= victim.attack;
            victim.blood -= attacker.attack;
        }
    }
    if (attacker.blood <= 0) {
        kill(attacker);
    }
    if (victim.blood <= 0) {
        kill(victim);
    }
}

//有随从被杀死
function kill(dead) {
    //删掉数据和element
}
