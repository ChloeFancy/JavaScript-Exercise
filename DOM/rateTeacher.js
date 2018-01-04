//1.
var tbl = document.getElementsByTagName('table')[0];
// var filter = function(node){
// 	return node.tagName.toLowerCase()=='td'?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP;
// };
// 一个具有acceptNode功能的函数也可以作为filter
var filter = {
	acceptNode: function(node){
		return node.tagName.toLowerCase()=='td'?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP;
	}
};
var iterator = document.createNodeIterator(tbl,NodeFilter.SHOW_ELEMENT,filter,false);
var node = iterator.nextNode();

// node instanceof Node
// true
// node instanceof NodeIterator
// false
// iterator instanceof NodeIterator
// true

while(node!=null){
	if(node.innerHTML=='刘福岩'){
		while((node = iterator.nextNode())!=null){
			if(node.children[0].nodeName.toLowerCase()=='select'){
				node.children[0].options[3].selected = 'selected';
			}
			else break;
		}
	}
	node = iterator.nextNode();
}

//2.
var trows = document.getElementsByTagName('tr');
for(var i=0;i<trows.length;i++){
  var tds = trows[i].getElementsByTagName('td');
  var selects = trows[i].getElementsByTagName('select');
  if(selects.length>0){
    if(tds[3].firstChild.nodeValue=='刘福岩'){
      console.log(tds[3].firstChild.nodeValue);
      for(var j=0;j<selects.length;j++){
        selects[j].options[3].selected='selected';
      }
    }else{
      for(var j=0;j<selects.length;j++){
        selects[j].options[1].selected='selected';
      }
    }
  }
}

//3.
var tbl = document.getElementsByClassName('tbllist')[0];
var iterator = document.createTreeWalker(tbl,NodeFilter.SHOW_ELEMENT,null,false);
var node1 = iterator.firstChild();
var node = iterator.firstChild();
node=iterator.nextSibling();
while(node!=null){
  if(node.children[3].innerHTML!='刘福岩'){
    node = iterator.nextSibling();
  }else{
    node = iterator.firstChild();
    while(node!=null){
      if(iterator.firstChild()!=null){
	      var first = iterator.currentNode;
	      alert(first.nodeName);
	      if(first.nodeName.toLowerCase()=='select'){
	        first.options[3].selected = 'selected';
	      }
	      node = iterator.parentNode();
      }
	  node = iterator.nextSibling();
    }
  }
}