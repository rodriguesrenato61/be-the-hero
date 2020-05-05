const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const OngController = require("./controllers/OngController");
const SessionController = require("./controllers/SessionController");
const ProfileController = require("./controllers/ProfileController");
const IncidentController = require("./controllers/IncidentController");

app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/css/global', function(req, res){
	return res.sendFile(__dirname+'/global.css');
});
app.get("/icons/arrow-left", function(req, res){
	res.sendFile(__dirname+"/assets/icons/arrow-left.svg");
});
app.get("/icons/log-in", function(req, res){
	res.sendFile(__dirname+"/assets/icons/log-in.svg");
});
app.get("/img/logo.svg", function(req, res){
	res.sendFile(__dirname+"/assets/img/logo.svg");
});
app.get("/img/heroes.png", function(req, res){
	res.sendFile(__dirname+"/assets/img/heroes.png");
});
app.get("/icons/trash-2", function(req, res){
	res.sendFile(__dirname+"/assets/icons/trash-2.svg");
});
app.get("/icons/power", function(req, res){
	res.sendFile(__dirname+"/assets/icons/power.svg");
});

app.get('/', function(req, res){
	res.render('logon');
});

app.get("/logout", SessionController.destroy);
app.post("/sessions", SessionController.create);

app.get('/register', function(req, res){
	res.render('register');
});

app.get('/ongs', OngController.index);
app.post('/ongs', OngController.create);

app.get('/profile', ProfileController.index);

app.get('/incidents', IncidentController.index);
app.get('/incidents/new', IncidentController.createPage);
app.post('/incident', IncidentController.create);
app.get('/incidents/delete/:id', IncidentController.delete);

app.get('/detail', function(request, response){
	response.render('detail');
});

app.listen(8081, function(){
	console.log("Servidor rodando na porta 8081!");
});
