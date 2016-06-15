
var defaultCard = {
	id: "65332",
	name: "小精灵",
	pay: 0,
	attack: 1,
	defense: 1,
	src: "a.jpg",
	size: "big",
};

var Card = function(cardInfo){
	var that = this;
	that._id = cardInfo.id;
	that._name = cardInfo.name;
	that.pay = cardInfo.pay;
	that.attack = cardInfo.attack;
	that.defense = cardInfo.defense;
	that.src = cardInfo.src;
	that.size = cardInfo.size;
	that.nowAttack = that.attack;
	that.nowDefense = that.defense;
	that.nowPay = that.pay;
	return {
		getAttack : function(){
			return that.attack;
		},
		getDefense : function(){
			return that.defense;
		},
		getNowAttack : function(){
			return that.nowAttack;
		},
		getNowDefense : function(){
			return that.nowDefense;
		},
		getName: function(){
			return that._name;
		}
	}
}

var HandCard = (function(box){
	
	var _cards = [];

	return {
		getNewCard: function(cardInfo){
			var cardInfo = $.extend({}, defaultCard, cardInfo);
			var newCard = new Card(cardInfo);
			_cards.push(newCard);
			return;
		},
		refreshCard: function(){
			var modul = "<div class='handcard card_";
			for(var i = 0, len = _cards.length; i < len; i++){
				modul += i + "'>";
			}
			box.html('<div class="handcard card_1">1</div><div class="handcard card_2">2</div><div class="handcard card_3">3</div><div class="handcard card_4">4</div><div class="handcard card_5">5</div><div class="handcard card_6">6</div><div class="handcard card_7">7</div><div class="handcard card_8">8</div><div class="handcard card_9">9</div><div class="handcard card_10">10</div>')
		}
	}
})($(".mycard"));


