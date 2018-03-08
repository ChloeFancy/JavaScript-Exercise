var count = 5;
var name = ["a","b","c","d","e"];
function constantCollectingGarbage(){
	for(let i=0;i<260;i++){
		// window[name[count-1]+i] = 1;
		eval('var '+(name[2*(count-1)]+i)+'='+'1;');

		if(i==259&&count!=0){
			--count;
			arguments.callee();
			// console.log(count);
		}
		if(count==0){
			return ;
		}
	}
}
constantCollectingGarbage();

var arr = [0,0,2];


