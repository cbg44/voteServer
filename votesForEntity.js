var emitter = require('events'),
    results = require('./config').results,
    conf = require('./config'),
    emitter = new emitter();

class votesForEntity{

	constructor(data){
	this.title = data['title'];
    this.firstEntity = data['vote'][0];
    this.secondEntity = data['vote'][1];
    this.thirdEntity = data['vote'][2];
    this.count = 0;
    this.vote1 = 0;
    this.vote2 = 0;
    this.vote3 = 0;
	}

	getTitle(){
		return this.title;
	}

	setCount(c){
		this.count += c;
	}	

	clearCount(){
		this.count=0;
	}

	print(info){
		console.log(info);
		results.push(info);
	}


  printAllData(){
    this.print(` ${this.title}:`);
    this.print(` ${this.firstEntity}: ${this.vote1}`);
    this.print(` ${this.secondEntity}: ${this.vote2}`);
    this.print(` ${this.thirdEntity}: ${this.vote3}`);
    console.log(`___________________________`);
  }
};
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


emitter.on('votesListener', (vEntity, vCount)=>{
		vEntity[vCount] = vEntity[vCount]+1;  
		return vEntity;
});

emitter.on('loop', (obj,count,voteNum,voteName)=> {
	//we're assuming that each entity shouldn't pass 15 count;
	//when it does, we'll substarct till maximum allowed.
	if(obj.count<conf.conf.max){
		for (var i = 0; i < obj.count ; i++) {	
		     emitter.emit('votesListener', obj, voteNum);
				 obj.print(`---voted for ${voteName} ---`);
		}
	}else{
		obj.print(`! ! ! overload for ${voteName} ! ! !`);
		obj.print(`performing cut from ${obj.count} to ${conf.conf.max}`);
		for (var i = 0; i < conf.conf.max ; i++) {	
		    emitter.emit('votesListener', obj, voteNum);
		      obj.print(`---voted for ${voteName} ---`);
	 	}
	 }
	return obj;					
}); 


emitter.on('demoVotes', (obj)=>{
	obj.print(`VOTING FOR: ${obj.getTitle()}`);
	emitter.emit('loop',obj,obj.setCount(getRandomInt(15)), 'vote1', obj.firstEntity);
	obj.clearCount();
	emitter.emit('loop',obj, obj.setCount(getRandomInt(18)), 'vote2', obj.secondEntity);
	obj.clearCount();
	emitter.emit('loop',obj,obj.setCount(getRandomInt(28)), 'vote3', obj.thirdEntity);
	return obj;
});



module.exports = (data) => {
	var votes = new votesForEntity(data);
 	emitter.emit('demoVotes',votes);
 	votes.printAllData();
    return votes;
}
