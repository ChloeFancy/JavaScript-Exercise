(function(){
    var mineBtn = document.getElementById('mine');
    var block = document.getElementsByClassName('block')[0];
    var form = document.forms[0];
    var hash = document.getElementById('hash');
    var nonce = document.getElementById('nonce');
    var str=[];
    window.addEventListener('keyup',function(event){
        hashCal();
        if(hash.value.slice(0,4)!='0000')
            document.getElementById('box').style.backgroundColor='pink';
        else document.getElementById('box').style.backgroundColor='lightblue';
    },false);
    mine.addEventListener('click',function(event){

        document.getElementById('box').style.backgroundColor='lightblue';
        nonce.value = mineSomeBlock(blocks[i]);
    },false);
    function hashCal(event){
        hash.value = SHA1(getStr(block));
    }
})();

