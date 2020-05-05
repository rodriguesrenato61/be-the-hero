const api = require('../services/api');
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');

module.exports = {
	
	async index(request, response){
				
		const incidents = await api.get("incidents");
			
		response.render("incidents", {incidents: incidents.data});
	},
	async createPage(request, response){
			
		const ongId = localStorage.getItem('ongId');
		const ongName = localStorage.getItem('ongName');
		
		if(ongId){	
			
			response.render("newincident");
			
		}else{
			
			response.redirect("/");
		}
	},
	async create(request, response){
		
		const ongId = localStorage.getItem('ongId');
		
		const dados = {
			title: request.body.title,
			description: request.body.description,
			valor: request.body.valor,
			ong_id: ongId
		};
		
		console.log(ongId);
		
		try{
			const res = await api.post('incident', dados, {
				headers: {
					Authorization: ongId,
				}
			});
			
			response.redirect("/profile");
		}catch(err){
			response.redirect('/incidents/new');
		}
	},
	async delete(request, response){
		
		const id = request.params.id;
		
		const ongId = localStorage.getItem('ongId');
		
		if(ongId){
			
			const url = "incidents/"+id;
			
			try{
				await api.delete(url, {
					headers: {
						Authorization: ongId
					}
				});
				response.redirect("/profile");
			}catch(err){
				response.send("<h1>Erro na requisição</h1>");
			}
		}else{
			response.redirect("/");
		}
	}
	
};
