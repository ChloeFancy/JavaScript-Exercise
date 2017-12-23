//this——属性或方法当前所在的对象
//《JS高级程序设计》中讲到，this引用的是函数执行的环境对象
var person = {
	age:20,
	info:function(){
		console.log(this.age);
	}
}
person.info();
//info方法当前所在对象是person
info();
//info方法当前所在对象是window
var person2 = {
	age:25
}
person2.info = person.info;
person2.info();//25
//info方法当前所在的对象是person2
//function(){console.log(this.age);}是一个常量，作为一个右值赋给了person.info、person2.info
//this的指向可以改变的，在执行代码时指向方法所在的实例对象
//"JavaScript中，一切皆对象，运行环境也是对象"
//因此就解释了开头的关于this的两种说法

var obj = {
	foo:function(){
		console.log(this);
	}
}
obj.foo();//obj
(obj.foo=obj.foo)();//window
//因为左值可以看作是一个变量名，为其赋值的是右值——一个函数
function f(){
	console.log(this);
}
var obj = {
	foo:f;
}
obj.foo();//obj
f();//window
(a=f)();//window
(false||obj.foo)();//window
(1,obj.foo)();//window


var o = {
	f1:function(){
		console.log(this);
		var f2 = function(){
			console.log(this);
		}();
	}
}
o.f1();//Object Window
//因为在执行f1时，f1的执行环境是o
//而f2的执行环境是全局环境
function f(){
	console.log(this);
}
var o = {
	f1:function(){
		console.log(this);
		var f2 = f();
	}
}
//只有.和call、apply、bind才能确定函数的执行环境
//而f2=f();都不满足以上的条件，只相当于f2=f.apply(Window);
//how to fix it?
//1.通过作用域链
var o = {
	f1:function(){
		console.log(this);
		var that = this;//传值
		var f2 = function(){
			console.log(that);
		}();
	}
}
//that在当前匿名函数的环境变量中找不到，因此顺着作用域链，找到包含它的外一层的环境变量——f1对象，从而确定that的值
o.f1();
//f1
//f1
//"使用一个变量固定this的值，然后内层函数调用这个变量，是非常常见的做法，有大量应用，请务必掌握。"
//2.'use strict'
//
var counter = {
	c:0
};
counter.inc = function(){
	'use strict';
	this.c++;
};
var f = counter.inc;
f();
//Uncaught TypeError: Cannot read property 'c' of undefined at counter.inc (<anonymous>:6:2)
//this 一旦指向顶层对象，就会报错
var counter = {
	c:0
};
counter.inc = function(){
	this.c++;
};
var f = counter.inc;
f();
//不是严格模式下的话，没有报错

//当函数作为另一个函数的参数时，也要注意
//因为在这种情况下，该函数也相当于一个普通的常量，并没有所在的除Window以外的对象
//比如数组的遍历方法
//复习：
//1.every，相当于“且”
//2.some，相当于“或”
//3.filter，返回结果为真的数组项组成的数组
//4.map，返回对每一项应用函数后的返回值
//5.forEach，对每一项应用函数，无返回值
//会跳过空元素
var o = {
	v:'hello',
	p:['a1','a2'],
	f:function(){
		this.p.forEach(function(item,index,array){
			console.log(item+"  "+this.v);
		});
	}
}
o.f();
//undefined  a1
//undefined  a2
//
var o = {
	v:'hello',
	p:['a1','a2'],
	f:function(){
		var that = this;
		this.p.forEach(function(item,index,array){
			console.log(item+"  "+that.v);
		});
	}
}
o.f();
//hello  a1
//hello  a2
//
//或者可以传入第二个参数——运行该函数的作用域对象
var o = {
	v:'hello',
	p:['a1','a2'],
	f:function(){
		this.p.forEach(function(item,index,array){
			console.log(item+"  "+this.v);
		},this);
	}
}

//如何绑定this？
//call、apply、bind
var n=20;
function info(){
	console.log(this.n);
}
info.call();//20
info.call(null);//20
info.call(undefined);//20
//以上就传入全局环境
//如果传入基本类型值，则会转为基本包装类型
function info(){
	console.log(this);
}
info.call(20);//Number{20}

Object.prototype.hasOwnProperty.call({
	a:1
},'a');//true
//调用对象的原生方法
//如果需要传入多个值，可以使用apply
Math.min.apply(null,[1,2,3,4]);//1
Math.min(1,2,3,4);//1
Array.apply(null,[1,,3]);
//调用Array构造函数，将空元素变为undefined
Array.prototype.slice.apply({a:1,b:2,c:3});//[]

Array.prototype.slice.apply({a:1,b:2,c:3,length:3});
//[empty*3]
Array.prototype.slice.apply({0:'a',1:'b',2:'c',length:3});
//['a','b','c']
Array.prototype.slice.apply({1:'a',2:'b',3:'c',length:3});
//[empty,'a','b']
Array.prototype.slice.apply({4:'a',5:'b',6:'c',length:3});
//[empty*3]
//对象中的属性名必须是数字
//返回对象是从属性名为0开始的各项属性值
Array.prototype.slice.apply({4:'a',5:'b',6:'c',length:8});
//[empty × 4, "a", "b", "c", empty]
var a = [1,2,3,4];
console.log(a[1]);
console.log(a.1);
//Uncaught SyntaxError: missing ) after argument list
//数组对象的访问方法，用方括号，类似于访问对象属性时的方括号法，因此要将对象转换为数组时，只能转换属性名为数字的属性，必须有length属性


//bind
//真正地绑定函数中的this值并返回一个函数
function f(){
	console.log(this.info);
}
var o = {
	info:'123456',
	F:f
}
o.F();//'123456'
var F1 = o.F.bind(o);
F1();//'123456'
//还可以绑定函数的参数

var add = function(x,y){
	return x+y;
}
var add1 = add.bind(null,5);//null/undefined则自动默认绑定全局对象
add1(6);//11
var add2 = add.bind({x:1},5);//没有this就可以随便绑定
add2(6);//11

if(!('bind'in Fucntion.prototype){
	Function.prototype.bind = function(){
		var fn = this;
		var context = arguments[0];
		var args = Array.prototype.slice.call(arguments,1);
		return function(){
			return fn.apply(context.args);
		}
	}
}
//回调函数的使用中this的绑定
var o = {
	v:'hello',
	p:['a1','a2'],
	f:function(){
		this.p.forEach((function(item,index,array){
			console.log(item+"  "+this.v);
		}).bind(this));//this是当前所在的执行环境对象
	}
}
o.f();
//a1  hello
//a2  hello

[1,2,3].slice(0,1);
Array.prototype.slice.call([1,2,3],0,1);
(Function.prototype.call.bind(Array.prototype.slice))([1,2,3],0,1);

var push = Function.prototype.call.bind(Array.prototype.push);
var a=[1,2,3];
push(a,4);
a;//[1,2,3,4]

var bind = Function.prototype.call.bind(Function.prototype.bind);//返回一个绑定了this的新函数
bind(f,o)();
f.bind(o)();
function f(){
	console.log(this.a);
}
var o = {
	a:'123'
};
