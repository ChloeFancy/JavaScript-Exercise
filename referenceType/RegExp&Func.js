
alert(sum(2,3));//函数声明提升
function sum(n1,n2){
	return n1+n2;
}
var sumfunc = sum;
sum = NULL;
sunfunc(2,2);

var sumF = function(n1,n2){
	return n1+n2;
}
var sumFun = new Function('n1','n2','return n1+n2;');
var sumF = function(n1,n2){
	return n1+n2+1;
}
console.log(sumf(1,2));

function callFunction(){
	var args = new Array();
	for(var i=1;i<arguments.length;i++){
		args.push(arguments[i]);
	}
	return arguments[0](args);
}
function say(){
	var str = '';
/*	arguments[0].reduce(function(pre,cur,index,array){index的值是从1开始的，所以不可行
		alert(index);
		str+=array[index];
	});*/
	arguments[0].forEach(function(item,index,array){
		str+=array[index];
	});
	alert(str);
}
callFunction(say,'Chloe ','Hi ','I miss you.');

function createFunction(prop){
	return function(obj1,obj2){
		if(typeof obj1[prop] != 'undefined' && typeof obj2[prop]!='undefined'){
			var v1 = obj1[prop];//中括号大法好
			var v2 = obj2[prop];//可以使用不符合标准的属性名
			if(v1<v2){
				return -1;
			}else if(v1>v2){
				return 1;
			}else{
				return 0;
			}
		}
		else{
			alert('property does not exist!');
			return 0;
		}
	};
}

var o1 = {
	age:20,
	name:'Chloe'
}
var o2 = {
	age:10,
	name:'Penny'
}
var objArray = [o1,o2];
objArray.sort(createFunction('age'));//属性名是字符串
alert(objArray[0].name);
objArray.sort(createFunction('name'));
alert(objArray[0].name);
objArray.sort(createFunction('gender'));

function fact(n){
	if(n==1||n==0){
		return 1;
	}else if(n>2){
		return n * arguments.callee(n-1);
	}
}

window.color = 'pink';
var o = {
	color:'light blue'
};
function sayColor(){
	console.log(this.color);
}
sayColor();
o.sayColor = sayColor;
o.sayColor();

function test(){
	return function(){alert(arguments.callee.caller);}
}

test()();

function outside(){
	test()();
}
outside();

function say(n1,n2,n3){
	return 0;
}
console.log(say.length);
console.log(say.prototype);

sayColor.apply(o);
sayColor.apply(this);
sayColor.call(o);
sayColor.call(window);

var sayColor2 = sayColor.bind(o);//绑定函数中的this
sayColor2();
var sayColor3 = sayColor.bind(window);
sayColor3();

function saySomething(n1,n2){
	console.log(n1+n2);
}

saySomething.call(this,1,2);

function call1(n1,n2){
	saySomething.apply(this,[n1,n2]);
}

function call2(n1,n2){
	saySomething.apply(this,arguments);
}
call1(10,20);
call2(20,30);

function saySome(){
	var str='';
	for(var i=0;i<arguments.length;i++){
		str+=arguments[i];
	}
	console.log(str);
}
function call3(){
	saySome.apply(this,arguments);
}
call3('a','b','c','d');
call3('1','2','3');


/*RegExp*/
var pattern1 = /at/g;
var pattern2 = /[bc]at/i;
var pattern3 = /.at/gi;
var pattern4 = /\[bc\]at/g;
var pattern5 = /\.at/g;
var pattern5 = new RegExp("\\[bc\\]at",'i');

var re=null;
for(var i=0;i<5;i++){
	re = /at/g;//每次都创建新的实例
	alert(re.test('catastrophe'));
}
for(var i=0;i<3;i++){
	re = new RegExp('at','g');
	alert(re.test('catastrophe'));
}


/*
内置属性不可枚举

for(var i in pattern5){
	props.push(i);
}
alert(props.length);
console.log(props.join(' , '));
*/
var props = ['global','ignoreCase','lastIndex','multipline','source'];
function showRegProps(reg){
	var str='';
	for(var i=0;i<props.length;i++){
		str+=' '+props[i]+' : ';
		str+=reg[props[i]];
	}
	alert(str);
}
showRegProps(pattern5);

var urlPattern = /([a-zA-Z]+):\/\/([^ :/]+)(:\d*)?(.*)/;
var yrl = 'http://www.runoob.com:80/html/html-tutorial.html';
var a = urlPattern.exec(yrl);
function showURL(){
	for(var i=0;i<this.length;i++){
		console.log(this[i]);
	}
}
showURL.apply(a);

var b = yrl.match(urlPattern);
showURL.apply(b);

alert(urlPattern.test('123'));
alert(urlPattern.test(yrl));

alert(RegExp.input);
alert(RegExp.lastMatch);
alert(RegExp.lastParen);
alert(RegExp.leftContext);
alert(RegExp.rightContext);

INSERT INTO C(KH,KM,XF,XS,YXH)
VALUES('08305002','数据库原理',4,50,'01');
INSERT INTO C(KH,KM,XF,XS,YXH)
VALUES('08305003','数据结构',4,50,'01');
INSERT INTO C(KH,KM,XF,XS,YXH)
VALUES('08305004','系统结构',6,60,'01');
INSERT INTO C(KH,KM,XF,XS,YXH)
VALUES('08301001','分子物理学',4,40,'03');
INSERT INTO C(KH,KM,XF,XS,YXH)
VALUES('08302001','通信学',3,30,'02');

INSERT INTO D(YXH,MC,DZ,LXDH)
VALUES('01','计算机学院','上大东校区三号楼','65347567');
INSERT INTO D(YXH,MC,DZ,LXDH)
VALUES('02','通讯学院','上大东校区二号楼','65341234');
INSERT INTO D(YXH,MC,DZ,LXDH)
VALUES('03','材料学院','上大东校区四号楼','65347890');

INSERT INTO e(xh,xq,kh,gh,pscj,kscj,zpcj)
VALUES('1101','2012-2013秋季','08305001','0103',60,60,60);
INSERT INTO e(xh,xq,kh,gh,pscj,kscj,zpcj)
VALUES('1102','2012-2013秋季','08305001','0103',87,87,87);
INSERT INTO e(xh,xq,kh,gh,pscj,kscj,zpcj)
VALUES('1102','2012-2013冬季','08305002','0101',82,82,82);
INSERT INTO e(xh,xq,kh,gh,pscj,kscj,zpcj)
VALUES('1102','2013-2014秋季','08305004','0101',null,null,null);
INSERT INTO e(xh,xq,kh,gh,pscj,kscj,zpcj)
VALUES('1103','2012-2013秋季','08305001','0103',56,56,56);
INSERT INTO e(xh,xq,kh,gh,pscj,kscj,zpcj)
VALUES('1103','2012-2013冬季','08305002','0102',75,75,75);
INSERT INTO e(xh,xq,kh,gh,pscj,kscj,zpcj)
VALUES('1103','2012-2013冬季','08305003','0102',84,84,84);
INSERT INTO e(xh,xq,kh,gh,pscj,kscj,zpcj)
VALUES('1103','2013-2014秋季','08305001','0102',null,null,null);
INSERT INTO e(xh,xq,kh,gh,pscj,kscj,zpcj)
VALUES('1103','2013-2014秋季','08305004','0101',null,null,null);
INSERT INTO e(xh,xq,kh,gh,pscj,kscj,zpcj)
VALUES('1104','2012-2013秋季','08305001','0103',74,74,74);
INSERT INTO e(xh,xq,kh,gh,pscj,kscj,zpcj)
VALUES('1104','2013-2014冬季','08302001','0201',null,null,null);
INSERT INTO e(xh,xq,kh,gh,pscj,kscj,zpcj)
VALUES('1106','2012-2013秋季','08305001','0103',85,85,85);
INSERT INTO e(xh,xq,kh,gh,pscj,kscj,zpcj)
VALUES('1106','2012-2013冬季','08305002','0103',66,66,66);
INSERT INTO e(xh,xq,kh,gh,pscj,kscj,zpcj)
VALUES('1107','2012-2013秋季','08305001','0103',90,90,90);
INSERT INTO e(xh,xq,kh,gh,pscj,kscj,zpcj)
VALUES('1107','2012-2013冬季','08305003','0102',79,79,79);
INSERT INTO e(xh,xq,kh,gh,pscj,kscj,zpcj)
VALUES('1107','2013-2014秋季','08305004','0101',null,null,null);

INSERT INTO S(xh,xm,xb,csrq,jg,sjhm,yxh)
VALUES('1101','李明','男','1993-03-06','上海','13613005486','02');
INSERT INTO S(xh,xm,xb,csrq,jg,sjhm,yxh)
VALUES('1102','刘晓明','男','1992-12-08','安徽','18913457890','01');
INSERT INTO S(xh,xm,xb,csrq,jg,sjhm,yxh)
VALUES('1103','张颖','女','1993-01-05','江苏','18826490423','01');
INSERT INTO S(xh,xm,xb,csrq,jg,sjhm,yxh)
VALUES('1104','刘晶晶','女','1994-11-06','上海','13331934111','01');
INSERT INTO S(xh,xm,xb,csrq,jg,sjhm,yxh)
VALUES('1105','刘成刚','男','1991-06-07','上海','18015872567','01');
INSERT INTO S(xh,xm,xb,csrq,jg,sjhm,yxh)
VALUES('1106','李二丽','女','1993-05-04','江苏','18107620945','01');
INSERT INTO S(xh,xm,xb,csrq,jg,sjhm,yxh)
VALUES('1107','张晓峰','男','1992-08-16','浙江','13912341078','01');


INSERT INTO T(gh,xm,xb,csrq,xl,jbgz,yxh)
VALUES('0101','陈迪茂','男','1973-03-06','副教授',3567.00,01);
INSERT INTO T(gh,xm,xb,csrq,xl,jbgz,yxh)
VALUES('0102','马小红','女','1972-12-08','讲师',2845.00,01);
INSERT INTO T(gh,xm,xb,csrq,xl,jbgz,yxh)
VALUES('0201','张心颖','女','1960-01-05','教授',4200.00,02);
INSERT INTO T(gh,xm,xb,csrq,xl,jbgz,yxh)
VALUES('0103','吴宝钢','男','1980-11-06','讲师',2554.00,01);

INSERT INTO O(xq,kh,gh,sksj)
VALUES('2012-2013秋季','08305001','0103','星期三5-8');
INSERT INTO O(xq,kh,gh,sksj)
VALUES('2012-2013冬季','08305002','0101','星期三1-4');
INSERT INTO O(xq,kh,gh,sksj)
VALUES('2012-2013冬季','08305002','0102','星期三1-4');
INSERT INTO O(xq,kh,gh,sksj)
VALUES('2012-2013冬季','08305002','0103','星期三1-4');
INSERT INTO O(xq,kh,gh,sksj)
VALUES('2012-2013冬季','08305003','0102','星期五5-8');
INSERT INTO O(xq,kh,gh,sksj)
VALUES('2013-2014秋季','08305004','0101','星期二1-4');
INSERT INTO O(xq,kh,gh,sksj)
VALUES('2013-2014秋季','08305001','0102','星期一5-8');
INSERT INTO O(xq,kh,gh,sksj)
VALUES('2013-2014冬季','08302001','0201','星期一5-8');
