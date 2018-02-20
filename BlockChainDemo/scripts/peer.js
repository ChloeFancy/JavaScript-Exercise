var peers = document.getElementsByClassName('peer');

var blocks = peers[0].getElementsByClassName('block');

var blocks1 = peers[1].getElementsByClassName('block');
var blocks2 = peers[2].getElementsByClassName('block');
var pre;
	//init

for(var i=0,len=blocks.length;i<len;i++){
	var nonce = blocks[i].querySelector("input#nonce");
	var hash = blocks[i].querySelector("input#hash");
	var prev = blocks[i].querySelector("input#pre");

	if(i>0)
		prev.value = pre;
    nonce.value = mineSomeBlock(blocks[i]);

    blocks1[i].querySelector("input#nonce").value=nonce.value;
	blocks1[i].querySelector("input#hash").value=hash.value;
	blocks1[i].querySelector("input#pre").value=prev.value;
	blocks2[i].querySelector("input#nonce").value=nonce.value;
	blocks2[i].querySelector("input#hash").value=hash.value;
	blocks2[i].querySelector("input#pre").value=prev.value;
}
for(var k=0;k<peers.length;k++){

	var blocks = peers[k].getElementsByClassName('block');

	//mine buttons
	for(var i=0,len=blocks.length;i<len;i++){
		var btn = blocks[i].querySelector("button#mine");

		btn.addEventListener('click',(function(index,blocks){
			return function(){
				validateBlock(event,blocks,index);
			};
		})(i,blocks),false);
	}
}
window.addEventListener('keyup',
	function(event){
		var target = event.target;
		for(var e=0;e<3;e++){
			if(peers[e].contains(target)){
				var blocks = peers[e].getElementsByClassName('block');
				break;
			}
		}

		windowListener(event,blocks);
	}
,false);
