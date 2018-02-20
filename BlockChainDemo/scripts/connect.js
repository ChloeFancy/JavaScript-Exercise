(function(){
	var blocks = document.getElementsByClassName('block');
	var pre;
	//init
	for(var i=0,len=blocks.length;i<len;i++){
		var nonce = blocks[i].querySelector("input#nonce");
		var hash = blocks[i].querySelector("input#hash");
		var prev = blocks[i].querySelector("input#pre");

		if(i>0)
			prev.value = pre;
        nonce.value = mineSomeBlock(blocks[i]);
        pre = hash.value;
	}
	//mine buttons
	for(var i=0,len=blocks.length;i<len;i++){
		var btn = blocks[i].querySelector("button#mine");

		btn.addEventListener('click',(function(index){
			return function(){
				validateBlock(event,blocks,index);
			};
		})(i),false);
	}

	window.addEventListener('keyup',function(event){
		windowListener(event,blocks);
	},false);

})();