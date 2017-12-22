var s1="some text";
var s2 = s1.substring(2);
//equal to
var s1 = new String("some text");
var s2 = s1.substring(2);
s1=null;


var s1="some text";
var s2.color = "red";
alert(s2.color);

var b1 = new Boolean(false);
var r = b1 && true;
console.log(typeof b1);
console.log(typeof r);
console.log(b1 instanceof Boolean);
console.log(r instanceof Boolean);

var numobj = new Number(10);
console.log(numobj.toString(2));
console.log(numobj.toString(16));
console.log(numobj.toFixed(3));
console.log(numobj.toPrecision(3));
console.log(numobj.toExponential(3));

console.log(numobj instanceof Number);
console.log(10 instanceof Number);

var str = "Nice day!";
console.log(str.length);
alert(str.charAt(2)+" "+parseInt(str.charCodeAt(2)).toString(16));

var str1 = str.concat(" Chloe!");//more than one parameter can be applied
var str2 = str.concat(" Chloe","!");
alert(str+'\n'+str1+'\n'+str2);

console.log(str.slice(2));
console.log(str.substr(2));
console.log(str.substring(2));
console.log(str.slice(2,4));
console.log(str.substr(2,4));//the 2nd parameter is the length of returned string.
console.log(str.substring(2,4));

console.log(str.slice(-3));//the most normal one
console.log(str.substr(-3));
console.log(str.substring(-3));//-3->0

console.log(str.slice(3,-4));
console.log(str.substring(3,-4));//->(3,0)->(0,3)
console.log(str.substr(3,-4));//->(3,0)

console.log(str1.indexOf('e'));
console.log(str1.lastIndexOf('e'));

console.log(str1.indexOf('e',5));

var str3 = '463278365783392384248';
var array3 = new Array();

var pos = str3.indexOf('2');
while(pos!=-1){
	array3.push(pos);
	pos = str3.indexOf('2',pos+1);
}

alert(array3);

var str4 = '      sd   ';
alert(str4.trim());
alert(str4.toUpperCase());

var txt = 'cat,bat,rat';
var reg = /(.at)/g;
var pos = txt.search(reg);
var parens = txt.match(reg);
alert(parens);

alert(txt.replace(/at/g,'ond'));
alert(txt.replace('at','ond'));

var txt1 = 'catat,batat,ratat';
alert(txt1.replace(/(.at)/g,'word($1)'));
alert(txt1.replace(/(.at)/g,'word($\')'));
alert(txt1.replace(/(.at)/g,'word($`)'));

function htmlEscape(text){
	return text.replace(/[<>"&]/g,function(match,pos,origin){
			switch(match){
				case '<': return "&lt";break;
				case '>': return "&gt";break;
				case '&': return "&amp";break;
				case '\"': return "&quot";break;
			}
	});
}
alert(htmlEscape("<p class=\"greeting\">Hello !</p>"));

alert(txt1.split(","));
alert(txt1.split(",",2));
alert(txt1.split("."));
alert(txt1.split(/[^\,]+/));

var txt2 = 'bat';
alert(txt2.localeCompare(txt1));
alert(txt2.localeCompare(txt2));
alert(txt2.localeCompare(Bat));//-1

alert(String.fromCharCode(104,101,108,108,111));

var charCodes = new Array();
for(var i=0;i<txt2.length;i++){
	charCodes.push(txt2.charCodeAt(i));
}
alert(String.fromCharCode.apply(this,charCodes));


//Global
var uri = "http://www.wrox.com/illegal value.htm#start";
alert(encodeURI(uri));
alert(encodeURIComponet(uri));
alert(decodeURI(encodeURI(uri)));

eval("function say(){alert("Hi")}");

var color = 'red';
function saycolor(){
	alert(this.color);
}
window.saycolor();
var glo = function(){return this;}();

var max = Math.max.apply(this,[1,2,3,4,5]);
var min = Math.min.call(this,1,2,3,4,5);

alert(Math.ceil(25.9));
alert(Math.floor(25.9));
alert(Math.round(25.9));

var r = Math.floor(Math.random()*10+1);
alert(r);