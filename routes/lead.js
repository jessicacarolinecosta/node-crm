module.exports = (app) => {
    const { lead } = app.controllers;
    const { autenticacao } = app.middlewares;

    app.post('/api/v1/lead', autenticacao.verificaJWT, lead.get);
    app.post('/api/v1/lead/create', autenticacao.verificaJWT, lead.save);
    app.post('/api/v1/lead/update', autenticacao.verificaJWT, lead.update);
    app.post('/api/v1/lead/remove', autenticacao.verificaJWT, lead.delete);
};