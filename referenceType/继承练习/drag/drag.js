function Drag(obj){
	this.obj = obj;
}
Drag.prototype.init = function(){
	var that = this;
	this.obj.onmousedown = function(e){
		e = e||window.event;
		that.fnDown(e);
		document.onmousemove = function(e){
			e = e||window.event;
			that.fnMove(e);
		};
		document.onmouseup = function(){
			that.fnUp();
		};
		return false;
	}
};

Drag.prototype.fnDown = function(e){
	this.distX = e.clientX-this.obj.offsetLeft;
	this.distY = e.clientY-this.obj.ofsetTop;
};

Drag.prototype.fnMove = function(e){
	this.obj.style.left = e.clientX-this.distX+'px';
	this.obj.style.top = e.clientY-this.distY+'px';
};

Drag.prototype.fnUp = function(){
	document.onmousemove = document.onmouseup = null;
}

function ChileDrag(obj){
	Drag.call(this,obj);
}

if(!Object.create){
	Object.create = function(obj){
		function f(){};
		f.prototype = obj;
		return new f();
	};
}
ChileDrag.prototype = Object.create(Drag.prototype);
ChileDrag.prototype.constructor = ChileDrag;
var drag1 = new Drag(test1);
drag1.init();
ChileDrag.prototype.fnMove = function(e){
	var L = e.clientX-this.distX;
	var T = e.clientX-this.distY;
	if(L<0)
		L=0;
	if(T<0)
		T=0;
	this.obj.style.left = L+'px';
	this.obj.style.top = T+'px';
};
var drag2 = new ChileDrag(test2);
drag2.init();


