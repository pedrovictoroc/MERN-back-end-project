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

router.get('/removeitem', async (req,res) =>{
    let search = req.query;     //provisoriamente usa a query para buscar o nome do produto a ser deletado
                                //usar /?nome='nome do produto'
    let nomeProduto = search.nome;

    if(!nomeProduto){  //Se não existir informação suficiente
        return res.send({error: 'Sem nome para deletar item'});
    }

    try{
        if(await !Itens.findOne({nomeProduto})){   //Se não existir o produto
            return res.send({error: 'Produto inexistente'});
        }

        const deletar = await Itens.deleteOne({nome: nomeProduto}); //Se funcionar deletarei
        return res.send(deletar);

    } catch (err){      //Demais erros
        return res.send({error: err});
    }

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

router.get('/updateitens',async (req,res,opção)=>{
    let search = req.query;
    let idProduto = search.id;//Usar id para a query

    if(!idProduto){     //Se o id não for informado retorno erro
        return res.send({error: 'ID não informado'});
    }

    try{
        if(await !Itens.findOne({"_id": idProduto})){   //Não localizar o ID
            return res.send({error: "Produto inexistente"});
        }
        atualizar = await Itens.findOne({"_id": idProduto});
        //return res.send({atualizar});
        
        switch(opção){
            case 1:
                //Update nome
                break;
            case 2:
                //Update quantidade
                break;
            case 3:
                //Update preço
                break;
            case 4:
                //Update caracteristicas
                break;
        }
        
    
    } catch(err){   //Erros gerais relacionado ao ID
        return res.send({error: 'ID inexistente'});
    }

});

module.exports = router;