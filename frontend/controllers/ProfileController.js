const api = require('../services/api');
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');
const intl = require('intl');

module.exports = {
	
	async index(request, response){
		
		const ongId = localStorage.getItem('ongId');
		const ongName = localStorage.getItem('ongName');
		
		if(ongId){
			
			const  profiles = await api.get("profile", {
				headers: {
					Authorization: ongId
				}
			});
			
			response.render("profile", {profile: profiles.data, ong_name: ongName, Intl: intl});
		}else{
			response.redirect("/");
		}
	}
};
