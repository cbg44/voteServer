var eMitter = require('events'),
    events = require('./config').events,
    results = require('./config').results,
    conf = require('./config'),
    emitter = new eMitter();

class votesForEntity{

	constructor(data){

	this.title = data['title'];

    this.vote1Name = data['vote'][0];
    this.vote2Name = data['vote'][1];
    this.vote3Name = data['vote'][2];
    this.count=0;
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
    this.print(`${this.title} :`);
    this.print(`${this.vote1Name}: ${this.vote1}`);
    this.print(`${this.vote2Name}: ${this.vote2}`);
    this.print(`${this.vote3Name}: ${this.vote3}`);
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
	//when it does, we'll substarct till maximum

	if(obj.count<15){
						for (var i = 0; i < obj.count ; i++) {	
		    				  emitter.emit('votesListener', obj, voteNum);
						      obj.print(`---voted for ${voteName} ---`);
		 			}
		
		}else{
				obj.print(`! ! ! overload for ${voteName} ! ! !`);
				obj.print(`performing cut from ${count} to ${conf.conf.max}`);
				for (var i = 0; i < conf.conf.max ; i++) {	
		      emitter.emit('votesListener', obj, voteNum);
		      obj.print(`---voted for ${voteName} ---`);
	 	}
	 }
	   return obj;					

	


}); 


emitter.on('demoVotes', (obj)=>{
	obj.print(`VOTING FOR: ${obj.getTitle()}`);
	emitter.emit('loop',obj,obj.setCount(getRandomInt(15)), 'vote1', obj.vote1Name);
	obj.clearCount();
	emitter.emit('loop',obj, obj.setCount(getRandomInt(18)), 'vote2', obj.vote2Name);
		obj.clearCount();
	emitter.emit('loop',obj,obj.setCount(getRandomInt(28)), 'vote3', obj.vote3Name);
	return obj;
});



module.exports = (data) =>{
	var votes = new votesForEntity(data);
 	emitter.emit('demoVotes',votes);
 	votes.printAllData();
    return votes;

	}
