const connection = require('../database/connection');

module.exports = {
	async index(request, response){
		const { page = 1 } = request.query;
		
		const [count] = await connection('incidents').count();
		
		console.log(count);
		
		/*const incidents = await connection('incidents')
		.join('ongs', 'ongs.id', '=', 'incidents.ong_id')
		.limit(5).offset((page - 1) * 5)
		.select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);
		*/
		const incidents = await connection('vw_incidents')
		.limit(5).offset((page - 1) * 5)
		.select('*');
		
		response.header('X-Total-Count', count['count(*)']);
		
		return response.json(incidents);
	},
	
	async create(request, response){
		const { title, description, valor } = request.body;
		const ong_id = request.headers.authorization;
		
		const [id] = await connection('incidents').insert({
			title,
			description,
			valor,
			ong_id,
		});
		console.log("Id ong: "+ong_id);
		return response.json({ id });
	},
	
	async delete(request, response){
		const { id } = request.params;
		const ong_id = request.headers.authorization;
		
		const incident = await connection('incidents').where('id', id).select('ong_id').first();
		
		if(incident.ong_id != ong_id){
			return response.status(401).json({ error: 'Operation not permited.' });
		}
		
		await connection('incidents').where('id', id).delete();
		
		return response.status(204).send();
	},
	async view_incidents(request, response){
		const { page = 1 } = request.query;
		
		const [count] = await connection('incidents').count();
		
		console.log(count);
		
		/*const incidents = await connection('incidents')
		.join('ongs', 'ongs.id', '=', 'incidents.ong_id')
		.limit(5).offset((page - 1) * 5)
		.select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);
		*/
		const incidents = await connection('vw_incidents')
		.limit(5).offset((page - 1) * 5)
		.select('*');
		
		response.header('X-Total-Count', count['count(*)']);
		
		var html = "";
		var i = 0;
		
		console.log(incidents[0].ong);
		
		while(incidents[i] != null){
			html += "<h1>"+incidents[i].id+"</h1>";
			html += "<h1>"+incidents[i].description+"</h1>";
			html += "<h1>"+incidents[i].valor+"</h1>";
			html += "<h1>"+incidents[i].ong+"</h1>";
			i++;
		}
		
		return response.send(html);
	}
};
