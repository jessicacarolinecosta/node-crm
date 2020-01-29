module.exports = (app) => {
    const { usuario } = app.controllers;
    const { autenticacao } = app.middlewares;    

    app.post('/api/v1/user/login', usuario.login);
    app.get('/api/v1/user/logout', usuario.logout);
    app.post('/api/v1/user', autenticacao.verificaJWT, usuario.get);
    app.post('/api/v1/user/search', autenticacao.verificaJWT, usuario.search);

    app.post('/api/v1/user/list', autenticacao.verificaJWT, usuario.list);
    app.post('/api/v1/user/create', usuario.create);
};