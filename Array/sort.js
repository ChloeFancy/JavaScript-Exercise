function compare(obj1,obj2){
	if(obj1.age>obj2.age){
		return 2;
		//正数——arguments[0]在arguments[1]之后
	}else{
		return -6;
	}
}

var array = [{age:15},{age:13}];
array.sort(compare);
console.log(array);//[ { age: 13 }, { age: 15 } ]
array.reverse(compare);
console.log(array);//[ { age: 15 }, { age: 13 } ]


var arr = [2,3,4,[2,3,[2,3,666,2],5],3,5,[2,3,[2,3,4,2],2],4,3,6,2];
console.log(arr);
function dec_1(arrr){
	var result = [];
	var stack = arrr;
	while(stack.length!=0){
		var t = stack.pop();
		if(Array.isArray(t)){
			stack = stack.concat(t);
		}else{
			result.unshift(t);
		}
	}
	return result;
}
console.log(dec_1(arr));
console.log(arr);

var a = [1,2];
console.log(Array.isArray(a));//true
console.log(a instanceof Array);//true
// var a = [1,2];
console.log(a.valueOf());//true
console.log(a.toString());//true


// var arr = [1,2,3,4,5,6];
// console.log(arr.concat(7,8,['a','b']));
// console.log(arr.slice(2,5));
// console.log(arr);//[1,2,3,4,5,6]
// console.log(arr.splice(0,2));//[1,2]
// console.log(arr);//[1,2]

var arr = [1,2,3,4,5,6,5];
console.log(arr.every(function(item,index,array){
    if(item>5){
        return true;
    }
}));
console.log(arr.some(function(item,index,array){
    if(item>5){
        return true;
    }
}));//false;
console.log(arr.filter(function(item,index,array){
    if(item>5){
        return true;
    }
}));//[6];
console.log(arr.forEach(function(item,index,array){array[index]=array[index]+1;}));
// arr.forEach(function(item){item=item+1;});
console.log(arr);
console.log(arr.map(function(item,index,array){return 0}));//[0,0,0,0,0,0,0]

var arr = [1,2,3,4,5,6];
console.log(arr.reduce(function(pre,cur,index,array){
    return pre+cur;
}));//21
console.log(arr.reduce(function(pre,cur,index,array){
    return pre+cur;
},10));//21

// var arr = [1,2,[3,3,3],4,5,6];
// function decline(array){
// 	var result = [];
// 	var stack = array;
//     while(stack.length!=0){
//     	var t = stack.pop();
//     	if(Array.isArray(t)){
//     		stack = stack.concat(t);
//     	}else{
//     		result.push(t);
//     	}
//     }
//     return result;
// }
// console.log(decline(arr));
// var arr1 = [1,2,3,[0,9,8,[7,6]]];
// console.log(decline(arr1));
// console.log(arr);

var arr = [1,[[[2,2,3],[3,4,4,5],5],5],6];
function simplify(arr){
    var result = [];
    var find = function(item1){
        if(result.indexOf(item1)<0)
            result.push(item1);
    }
    arr.forEach(function(item){
        if(Array.isArray(item)){
            item.forEach(arguments.callee);
        }else{
            find(item);
        }
    });
    return result;
}
console.log(simplify(arr));//[ 1, 2, 3, 4, 5, 6 ]

