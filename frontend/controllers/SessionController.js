const api = require('../services/api');
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');

module.exports = {
	async create(request, response){
		
		const id  = request.body.id;
		
		try{
			const res = await api.post("sessions", { id });
			
			localStorage.setItem('ongId', id);
			localStorage.setItem('ongName', res.data.nome);
			response.redirect('/profile');
			
		}catch(err){
		
			response.redirect('/');
		}
		
	},
	async destroy(request, response){
		localStorage.clear();
		response.redirect('/');
	}
};
