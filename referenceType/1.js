if(!Object.create){
	Object.create = function(obj){
		function F(){}
		F.prototype = obj;
		return new F();
	};
}

function _new(constructor,param1){
	var args = [].slice.call(arguments);
	alert(args);
	var constructor = args.shift(); //shift()函数会改变数组的内容
	//创建一个新的空白对象，并且把对象的原型指向构造函数的原型属性
	var context = Object.create(constructor.prototype);
	//再讲空白对象赋值给this，然后执行构造函数中的代码
	alert(args);
	var result = constructor.apply(context,args);
	return (typeof result==='Object'&&result!=null)?result:context;
}

var array = [];
alert(array.slice(','));
alert(array.slice.call([1,2,3]));
//alert(Array.slice.call([1,2,3,4])); Wrong!!
alert(Array.prototype.slice.call([1,2,3,4]));

var p = _new(Person,'lyx',20);
function Person(name,age){
	this.name = name;
	this.age = age;
}

//如果使用了new命令，则一定会返回一个对象
function Person(name,age){
	if(!(this instanceof Person)){
		return new Person(name,age);
	}
	this.name = name;
	this.age = age;
}

function f(){
	console.log(new.target===f);
}
f();
new f();

function inheritedPropertyNames(obj){
	var props = {};
	while(obj){
		Object.getOwnPropertyNames(obj).forEach(function(p,index,array){
			props[p]=true;
		})
		obj = Object.getPrototypeOf(obj);
		//obj = obj.constructor.prototype;
	}
	return Object.getOwnPropertyNames(props);
}
inheritedPropertyNames(Date);

function copyObj(src){
	//首先要有相同的原型
	var result = Object.create(Object.getPrototypeOf(src));
	copyProperties(result,src);
	return result;
}

function copyProperties(dst,src){
	//有哪些实例属性
	var props = Object.getOwnPropertyNames(src);
	props.forEach(function(item,index,array){
		//获得描述符对象
		var des = Object.getOwnPropertyDescriptor(src,item);
		Object.defineProperty(dst,item,des);
	});
}
function Person(name,age){
	if(!(this instanceof Person)){
		return new Person(name,age);
	}
	this.name = name;
	this.age = age;
}
//Object.getOwnPropertyNames(Person);
//复制了一个Person实例对象
var copyDate = copyObj(new Person());//["name", "age"]
//inheritedPropertyNames(copyDate);
Object.getOwnPropertyNames(copyDate);
//以下只是复制了一个Function的实例对象
var copyDate = copyObj(Person);//["length", "name", "arguments", "caller", "prototype"]