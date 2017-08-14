'use strict';

var VIA_CEP = "https://viacep.com.br/ws/";

var request = require('request');

module.exports = ViaCepWs;

function ViaCepWs() {}

ViaCepWs.prototype.url = VIA_CEP;

ViaCepWs.prototype.validaCep = function(valor) {
	
	var cep = valor.replace(/\D/g, '');
	
	if ( cep != "" ) {	
		var ptt = /^\d{8}$/;
		if ( ptt.test(cep) ) {
			return cep;
		} else {
			return "CEP Inválido. O CEP deve conter somente 8 dígitos.";
		}
	} else {
		return "CEP Inválido. O CEP deve conter somente dígitos.";
	}

}

ViaCepWs.prototype.getCep = function(obj,callback){

	var cep = this.validaCep(obj.cep);
	
	var ptt = /^\d{8}$/;
	if ( ptt.test(cep) ) {

		var getUrl = this.url+cep+"/json/";
		
		request(getUrl, function (error, response, body) {
			callback(error,body)
		});

	} else {
		callback(true,cep);
	}
	
}

ViaCepWs.prototype.getEndereco = function(obj,callback){
	
	var params = obj.estado +"/"+ obj.cidade +"/"+ obj.rua;
	var getUrl = this.url+params+"/json/";

	request(getUrl, function (error, response, body) {
		callback(error,body)
	});

}