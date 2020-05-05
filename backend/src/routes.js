const express = require('express');//importando o express
const { celebrate, Segments, Joi } = require('celebrate');

const routes = express.Router();//instaciando um objeto da classe do express para rotas

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

/*validar rota de sessions*/
routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', celebrate({
	[Segments.BODY]: Joi.object().keys({
		nome: Joi.string().required(),
		email: Joi.string().required().email(),
		whatsapp: Joi.string().required().min(10).max(11),
		city: Joi.string().required(),
		uf: Joi.string().required().length(2),
	})
}), OngController.create);

routes.get('/incidents', celebrate({
	[Segments.QUERY]: Joi.object().keys({
		page: Joi.number(),
	})
}), IncidentController.index);

routes.get('/view_incidents', celebrate({
	[Segments.QUERY]: Joi.object().keys({
		page: Joi.number(),
	})
}), IncidentController.view_incidents);

routes.post('/incident', celebrate({
	[Segments.HEADERS]: Joi.object({
		authorization: Joi.string().required(),
	}).unknown(),
	[Segments.BODY]: Joi.object().keys({
		title: Joi.string().required(),
		description: Joi.string().required(),
		valor: Joi.number().required(),
		ong_id: Joi.string().required()
	})
}), IncidentController.create);

routes.delete('/incidents/:id', celebrate({
	[Segments.PARAMS]: Joi.object().keys({
		id: Joi.number().required(),
	})
}), IncidentController.delete);

routes.get('/profile', celebrate({
	[Segments.HEADERS]: Joi.object({
		authorization: Joi.string().required(),
	}).unknown()
}), ProfileController.index);

routes.get('/users', (request, response) => {
	const params = request.params;
	console.log(params);
	return response.json({
			evento: 'Semana Omnistack 11.0',
			aluno: params.name
		});
});//criando rota e mandando mensagem

/*rotas de teste*/
routes.get('/post_ongs', function(req, res){
	
	var html = "<!DOCTYPE html>";
	html += "<html lang='pt-br'>";
	html += "<head>";
	html += "<meta charset='utf-8'>";
	html += "<title>Teste inserir ong com post</title>";
	html += "</head>";
	html += "<style type='text/css'>";
	html += ".form-input{ width: 350px; height: 30px; font-size: 20pt; display: block;}";
	html += ".form-btn{ width: 100px; height: 30px; font-size: 20pt}";
	html += "</style>";
	html += "<body>";
	html +=	"<div class='container'>";
	html += "<form method='POST' action='/ongs'>";
	html += "<input class='form-input' type='text' name='name' placeholder='name'>";
	html += "<input class='form-input' type='text' name='email' placeholder='email'>";
	html += "<input class='form-input' type='text' name='whatsapp' placeholder='whatsapp'>";
	html += "<input class='form-input' type='text' name='city' placeholder='city'>";
	html += "<input class='form-input' type='text' name='uf' placeholder='uf'>";
	html += "<button type='submit' class='form-btn'>Enviar</button>";
	html += "</form>";
	html += "</div>";
	html += "</body>";
	html += "</html>";
	res.send(html);
});

routes.get("/teste", function(req, res){
	res.sendFile(__dirname+"/pages/testes/index.html");
});
routes.get("/teste.css", function(req, res){
	res.sendFile(__dirname+"/pages/testes/styles.css");
});
routes.get("/teste.js", function(req, res){
	res.sendFile(__dirname+"/pages/testes/scripts.js");
});

module.exports = routes;
