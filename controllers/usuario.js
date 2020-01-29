module.exports = (app) => {
    const jwt = require('jsonwebtoken');
    const { usuario } = app.models;
    const bcrypt = require('bcrypt-nodejs');
    const { logs, retorno } = app.middlewares;

    const usuarioService = {
        login(req, res) {
            const login = req.body.login;
            const senha = req.body.password;

            usuario.findOne({ login: login })
                .then(data => {
                    const usuarioRetorno = data ? data.toObject() : null;
                    if (usuarioRetorno && bcrypt.compareSync(senha, usuarioRetorno.password)) {
                        const token = jwt.sign({ usuarioId: usuarioRetorno._id }, process.env.SECRET, {
                            expiresIn: 600
                        });
                        retorno.envia(res,200,true,null,null,{ success: true, token: token });
                    } else {
                        retorno.envia(res,400,false,null,null,{ success: false, erro:"Login Inválido" });
                    }
                }).catch(erro => {
                    logs.log('error', erro);
                    retorno.envia(res,400,false,null,null,erro);
                });
        },
        logout(req, res) {
            retorno.envia(res,200,true,null,null,{ success: true, auth: false, token: null });
        },
        get(req, res) {
            usuario.findById(req.body.id)   
                .then(data => {
                    retorno.envia(res,200,false,null,null,data);
                }).catch(erro => {
                    logs.log('error', erro);
                    retorno.envia(res,400,false,null,null,erro);
                });
        },
        search(req, res) {
            usuario.findOne({ login: req.body.login })
                .then(dataConta => {
                    if(dataConta) {
                        retorno.envia(res,200,false,null,null,dataConta);
                    } else {
                        retorno.envia(res,400,false,'','Nenhum usuário encontrado',null);
                    }
                }).catch(erro => {
                    logs.log('error', erro);
                    retorno.envia(res,400,false,erro,'Falha ao buscar Usuario',null);
                });
        },
        list(req, res) {
            usuario.find({}, { dsSenha: 0 })
            .then(data => {
                retorno.envia(res,200,true,null,null,data);
            }).catch(erro => {
                logs.log('error', erro);
                retorno.envia(res,400,false,null,null,erro);
            });
        },
        create(req, res) {
            var novoUsuario = new usuario();
            novoUsuario.name = req.body.name;
            novoUsuario.login = req.body.login
            novoUsuario.email = req.body.email

            if (req.body.password) {
                novoUsuario.password = bcrypt.hashSync(req.body.password);

                novoUsuario.save()
                    .then(x => { 
                        retorno.envia(res,200,true,'','Usuario cadastrado com sucesso!',null);
                    }).catch(erro => {
                        logs.log('error', erro);
                        retorno.envia(res,400,false,erro,'Falha ao cadastrar o Usuario!',null);
                    });
            } else {
                logs.log('error', `"${req.method} ${req.url}" 400 (erro: Senha invalida)`);
                retorno.envia(res,400,false,null, null,{ success: false, erro:"Senha inválida" });
            }
        }
    };
    return usuarioService;
};