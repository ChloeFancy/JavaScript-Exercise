var person = new Object();
person.name = 'Nicholas';
person.age = 29;
person.job = 'Software Engineer';

person.sayName = function(){
	alert(this.name);
}

var person = {
	name:'Nicholas',
	age:29,
	job:'Software Engineer',
	sayName:function(){
		alert(this.name);
	}
}

var person = {};
Object.defineProperty(person,'name',{
	writable:false,
	value:'Chloe'
});
alert(person.name);
person.name = 'greg';

var person={};
Object.defineProperty(person,'age',{
	configurable:false,//after this,there will be restrictions.
	value:'Chloe'
})

var book = {
	_year:2004,
	edition:1
}
Object.defineProperty(book,'year',{
	get:function(){
		return this._year;
	},
	set:function(newValue){
		if(newValue>2004){
			this._year = newValue;
			this.edition += newValue-2004;
		}
	}
});

book.year = 2005;
alert(book.edition);

var book = {

};
Object.defineProperties(
	book,
	{
		_year:{
			Enumerable:true,
			value:2004
		},
		edition:{
			value:1
		},
		year:{
			get:function(){return this._year;},
			set:function(newValue){
				this._year=newValue;
				this.edition=newValue-2004;
			}
		}
	}
);

var des = Object.getOwnPropertyDescriptor(book,'_year');
alert(des.value);
alert(des.configurable);
alert(typeof des.get);

//can be only aplied to real example's property
var des1 = Object.getOwnPropertyDescriptor(book,'year');
alert(des1.value);
alert(des.configurable);
alert(typeof des.get);


//Factory Mode
function createPerson(name,age,job){
	var o = new Object();
	o.name = name;
	o.age = age;
	o.job = job;
	o.sayname() = function(){
		alert(this.name);
	}
	return o;
}
var p1 = createPerson('Nicholas',29,'Engineer');
var p2 = createPerson('Chloe',20,'Student');

//Constructor Mode
function Person(name,age,job){
	this.name = name;
	this.age = age;
	this.job = job;
	this.sayName = function(){
		alert(this.name);
	}
	//this.SayName = new Function('alert(this.name);');
}

var p3 = new Person('xiaoming',20,'model');
var p4 = new Person('Lily',30,'model');

alert(p1.constructor==Object);
alert(p3.constructor==Person);

alert(p1 instanceof Object);
alert(p3 instanceof Person);

Person('Window');
sayName();
Window.sayname();

var o = new Object();
Person.call(o,'Anna Faris',35,'Actress');
o.sayName();


function Student(name,major){
	this.name = name;
	this.major = major;
	this.sayInfo = sayInfo;
}
function sayInfo(){
	alert(this.name+' '+this.major);
}

//Prototype Mode
function Person(){}
Person.prototype.name = 'Chloe';
Person.prototype.age = 20;
Person.prototype.job = 'student';
Person.prototype.sayName = function(){
	alert(this.name);
};

var p5 = new Person();
p5.sayName();

var p6 = new Person();
p6.sayName();

alert(p5.sayName==p6.sayName);

alert(Person.prototype.isPrototypeOf(p5));
alert(Object.getPrototypeOf(p5)==Person.prototype);
alert(Object.getPrototypeOf(p6).name);

p6.name = 'Nicole';
alert(p6.name);
alert(p5.name);
delete p6.name;
alert(p6.name);

alert(p6.hasOwnProperty('name'));
p6.name = 'Nicole';
alert(p6.hasOwnProperty('name'));

function hasPrototypeProperty(obj,prop){
	return !obj.hasOwnProperty(prop)&&prop in obj;
}
alert(hasPrototypeProperty(p6,name));


//Own enumerable Property
alert(Object.keys(Person.prototype));
alert(Object.keys(p6));
//Own enumerable and unenumerable Properties
alert(Object.getOwnPropertyNames(p6));
alert(Object.getOwnPropertyNames(Person.prototype));

function Person(){}

//rewrite the prototype
Person.prototype = {
	name:'Chloe',
	age:20,
	job:'Student',
	sayName:function(){
		alert(this.name);
	}
}

var friend = new Person();
alert(friend instanceof Object);
alert(friend instanceof Person);
alert(friend.constructor==Person);
alert(friend.constructor==Object);

Person.prototype = {
	constructor:Person,//[Enumerable]==true
	name:'Chloe',
	age:20,
	job:'Student',
	sayName:function(){
		alert(this.name);
	}
}

alert(friend.constructor==Person);


Person.prototype = {
	name:'Chloe',
	age:20,
	job:'Student',
	sayName:function(){
		alert(this.name);
	}
}
Object.defineProperty(Person,'constructor',{
	value:Person
});
alert(Object.keys(Person.prototype));

var mom = new Person();
Person.prototype.sayHi = function(){
	alert('hi');
}
mom.sayHi();

function Person(){}
var friend = new Person();
Person.prototype = {
	constructor:Person,
	name:'Nchole',
	age:29,
	job:'Software Engineer',
	sayName:function(){
		alert(this.name);
	}
}
friend.sayName();

alert(Array.prototype.sort);
alert(typeof Array.prototype.sort);


String.prototype.startsWith=function(text){
	return this.indexOf(text)==0;
};

var msg=new String("hello world");
alert(msg.starstWith("hello"));

function Person(){}

Person.prototype = {
	constructor:Person,
	name:'Nicholas',
	age:29,
	job:'Software Engineer',
	friends:['shelly','pesha'],
	sayName:function(){
		alert(name);
	}
};

var p1 = new Person();
var p2 = new Person();

p1.friends.push('a','b');


alert(p1.friends);
alert(p2.friends);
alert(p1.friends==p2.friends);
alert(p1.friends===p2.friends);//true


//prototype and constructor combination
function Person(name,job,age){
	this.name=name;
	this.job=job;
	this.age=age;
	this.friends = ['a','b'];
};
Person.prototype={
	constructor:Person,
	sayName:function(){
		alert(this.name);
	}
};
var p1 = new Person('Nicole','Software Engineer',29);
var p2 = new Person('Chloe','Student',20);

p1.friends.push('c');
alert(p1.friends);
alert(p2.friends);


//Dynamic
function Person(name,age,job){
	this.name = name;
	this.job = job;
	this.age = age;
	if(typeof this.sayName != 'function'){
		this.sayName = function(){
			alert(this.name);
		};
	}
}

var friend = new Person('Nicholas',29,'Software Engineer');
friend.sayName();

alert(friend nstanceof Person);

//Parasitic

function Person(name,age,job){
	var o = new Object();
	o.name = name;
	o.age = age;
	o.job = job;
	o.sayName = function(){
		alert(this.name);
	};
	return o;
}

var friend = new Person('Chloe',20,'Student');
friend.sayName();
alert(friend instanceof Person);//false
alert(friend instanceof Object);//true

function specialArray(){
	var v = new Array();
	v.push.apply(v,arguments);
	v.toPipedSring = function(){
		return this.join('||');
	};
	return v;
}
var colors = new specialArray('red','pink','green');
alert(colors.toPipedSring());

//durable
function Person(name,age,job){
	var o = new Object();
	var ID = '50125';
	o.sayName = function(){
		alert(name);
	};
	o.info = function(){
		alert(ID);
	};
	return o;
}
var friend = new Person('Nicholas',29,'Software Engineer');
friend.sayName();
friend.info();
alert(friend.ID);
