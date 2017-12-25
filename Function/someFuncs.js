var concat = function(){
	var arr = Array.prototype.slice.call(arguments);
	return arr.join('');
};
console.log(concat('1','2','3'));
console.log(concat());
console.log(concat('1','csavds','cscsac','56565'));
console.log(concat('I',' ','wish',' ','you',' ','a',' ','merry',' ','Christmas','!'));

var fio = function(n){
	var arr=new Array();
	arr.push(0);
	arr.push(1);
	for(var i=2;i<n;i++){
		arr.push(arr[i-1]+arr[i-2]);
	}
	return arr;
}
console.log(fio(12));

var fio = function(n){
	var arr = new Array();
	for(var i=0;i<n;i++){
			arr.push((function(n) {
				if(n==0){
					return 0;
				}else if(n==1){
					return 1;
				}else{
					var i = arguments.callee(n-1)+arguments.callee(n-2);
					return i;
				}
			})(i));
	}
	return arr;
}
console.log(fio(12));

//
var arr = [2,3,4,[2,3,[2,3,4,2],5],3,5,[2,3,[2,3,4,2],2],4,3,6,2];
var unique = function(arr){
    var result = new Array();
    arr.forEach(
    	function(item){
    		if(item instanceof Array){
    			this.concat(item);
    		}else{
    			if(this.indexOf(item)==-1){
    				this.push(item);
    			}
    		}
    	},result
    );
    return result;
};
console.log(unique(arr));
// [2,3,4,5,6]
