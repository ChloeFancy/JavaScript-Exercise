//创建Object实例
var student1 = new Object();
student1.age = 10;
student1.gender = 'female';

var student2 = {};
var student3 = {
	age: 20,
	gender: 'male'
}//不会调用Object构造函数

function display(obj){
	var output = "";
	if(typeof obj.age == 'number'){
		output+='The student is ' + obj.age + ' years old, ';
	}
	if(typeof obj.gender == 'string'){
		output+='and is a ' + obj.gender + ' student.';
	}
	alert(output);
}

display(student2);
display(student3);
display({gender:'male',age:15});

var tempAge;
var str;
str = 'age';
tempAge = student3[str];
tempAge = student3['age'];
tempAge = student3.age;


//创建Array实例
var array1 = new Array(10);
var array2 = new Array(1,2,3,5);
var array3 = [1,2,3,5];//字面量表示法不调用Array构造函数

array2.length = 10;
alert(array2[5]);//undefined
array3[array3.length] = 5;

if(Array.isArray(array3)){
	alert(array3);
	alert(array3.valueOf());
	alert(array3.toString());
	alert(array3.toLocalString());
}


var p1 = {
	toString:{
		return 'p1';
	},
	toLocalString:{
		return 'P1';
	}
}
var p2 = {
	toString:function(){
		return 'p2';
	},
	toLocalString:function(){
		return 'P2';
	}
}
var array = [p1,p2];
alert(array.toString());
alert(array.toLocalString());

alert(array3.join('&&&'));

array3.push('good');
var item = array3.pop();
var item1 = array3.shift();
var newLength = array3.unshift('great','excellent');//将括号内全部内容放入数组开头

var array4 = new Array(1,2,3,3,4,5,6,45,36);
array4.reverse();
array4.sort();

//依赖valueOf()
function ascending(num1,num2){//升序排序
	return num1-num2;
}
function decending(num1,num2){//降序排序
	return num2-num1;
}

var array5 = new Array(1,2,3,4,5,6,3);
var array6 = array5.concat('7','8','9','10');
var array7 = array5.slice(2,6);

var removed = array5.splice(1,0,'hello');
removed = array5.splice(1,2,'hi','qq');
removed = array5.splice(1,3);

var first = array5.indexOf(3);
var last = array5.indexOf(3);

var sum = array5.reduce(function(pre,cur,index,array){
	return pre+cur;
},0);
var sum2 = array5.reduceRight(function(pre,cur,index,array){
	return pre+cur;
},0);

var string = array5.reduceRight(function(pre,cur,index,array){
	return pre+cur+'.';
},'')
alert(string);

var array8 = array5.map(function(item,index,array){
	return item+1;
});
var a = array5.every(function(item,index,arraay){
	return item>0;
})
var b = array5.some(function(item,index,array){
	return item>5;
})
var c = array5.filter(function(item,index,array){
	return item%2==0;
})
var d = array5.forEach(function(item,index,array){
	item+=10;
})

//实验index、array
var e = array5.filter(function(item,index,array){
	return index%2==0;
})
var f = array5.filter(function(item,index,array){
	array.length = 3;
	return 1;
})

//结论：
//item——数组中的每一项
//index——数组项下标
//array——数组的地址（引用类型的参数传递）