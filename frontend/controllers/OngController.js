const api = require('../services/api');

module.exports = {
	async index(request, response){
		
	let valor;
	
		const ongs = await api.get("ongs");
		
		/*ongs.data.forEach(function(ong){
				console.log(ong.nome);
				valor = ong.nome;
		});*/
		
		response.render("ongs", {ong: ongs.data});
	},
	async create(request, response){
		
		const dados = {
			nome: request.body.nome,
			email: request.body.email,
			whatsapp: request.body.whatsapp,
			city: request.body.city,
			uf: request.body.uf
		};
		
		var msg;
		
		try{
			const res = await api.post('ongs', dados);
			msg = "Ong "+res.data.id+" cadastrada com sucesso!";
			response.redirect("/");
		}catch(err){
			msg = "Erro ao cadastrar ong!";
			response.send(msg);
		}
	
	}
};

