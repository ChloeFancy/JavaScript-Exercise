var block = new Vue({
	el:"#box",
	data:{
		oneBlock: {
			no: 1,
			nonce: 0,
			tradeData:'Some data'
		},
	},
	computed:{
		hash: function(){
			hashValue = SHA1(JSON.stringify(this.oneBlock));
			return hashValue;
		},
		valid: function(){
			return SHA1(JSON.stringify(this.oneBlock)).slice(0,4)==="0000";
		},
		// valid: (function() {(() => SHA1(JSON.stringify(this.oneBlock)).slice(0,4)==="0000")()}) 并不能实时反映valid的值
	},
	methods:{
		mineIt: function(){
			console.log('start');
			for(let i=0;;i++){
				this.oneBlock.nonce = i;
				if(SHA1(JSON.stringify(this.oneBlock)).slice(0,4)=='0000'){
					break;
				}
			}
			console.log('mine success!');
		}
	}
});

// function windowListener(event,blocks){
// 	var target = event.target;
// 	if(target.nodeName.toUpperCase()!='INPUT'&&target.nodeName.toUpperCase()!='TEXTAREA')
// 		return ;
// 	for(var i=0,len=blocks.length;i<len;i++){
// 		if(blocks[i].contains(target)){
// 			break;
// 		}
// 	}
// 	var info = getStr(blocks[i]);
// 	var hash = blocks[i].querySelector("input#hash");
// 	hash.value = SHA1(info);
// 	for(var k=i+1;k<len;k++){
// 		blocks[k].querySelector("input#pre").value=blocks[k-1].querySelector("input#hash").value;
// 		blocks[k].querySelector("input#hash").value=SHA1(getStr(blocks[k]));
// 		if(blocks[k].querySelector("input#pre").value.slice(0,4)!='0000'&&
// 			blocks[k].querySelector("input#hash").value.slice(0,4)!='0000')
// 			blocks[k].style.backgroundColor='pink';
// 		else blocks[k].style.backgroundColor='lightblue';
// 	}
// 	if(hash.value.slice(0,4)!='0000')
// 		blocks[i].style.backgroundColor='pink';
// 	else
// 		blocks[i].style.backgroundColor='lightblue';

// }

// function getStr(block){
// 	var input = block.getElementsByClassName('input');
//     var str = [];
//     for(var i=0,len=input.length;i<len;i++){
//         str+=input[i].value;
//     }
//     return str;
// }

// function validateBlock(event,blocks,index){
// 	var nonce = blocks[index].querySelector("input#nonce");
// 	var hash = blocks[index].querySelector("input#hash");
// 	var prev = blocks[index].querySelector("input#pre");

// 	if(index>0){
// 		prev.value = blocks[index-1].querySelector("input#hash").value;
// 	}
//     nonce.value = mineSomeBlock(blocks[index]);
//     blocks[index].style.backgroundColor="lightblue";
//     if(index<4){
//     	blocks[index+1].querySelector("input#pre").value=hash.value;
//     }
// }

// function mineSomeBlock(someBlock){
//     for(var j=0;;j++){
//     	var nonce = someBlock.querySelector("input#nonce");
// 		var hash = someBlock.querySelector("input#hash");
//         nonce.value = j;
//         var info = getStr(someBlock);
//         var hashValue = SHA1(info);
//         if(hashValue.slice(0,4)=='0000'){
//             hash.value = hashValue;
//             break;
//         }
//     }
//     return j;
// }
