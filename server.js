var express = require('express');
var request = require('request');
var app = express();

// WS do CEP
var ViaCepWs = require('./ViaCepWs');
var ViaCepWs = new ViaCepWs();

// Mensagens
var Message = require('./Message');


//Define o ROUTER
var apiRoutes = express.Router();

// Rotas
app.get('/', function (req, res) {
	res.send('Bem vindo ao CEP API');
});

apiRoutes.get('/', function(req, res) {
	res.json({
		message: 'Bem vindo ao CEP API' 
	});
});

apiRoutes.get('/cep/:cep', function(req, res) {

	ViaCepWs.getCep(req.params,function(err,data){

		var data = JSON.parse(data);

		if ( !err ) {

			if ( !data.erro ) {

				var bla = new Message();
				
				bla.setCode('000');
				bla.setContent(data);
				
				res.send(bla.buildMessage());

			} else {
				
				var bla = new Message();
				bla.setCode('003');
					
				res.send(bla.buildMessage());

			}

		} else {
			
			var bla = new Message();
			
			bla.setCode('999');

			var obj = {
				message : data
			}

			bla.setContent(obj);

			res.send(bla.buildMessage());

		}
	});
	
});

apiRoutes.get('/endereco/:estado/:cidade/:rua', function(req, res) {

	ViaCepWs.getEndereco(req.params,function(err,data){
		if ( !err ) {
			
			var bla = new Message();
			
			bla.setCode('000');
			bla.setContent(JSON.parse(data));
			
			res.send(bla.buildMessage());

		}
	});

});

app.use('/api',apiRoutes);

// 404
app.use(function(req, res) {
	
	var bla = new Message();

	bla.setCode('888');
	bla.setMessage('Rota não existente');

	var response = bla.buildMessage();

	res.json(response);

});

app.listen(8080);