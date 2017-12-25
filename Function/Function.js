//函数
//函数表达式
//函数声明，特点：声明提升
//Function构造函数
var foo = new Function('b','var a=b;returna a;');
//最后一个参数才会被当作函数语句，前面的都是参数

//如果没有return 相当于返回undefined
if(condition){
	function f(){

	}
}else{
	function f(){

	}
}
//无效的语法，因为函数声明会提升，大多数浏览器会声明后一个函数
//因此可以使用函数表达式

//如果函数声明和表达式同时采用来声明同一个函数
var f = function(){
	console.log('1');
}
function f(){
	console.log('2');
}
//由于声明提升
//相当于
var f;
function f(){
	console.log('2');
}
f=function () {
	// body...
	console.log('1');
}


//递归
function fact(num){
	if(num<=1){
		return 1;
	}else{
		return num*arguments.callee(num-1);
	}
}
//以上的方法，在严格模式下不能通过脚本来访问arguments.callee
var fact = (function f(num){
	if(num<=1){
		return 1;
	}else{
		return num*f(num-1);
	}
});//括号可以省略

//函数的属性
//name
var f = function(){};
console.log(f.name);//'f'
console.log((function(){}).name);//''
//length
//定义函数时的参数个数
//toString()
//返回代码
function f(){
	var a=1;
	return a;
}
function multiline(fn){
	var arr = fn.toString().split('\n');
	return arr.slice(1,arr.length-1).join('\n');
}
multiline(f);
//"	var a=1;
//	return a;"

//函数的作用域：
//是声明时的作用域，不是调用时的作用域
var x=function(){
	console.log(a);
}
function Y(f){
	var a=2;
	x();
}
Y(x);
//Uncaught ReferenceError: a is not defined
//x的作用域绑定在全局环境中

function Y(){
	var a=2;
	var x=function(){
		console.log(a);
	};
	x();
}
Y();//2
//x在Y函数内部定义，作用域就绑定在函数的内部
//在构造函数中，创建私有变量时，同理，只有在构造函数中创建的函数，才可以访问私有变量（作用域链）

//函数传参：
//如果缺少参数，则是undefined传入
//也可以手动传入undefined
//如何设置参数的默认值？
function f(a){
	a=a||1;
	return a;
}
//但是如果a=0或''
//也会返回1
function f(a){
	(a!=undefined&&a!=null)?a=a?a=1;
	return a;
}
//1.pass by value，简单数据类型
//2.pass by reference，引用类型，基本包装类型
var o=[1,2];
function f(o){
	o=[1,2,3];
}
f(o);
o;//[1,2]
//o本来的值是[1,2]的引用，然后在函数中
//o被赋值了[1,2,3]的引用

//arguments与形参的关系
function f(a,b){
	arguments[0]=2;
	arguments[1]=3;
	return a+b;
}
f(0,0);//5
//a,b与arguments动态地相互关联着
//严格模式下，arguments是只读的
Array.prototype.slice.call(arguments);

//
//闭包！！！
//自己的理解就是函数的变量对象中包括了不是声明在自身的作用域中的变量
//能够读取其他函数内部变量的函数
//定义在一个函数内部的函数
//
function inc(num){
	return function(){
		num++;
	}
}
var i = inc(5);
i();//5
i();//6
//外层函数每次运行都会产生新的闭包
//对内存的消耗很大
//因为闭包总是包含了外层函数的内部变量


function F(name){
	return function(){
		console.log(name);
	}
}
//一般而言，函数执行完后，其变量对象会被销毁，作用域链会被销毁
//闭包的情况：
//匿名函数的作用域链任然引用外部函数的变凉对象，因此这个变量对象任然在内存中
//直到匿名函数执行完毕后，才会销毁自身的变量对象中以及外部函数的变量对象
//1.闭包会携带其他函数的作用域，因此会占用更多内存
//2.闭包会包含的外部函数变量对象的最终结果，即在外部函数执行完后的结果
function createFunction(){
	var result = new Array();
	for(var i=0;i<10;i++){
		result[i] = (function(num){
			return function(){
				console.log(num);
			}
		})(i);
	}
}
//对于内部匿名函数
//this的情况已经在this.js中说明，它始终引用属性或方法所在的对象（变量对象、作用域）
//类似的，arguments和this相似，引用当前所在函数的参数对象
//3.变量销毁的问题
//
function assignHandler(){
	var element = document.getElementById('ele');
	element.onclick = function(){
		console(element.id);
	}
}
//element引用的对象永远都无法被回收，因为匿名函数一直在啊！！
function assignHandler(){
	var element = document.getElementById('ele');
	var id = element.id;
	element.onclick = function(){
		console.log(id);
	};
	element = null;//解除了对DOM对象的引用
}

//通过函数执行后其变量对象会被销毁的特征，可以模仿块级作用域
(function(){

})();
//括号不能省略，因为function代表了函数声明的开始，而函数声明后面不能直接加括号
//可以减少过多的全局变量
//
(function(){
	var now = new Date();
	console.log(now.getMonth()+1+'.'+now.getDate());
})();
alert(now);//Uncaught ReferenceError: now is not defined
true&&function(){}();
!function(){}()
new function(){}
new function(){}(arg)
//不要让立即执行函数的函数声明出现在行首
//Immediately-Invoked Function Expression
//

//eval
//不会得到引擎的优化
//1.直接调用——eval('');
//作用域为当前所在的函数
//2.间接调用
var e = eval;
e('');
eval.call(null,'');
window.eval('');
//作用域为全局作用域

//实现私有变量
function MyObject(){
	var privateVariable = 10;
	function privateFunction(){
		return false;
	}
	this.publicMethod = function(){
		privateVariable++;
		console.log(privateVariable);
		return privateFunction();
	}
}
var o1 = new MyObject();
o1.publicMethod();//11
var o2 = new MyObject();
o2.publicMethod();//11
//privateVaraible是每个对象的私有变量
//不是属性！！属性都是共有的，在全局环境也可以随意访问读写的
//和C++不一样
//公共属性：属性
//私有属性：私有变量

function Person(){
	this.getName = function(){
		return name；
	}
	this.setName = function(n){
		name = n;
	}
}
//两个函数是可以访问私有变量的特权方法
//作为闭包通过作用域链可以访问到name

(function(){
	var name='';
	Person = function(v){
		name = v;
	};
	Person.prototype.getName = function(){
		return name;
	};
	Person.prototype.setName = function(n){
		name = n;
	}
})();
var p1 = new Person('Alice');
var p2 = new Person('Bob');
console.log(p1.getName());//Bob
console.log(p2.getName());//Bob
//两个对象的Name变量都改变的原因是
//调用的方法是原型上的，构造函数中的name来源只有一个，就是匿名函数的name。
//setName方法是原型上的，因此name是同一个name，调用它也会反映在每一个对象上

//而在MyObject函数中，构造函数被调用了两次，在两个作用域的变量对象内，都有privateVariable,
//所以在不同对象中，这个私有变量是独立的
//

var p1 = function(){
	var hobby = new Array();
	hobby.push(new H());
	return {
		getHobby:function(){
			return hobby.length;
		},
		addHobby:function(HH){
			if(HH instanceof H){
				hobby.push(HH);
			}
		}
	}
}();
//这样既可以保证添加新的内容，也可以读取私有变量的情况
//