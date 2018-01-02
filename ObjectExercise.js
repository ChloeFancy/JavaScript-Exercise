/* 1.
 * 把 p 中的可枚举属性复制到 o 中，并返回 o
 * 如果 o 和 p 中含有同名属性，则覆盖 o 中的属性
 */
function OBJ(){
	this.a=1;
	this.b=2;
}
OBJ.prototype =  {
	'c':3,
	'd':4
};
var p = new OBJ();
Object.defineProperty(p,'e',{value:100,enumerable:false});
var o={
	'a':10,
	'b':20
};
console.log(p);
console.log(o);
extend(o,p);
console.log(o);

function extend(o, p) {
    // 请实现函数体
    var names = Object.getOwnPropertyNames(p);
    for(var i=0;i<names.length;i++){
    	var name = names[i];
    	//啊啊啊啊啊属性的特性集合在descriptor描述符对象中！！
    	//实例对象->属性->描述符对象->四个特性
    	var d = Object.getOwnPropertyDescriptor(p,name);
    	if(d.enumerable==true){
    		//console.log(d);
    		Object.defineProperty(o,name,d);
    	}
    }
    return o;
}

function extend(o, p) {
    // 请实现函数体
    for(var propName in p){
    	if(p.hasOwnProperty(propName)){
    		Object.defineProperty(o,propName,Object.getOwnPropertyDescriptor(p,propName));
    	}
    }
    return o;
}
//p.c
//3
//o.c
//undefined

function extend(o, p) {
    // 请实现函数体
    var names = Object.getOwnPropertyNames(p);
    var keys = Object.keys(p);
    console.log(keys);
    for(var i=0;i<keys.length;i++){
    	var pro = keys[i];
    	if(p.hasOwnProperty(pro)){
    		var des = Object.getOwnPropertyDescriptor(p,pro);
    		Object.defineProperty(o,pro,des);
    	}
    }
    return o;
}
//运行结果：o只有p自身的属性，没有继承的属性
//p.c
//3
//o.c
//undefined

function extend(o, p) {
    // 请实现函数体
    var des={};
    for(var name in p){
    	if(p.hasOwnProperty(name)){
    		des[name] = Object.getOwnPropertyDescriptor(p,name);
    	}
    }
    Object.defineProperties(o,des);
    return o;
}

/* 总结：
 * in——枚举所有的属性（自身的和原型链上的
 *
 * Object.keys(obj)——返回obj自身的所有的可枚举属性的名称数组
 */

/* 2.
 * 将 p 中的可枚举属性复制至 o 中，并返回 o
 * 如果 o 和 p 中有同名的属性，o 中的属性将不受影响
 */
function OBJ(){
	this.a=1;
	this.b=2;
	this.unique=-1;
}
OBJ.prototype =  {
	'c':3,
	'd':4
};
var p = new OBJ();
Object.defineProperty(p,'e',{value:100,enumerable:false});
var o={
	'a':10,
	'b':20
};
console.log(p);
console.log(o);
merge(o,p);
console.log(o);

function merge(o, p) {
    // 请实现函数体
    for(var name in p){
    	if(!o.hasOwnProperty(name) && p.hasOwnProperty(name)){
    		Object.defineProperty(o,name,Object.getOwnPropertyDescriptor(p,name));
    	}
    }
    return o;
}

function merge(o,p) {
	var keys = Object.keys(p);
	for(var i in keys){
		var name = keys[i];
		if(!o.hasOwnProperty(name)){
			Object.defineProperty(o,name,Object.getOwnPropertyDescriptor(p,name));
		}
	}
	return o;
}

function merge(o,p) {
	var keys = Object.keys(p);
	var des = {};
	for(var i in keys){
		var name = keys[i];
		if(!o.hasOwnProperty(name)){
			//1. 不行
			//Object.defineProperty(des,name,Object.getOwnPropertyDescriptor(p,name));
			//defineProperty是用描述符对象中的特性去定义一个属性，不是用描述符对象赋值给此对象
			//des:{unique:-1}
			//2. 不行，不知道为什么
			//var v = Object.getOwnPropertyDescriptor(p,name);
			//Object.defineProperty(des,name,{value:v});
			//3. 可行
			des[name] = Object.getOwnPropertyDescriptor(p,name);
			//des:{unique: {…}}
			//unique:{value: -1, writable: true, enumerable: true, configurable: true}
			//__proto__:Object
		}
	}
	Object.defineProperties(o,des);
	return o;
}


/* 3.
 * 如果 o 中的属性在 p 中没有同名属性，则从 o 中删除这个属性
 * 返回 o
 */
function OBJ(){
	this.a=1;
	this.b=2;
	this.unique=-1;
}
OBJ.prototype =  {
	'c':3,
	'd':4
};
var p = new OBJ();
Object.defineProperty(p,'e',{value:100,enumerable:false});
var o={
	'a':10,
	'b':20,
	'f':30
};
console.log(p);
console.log(o);
restrict(o,p);
console.log(o);
function restrict(o, p) {
	var names = Object.getOwnPropertyNames(o);
	for(var i in names){
		var name = names[i];
		if(!p.hasOwnProperty(name)){
		//if(!(name in p)){
			//delete o.name;
			delete o[name];
			//只有方括号访问法才以变量作为属性名
		}
	}
	return o;
}
/* 4.
 * 如果 o 中的属性在 p 中存在同名属性，则从 o 中删除这个属性
 * 返回 o
 */
function subtract(o, p) {
    var names = Object.getOwnPropertyNames(o);
	for(var i in names){
		var name = names[i];
		if(p.hasOwnProperty(name)){
			//delete o.name;
			delete o[name];
			//只有方括号访问法才以变量作为属性名
		}
	}
	return o;
}

function subtract(o, p) {
    for(prop in p){
    	delete o[prop];
    }
	return o;
}
/* 5.
 * 返回一个新对象，这个对象同时拥有 o 的属性和 p 的属性
 * 如果 o 和 p 中有重名属性，使用 p 中的属性值
 */
function OBJ(){
	this.a=1;
	this.b=2;
	this.unique=-1;
}
OBJ.prototype =  {
	'c':3,
	'd':4
};
var p = new OBJ();
Object.defineProperty(p,'e',{value:100,enumerable:false});
var o={
	'a':10,
	'b':20,
	'f':30
};
console.log(p);
console.log(o);
union(o,p);

function union(o, p) {
    var result={};
    var names = Object.getOwnPropertyNames(p);
    console.log(names.join(" "));
    for(var i in names){
    	var name = names[i];
    	var des = Object.getOwnPropertyDescriptor(p,name);
    	Object.defineProperty(result,name,des);
    }
    var names = Object.getOwnPropertyNames(o);
    for(var i in names){
    	var name = names[i];
    	if(!p.hasOwnProperty(name)){
        	var des = Object.getOwnPropertyDescriptor(o,name);
    		Object.defineProperty(result,name,des);
    	}
    }
    return result;
}

function union(o, p) {
    return restrict(extend({},o),p);
}

/* 6.
 * 返回一个新对象，这个对象拥有同时在 o 和 p 中出现的属性
 * 很像求 o 和 p 的交集，但 p 中属性的值被忽略
 */
function OBJ(){
	this.a=1;
	this.b=2;
	this.unique=-1;
}
OBJ.prototype =  {
	'c':3,
	'd':4
};
var p = new OBJ();
Object.defineProperty(p,'e',{value:100,enumerable:false});
var o={
	'a':10,
	'b':20,
	'f':30
};
console.log(p);
console.log(o);
intersection(o,p);
function intersection(o, p) {
	var result = {};
    var names = Object.getOwnPropertyNames(o);
    for(var i in names){
    	if(p.hasOwnProperty(names[i])){
    		Object.defineProperty(result,names[i],
    			Object.getOwnPropertyDescriptor(o,names[i]));
    	}
    }
    return result;
}
function intersection(o, p) {
	return restrict(extende({},o),p);
}
/* 7.
 * 返回一个数组，这个数组包含的是 o 中可枚举的自有属性的名字
 */
function OBJ(){
	this.a=1;
	this.b=2;
	this.unique=-1;
}
OBJ.prototype =  {
	'c':3,
	'd':4
};
var p = new OBJ();
Object.defineProperty(p,'e',{value:100,enumerable:false});
keys(p);
function keys(o) {
    if(typeof o !='Object') throw TypeError();
    var arr = [];
    for(var propName in o){
    	if(o.hasOwnProperty(propName)){
    		arr.push(propName);
    	}
    }
    return arr;
}

/*
 * 总结：
 * Object.keys(obj)与原型链无关,可枚举
 * Object.getOwnPropertyNames(obj)与原型链无关
 * var key in obj 原型链有关，可枚举
 */