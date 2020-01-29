module.exports = (app) => {
    const { lead } = app.models;
    const { logs, retorno } = app.middlewares;

    const leadService = {
        get(req, res) {
            lead.findById(req.body.id)
                .then(data => {
                    retorno.envia(res, 200, true, null, null, data);
                }).catch(erro => {
                    logs.log('error', erro);
                    retorno.envia(res,400,false,erro,'Falha ao buscar informações do lead',null);
                });
        },
        save(req, res){
            var newLead = new lead();
            newLead.name = req.body.name;
            newLead.email = req.body.email;
            newLead.phone = req.body.phone;
            newLead.state = req.body.state;
            newLead.city = req.body.city;
            newLead.obs = req.body.obs;

            newLead.save()
                .then(x => { 
                    retorno.envia(res,200,true,null,null,{mensagem: 'Lead cadastrado com sucesso!'});
                }).catch(erro => {
                    logs.log('error', erro);
                    retorno.envia(res,400,false,erro,'Falha ao criar lead!',null);
                });
        },
        update(req, res){
            lead.updateOne({ _id: req.body.id }, 
                { 
                    $set: { 
                        name: req.body.name,
                        email: req.body.email,
                        phone: req.body.phone,
                        state: req.body.state,
                        city: req.body.city,
                        obs: req.body.obs,
                    } 
                }).then(x => { 
                    retorno.envia(res,200,true,null,null,{mensagem: 'Lead atualizado com sucesso!'});
                }).catch(erro => {
                    logs.log('error', erro);
                    retorno.envia(res,400,false,erro,'Falha ao atualizar lead!',null);
                });
        },
        delete(req, res){
            lead.remove({ _id: req.body.id }).then(data => {
                    retorno.envia(res,200,true,'','',null);
                }).catch(erro => {
                    logs.log('error', erro);
                    retorno.envia(res,400,false,erro,'Falha ao deletar lead',null);
                });
        }
    };
    return leadService;
};