Vue.component(
	// disabled='false'任然会禁用
	'ablock',
	{
		template:
			'<div class="block" @keyup.capture=\'block.updateHash\'>\
				<form>\
					<p v-for=\'(value,key) in block\' :key=key>\
						<label>{{key}}</label>\
						<textarea :value=\'value\' v-model=\'block[key]\' v-if="key==\'data\'"></textarea>\
						<input :value=\'value\' v-model=\'block[key]\' v-else disabled>\
					</p>\
				</form>\
				<button @click=\'bc.mine(block,index)\'>mine it</button>\
			</div>',
		props:["block","index","bc"]
	}
);



class Block{
	constructor(no,data,prev){
		this.BlockNO = no;
		this.nonce = 0;
		this.data = data;
		this.prev = prev;
		this.hash = SHA1(JSON.stringify(this));
	}

	updateHash(){
		this.hash = SHA1(JSON.stringify(this));
	}
}


class blockChain {
	constructor(){
		this.chain = [new Block(0,'genesis','***********')];
	}

	addBlock(data){
		this.chain.push(new Block(this.chain.length,data,this.chain[this.chain.length-1].hash));
	}

	mine(block,index){
		console.log('start');
		if(index!=0){
			block.prev = blockChain_store.chain[index-1].hash;
		}
		for(let i=0;;i++){
			block.nonce = i;
			if(SHA1(JSON.stringify(block)).slice(0,4)=='0000'){
				block.hash = SHA1(JSON.stringify(block));
				break;
			}
		}
		console.log('mine success!');
	}
}

let blockChain_store = new blockChain();
blockChain_store.addBlock('alice to bob, $100');


// function mine(block,index){

// 	console.log('start');
// 	if(index!=0){
// 		block.prev = blockChain_store.chain[index-1].hash;
// 	}
// 	for(let i=0;;i++){
// 		block.nonce = i;
// 		if(SHA1(JSON.stringify(block)).slice(0,4)=='0000'){
// 			block.hash = SHA1(JSON.stringify(block));
// 			break;
// 		}
// 	}
// 	console.log('mine success!');
// }

var vm_blockchain = new Vue({
	el:'#blockchain',
	data:{
		blockChain: blockChain_store,
	},
	computed:{
		length: function(){return this.blockChain.chain.length;},
		lastHash: function(){return this.blockChain.chain[this.length-1].hash;},
	},
	methods:{
		addBlock: function(){
			this.blockChain.addBlock('bob to alice, $3000');
			// this.blocks.push(new Block(this.length,'some data',this.lastHash));
		},
	},
	components:{

	}
});