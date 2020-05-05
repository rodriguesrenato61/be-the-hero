const express = require('express');//importando o express
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');//importando as rotas


const app = express();//instaciando um objeto da classe do express

app.use(cors());
app.use(express.json());
app.use(routes);//usando as rotas
app.use(errors());

module.exports = app;
