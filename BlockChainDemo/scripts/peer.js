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
    for(var j=0;;j++){
        nonce.value = j;
        var info = getStr(blocks[i]);
        var hashValue = SHA1(info);
        if(hashValue.slice(0,4)=='0000'){
            hash.value =hashValue;
            pre = hashValue;
            break;
        }
    }
    nonce.value = j;

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
			return (function(event){
				var nonce = blocks[index].querySelector("input#nonce");
				var hash = blocks[index].querySelector("input#hash");
				var prev = blocks[index].querySelector("input#pre");
				if(index>0){
					prev.value = blocks[index-1].querySelector("input#hash").value;
				}
		        for(var j=0;;j++){
		            nonce.value = j;
		            var info = getStr(blocks[index]);

		            var hashValue = SHA1(info);
		            if(hashValue.slice(0,4)=='0000'){
		                hash.value = hashValue;
		                break;
		            }
		        }
		        nonce.value = j;
		        blocks[index].style.backgroundColor="lightblue";
		        if(index<4){
		        	blocks[index+1].querySelector("input#pre").value=hash.value;
		        }
		    });
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

			for(var i=0,len=blocks.length;i<len;i++){
				if(blocks[i].contains(target)){
					break;
				}
			}
			var info = getStr(blocks[i]);
			var hash = blocks[i].querySelector("input#hash");
			hash.value = SHA1(info);

			for(var k=i+1;k<len;k++){
				blocks[k].querySelector("input#pre").value=blocks[k-1].querySelector("input#hash").value;
				blocks[k].querySelector("input#hash").value=SHA1(getStr(blocks[k]));
				if(blocks[k].querySelector("input#pre").value.slice(0,4)!='0000'&&
					blocks[k].querySelector("input#hash").value.slice(0,4)!='0000')
					blocks[k].style.backgroundColor='pink';
				else blocks[k].style.backgroundColor='lightblue';
			}
			if(hash.value.slice(0,4)!='0000')
				blocks[i].style.backgroundColor='pink';
			else
				blocks[i].style.backgroundColor='lightblue';
		}
	,false);
function getStr(block){
		var input = block.getElementsByClassName('input');
        var str = [];
        for(var i=0,len=input.length;i<len;i++){
            str+=input[i].value;
        }
        return str;
    }