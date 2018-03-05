(function(){
	var form = document.forms[0];
	var formData = new FormData(form);
	formData.append('addr','Shanghai');//通过append方法来给formData增加项
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(xhr.readyState==4){
			if(xhr.status>=200&&xhr.status<300||xhr.status==304){
				//success
			}else{
				alert('fail '+xhr.status);
				//fail 0
			}
		}
	};
	xhr.open('POST',"xxx.php",true);
	xhr.send(formData);

})();