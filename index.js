var express = require('express'),
app = express(),
port = process.env.PORT || 3000;
var serverShit = require('./votesForEntity.js');
var results = require('./config').results;

var object1ToVoteFor = {
	title: 'Religions',
	vote: ['Judaism','Christianity', 'Islam']
}


var object2ToVoteFor = {
	title: 'Cars',
	vote: ['Lexus','Audi', 'Mercedes']
}

var object3ToVoteFor = {
	title: 'Years',
	vote: ['80s','90s', '00s']
}



serverShit(object1ToVoteFor);
serverShit(object2ToVoteFor);
serverShit(object3ToVoteFor);


app.get('/', (req, res)=> {
	res.send(`<!doctype html> <html> <head> </head>
		<body>
		<h1> Votes - Server exercise</h1>
		</body>
		</html>`);
	res.send(results.join("<br>"));

});

app.get('/getall',(req,res)=>{
	res.send('get all datasd');
	var array = [];
	array.push(object1ToVoteFor.getAll());
	array.push(object2ToVoteFor.getAll());
	array.push(object3ToVoteFor.getAll());
	console.log(Religions);
	res.send(array.join("<br>"));
});





app.listen(port);
console.log(`listening on port ${port}`);