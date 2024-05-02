const http = require('http');

const host = 'localhost';
const porta = 3000;

function responderRequisicao(requisicao, resposta) {
  if (requisicao.method === 'GET') {
    const dados = new URLSearchParams(requisicao.url);
    const tabuada = dados.get('tabuada');

    resposta.setHeader('Content-Type', 'text/html');
    resposta.write(`
      <!DOCTYPE html>
      <html lang="pt-br">
      <head>
        <meta charset="UTF-8">
        <title>Tabuada</title>
      </head>
      <body>
    `);

    if (tabuada != null) {
      resposta.write(`<div><h1>Tabuada do ${tabuada}</h1>`);
      for (let i = 1; i <= 10; i++) {
        const res = tabuada * i;
        resposta.write(`<p>${tabuada} x ${i} = ${res}</p>`);
      }
      resposta.write('</div>');
    } else {
      resposta.write("<h1>Digite na URL http://localhost:3000?tabuada=um_numero</h1>");
    }

    resposta.write('</body></html>');
    resposta.end();
  }
}

const servidor = http.createServer(responderRequisicao);

servidor.listen(porta, host, () => {
  console.log('Servidor funcionando!!');
});
