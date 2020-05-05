
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const whatsapp = document.querySelector('#whatsapp');
const city = document.querySelector('#city');
const uf = document.querySelector('#uf');
const form = document.querySelector('#form');
const ul = document.querySelector('#dados');

form.addEventListener('submit', function(event){
	event.preventDefault();
	let dados = {
		name: name.value,
		email: email.value,
		whatsapp: whatsapp.value,
		city: city.value,
		uf: uf.value
	};
	
	fetch('http://localhost:3333/ongs', {
		method: 'POST',
		body: JSON.stringify(dados)
	}).then(function(response){
		return response.json();
	}).then(function(response){
		ul.innerHTML = response;
	});
	
});
