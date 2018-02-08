(function(){
    var mineBtn = document.getElementById('mine');
    var input = document.getElementsByClassName('input');
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
        for(var i=0;;i++){
            nonce.value = i;
            if(SHA1(getStr()).slice(0,4)=='0000'){
                hash.value = SHA1(getStr());
                break;
            }
        }
        document.getElementById('box').style.backgroundColor='lightblue';
        nonce.value = i;
    },false);
    function getStr(){
        str = [];
        for(var i=0,len=input.length;i<len;i++){
            str=str.concat(input[i].value);
        }
        return str.join();
    }
    function hashCal(event){
        hash.value = SHA1(getStr());
    }
})();

