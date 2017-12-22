function SuperType(){
	this.property = true;
}
SuperType.prototype.getSuperValue = function(){
	return this.property;
};
function SubType(){
	this.subproperty = false;
}
SubType.prototype = new SuperType();
SUbType.prototype.getSubValue = function(){
	return this.subproperty;
};
var instance = new SubType();
alert(instance.getSuperValue());

alert(instance instanceof Object);
alert(instance instanceof SubType);
alert(instance instanceof SuperType);

alert(Object.prototype.isPrototypeOf(instance));
alert(SubType.prototype.isPrototypeOf(instance));


function SuperType(){
	this.property = true;
}
SuperType.prototype.getSuperValue = function(){
	return this.property;
};
function SubType(){
	this.subproperty = false;
}
SubType.prototype = new SuperType();
Subtype.prototype.getSubValue = function(){
	return this.subproperty;
};
SubType.prototype.getSuperValue = function(){
	return false;
};
//rewrite this method, and the one from SubType.prototype.prototype
//will be blocked.

var instance = new SubType();
alert(instance.getSuperValue());


function SuperType(){
	this.property = true;
}
SuperType.prototype.getSupervalue = function(){
	return this.property;
};
fucntion SubType(){
	this.subproperty = false;
}
SubType.prototype = new SuperType();
Subtype.prototype = {
	getSubValue:function(){
		return this.subproperty;
	},
	someOtherMethod:function(){
		return false;
	}
};

var instance = new SubType();
alert(instance.getSupervalue());



function SuperType(){
	this.color = ['red','pink'];
}
function Subtype(){}
Subtype.prototype = new SuperType();
var i1 = new SubType();
i1.colors.push('black');
alert(i1.colors);
var i2 = new SubType();
alert(i2.colors);


function SuperType(){
	this.colors = ['red','pink'];
}
function SubType(){
	SuperType.call(this);
}
var i1 = new SubType();
i1.colors.push('green');
alert(i1.colors);

var i2 = new SubType();
i2.colors.push('gray');
alert(i2.colors);

function SuperType(name){
	this.name = name;
}
function SubType(){
	SuperType.call(this,'nicholas');
	this.age = 29;
}
var instance = new SubType();
alert(instance.name);
alert(instance.age);


function SuperType(name){
	this.name = name;
	this.colors = ['red','pink','green'];
}
SuperType.prototype.sayName = function(){
	alert(this.name);
}

function SubType(name,age){
	SuperType.call(this,name);
	this.age = age;
}
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function(){
	alert(this.age);
};
var i1 = new SubType('chloe',20);
i1.colors.push('blue');
alert(i1.colors);
i1.sayName();
i1.sayAge();

var i2 = new SubType('Greg',27);
alert(i2.colors);
i2.sayAge();

alert(i2 instanceof SubType);
alert(i2 instanceof SuperType);
alert(i2 instanceof Object);

alert(SubType.prototype.isPrototypeOf(i2));


function object(o){
	function F(){}
	F.prototype = o;//shallow copy
	return new F();
}

var person = {
	name:'nicholas',
	friends:['shelby','Court','Van']
};
var anotherPerson = object(person);
anotherPerson.name = 'greg';
anotherPerson.friends.push('Rob');
var yetAnotherPerson = object(person);
yetAnotherPerson.name = 'Linda';
yetAnotherPerson.friends.push('Barbie');
alert(person.friends);

var person = {
	name:'nicholas',
	friends:['a','b','c']
};
var anotherPerson = Object.create(person);
anotherPerson.name = 'greg';
anotherPerson.friends.push('d');

var yetAnotherPerson = Object.create(person);
yetAnotherPerson.name = 'Linda';
yetAnotherPerson.friends.push('e');
alert(person.friends);

var person = {
	name:'nicholas',
	friends:['a','b','c']
};
var anotherPerson = Object.create(person,{
	name:{
		value:'greg'
	}
});
alert(anotherPerson.name);

function createAnother(origin){
	var clone = object(origin);
	clone.sayHi()=function(){
		alert('Hi');
	};
	return clone;
}

var person = {
	name:'nicholas',
	friends:['a','b','c']
};
var anotherPerson = createAnother(person);
anotherPerson.sayHi();

function SuperType(name){
	this.name = name;
	this.colors = ['a','b','c'];
}
SuperType.prototype.sayName = function(){
	alert(this.name);
};
function SubType(name,age){
	SuperType.call(this,name);
	this.age = age;
}
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function(){
	alert(this.age);
}

function inheritPrototype(sub,super){
	var prototype = object(super.prototype);
	prototype.constructor = sub;
	sub.prototype = prototype;
}

function SuperType(name){
	this.name = name;
	this.colors = ['a','b','c'];
}
SuperType.prototype.sayName = function(){
	alert(this.name);
};
function SubType(name,age){
	SuperType.call(this,name);
	this.age = age;
}
inheritPrototype(SubType,SuperType);

SubType.prototype.sayAge = function(){
	alert(this.age);
};




//Mixing
function M1(){

}
function M2(){

}
function Sub(){
	M1.call(this);
	M2.call(this);
}

Sub.prototype = Object.create(M1.prototype);
Object.assign(Sub.prototype,M2.prototype);//拷贝自身的可枚举属性到目标对象
Sub.prototype.constructor = Sub;
