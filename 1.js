
var mongodb=require('mongodb');
var express=require('express');
var qs=require('querystring');
var app=express();
app.set('view engine','ejs');
var data;
app.all('/',function(req,res){
res.sendFile(__dirname+"/index.html");
});
app.all('/insert',function(req,res){
	req.on('data',function(chunk){
		data += chunk;
	});
	req.on('end',function(req,res){
		var body=qs.parse(data);
		var item=body.undefinedvalue;
		mongodb.connect("mongodb://localhost:27017/mdata",function(err,db){
			var collection=db.collection('col');
			var doc={value:item};
			collection.insert(doc,function(err,result){
				console.log(result);
				db.close();
			});
		});
	});
});
app.listen(3000);
console.log('server is running');