//标题：阅读阮一峰《JS标准参考教程》的Prototype相关内容有感

//1.prototype对象的所哟属性和方法，都可以被子对象共享
//定义了所有实例对象可以共享的属性和方法
//2.原型链
//对象的属性和方法，可能定义在对象本身，也可能定义在对象的原型
//而原型对象也可能有自己的原型，就形成了原型链
//所有对象的原型都可以上溯到Object.prototype
//

Object.getPrototypeOf(Object.prototype);
//null
//原型链在寻找对象的属性和方法时，JavaScript引擎顺着它去寻找
//找不到则返回undefined
//

var MyArray = function(){};
MyArray.prototype = new Array();
MyArray.prototype.constructor = MyArray;
var mine = new Myarray();
mine.push(1,2,3);
//因为mine的原型是数组的一个实例，因此mine可以调用原型对象的push方法
//constructor属性是原型对象的属性，因此所有的实例都可以访问到这个属性
//
function F(){}
var f = new F();
var e = new f.constructor();
//修改原型对象时，要同时注意constructor属性
//确定其指向一个正确的的构造函数,防止引用是出错
//constructor关联了实例对象和构造函数
//但是是通过原型对象继承而来的
function Obj(){
	this.a=1;
}
var o1 = new Obj();
console.log(o1.constructor.name);//Obj

Obj.prototype = {a:1};
var o = new Obj();
console.log(o.constructor.name);//Object
Obj.prototype.constructor = Obj;
console.log(o.constructor.name);//Obj
o.constructor = Array;
console.log(o.constructor.name);//Array
var o2 = new Obj();
console.log(o2.constructor.name);//Obj
//修改了对象o的构造函数后，原型对象的构造函数依然是Obj

//3.instanceof 运算符
//obj instanceof someConstructor
//检查构造函数的原型对象是否在obj实例对象的原型链上
//等效于
someConstructor.prototype.isPrototypeOf(obj)
//过程就是检查原型链
Object.create(null) instanceof Object//false
//以上结果的原因就是该对象的原型是null
//Object.prototype不在其原型链上
//instanceof不适用基本类型的值，基本包装类型（String、Number、Boolean）也不行
function Con(){
	if(!this instanceof Con){
		return new Con();
	}else{
		this.a=1;
	}
}
//new的作用原理：
//首先创建空对象{}
//再讲此对象的原型属性指向构造函数的原型对象
//再将其赋给this
//再开始执行构造函数代码
//因此如果没有用new操作符，this的原型就不是Con的原型对象

//4.获得对象的原型和设置原型
console.log(Object.getPrototypeOf({})===Object.prototype);//true
var a = {};
var p = {
	b:1;
}
Object.setPrototypeOf(a,p);
//等同于
a = {
	_proto_:p;
}
//又是new:
var c = new Array();
//var c = Object.setPrototypeOf({},Array.prototype);
//先创建空白对象设置其原型
//Array.call(c);
//再执行构造函数代码

//5.选择原型来创建对象
var d1 = Object.create(Array.prototype);
console.log(d.constructor.name);//Array
var d2 = new Array();
console.log(d.constructor.name);//Array
//如果不继承任何属性
var n = Object.create(null);

function Person(){
	this.age = 20;
}
console.log(Person.prototype);
//{constructor:Person;}这就是原型对象
var p1 = Object.create(Person.prototype);
console.log(p1.age);//undefined
//说明了什么，说明实例与构造函数并没有什么关系
//create方法只设置对象的原型而已
//p1只是一个空对象，prototype of which is Person.prototype.

//所以，5.刚开始的d1、d2本质是不一样的
//不过都可以用push、pop、shift等方法，因为这是原型上定义的方法

var p2 = Object.create(Person.prototype,{
	age:{
		Enumerable:false,
		writable:false,
		configurable:true,
		value:20,
	}
})
//第二个参数是一个属性（数据属性或访问器属性）描述对象


//6.isPrototypeOf()
var array = new Array();
Array.prototype.isPrototypeOf(array);
array instanceof Array;
//以上二者等效
//

//7.实例对象的_proto_属性
//仅在浏览器中有
var pro1 = Object.getPrototypeOf(array);
var pro2 = array._proto_;//[prototype]为内部属性
var pro3 = array.constructor.prototype;
//第一种最好
//第二种由于浏览器才支持
//第三种方法必须在保证constructor的情况下才能保证正确