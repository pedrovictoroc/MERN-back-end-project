const express = require('express');
const router = express.Router();
const Itens = require('../Routes/model/item');

router.get('/showitens', async (req,res) => {
    try{
        const itens = await Itens.find({});
        return res.send(itens);

    } catch(err){   //Se ocorrer qualquer erro na busca do banco de dados
        return res.send({error: 'error: '+err});
    }
});

router.post('/removeitem', async (req,res) =>{
    const {nome, quantidade, preço, caracteristicas} = req.body;

    
});

router.post('/createitens', async (req,res) =>{
    const {nome, quantidade, preço, caracteristicas} = req.body;    //atribuições no vetor

    if(!nome || !quantidade || !preço || !caracteristicas){     //se não tiver dados suficientes
        return res.send({error: 'Dados insuficientes, por favor, complete as informações!'});
    }

    try{
        if(await Itens.findOne({nome})){     //Se já existir esse item cadastrado na loja
            return res.send({error: 'Item já inserido na loja'});
        }
        //Se não ocorreu erros criarei
        const item = await Itens.create(req.body);

        return res.send({item});    //retorna dados inseridos

    } catch (err){
        res.send({error: 'erro: '+ err});   //Alerta para qualquer possivel erro
    }
});

module.exports = router;