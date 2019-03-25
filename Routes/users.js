const express = require('express'); //chamada do Express
const router = express.Router(); //instanciando o Router do Express
const Users = require('../Routes/model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//FUNÇÕES AUXILIARES TOKEN

const createUserToken = (userId) =>{
    return jwt.sign({ id: userId }, 'A6h5>j2k5<l45j@a8d8_a9ç3', {expiresIn: '7d'});
}

router.get('/', async(req,res) =>{
    try{
        const users = await Users.find({});
        return res.send(users);
    } catch (err){
        return res.send({error: 'Erro na consulta de usuarios!'});
    }
});

router.post('/create', async (req, res) =>{
    //const object = req.body; forma antiga
    const {email, password} = req.body; //forma mais utilizada atualmente, já que email e password são os unicos que podem ser passados

    //erro se não tiver ou email ou senha
    if( !email || !password){
        return res.send({ error: 'Dados insuficientes! '});
    }

    try{
        if (await Users.findOne({email})){   //Se existir User com esse email retorno erro
            return res.send({error: 'Usuario já registrado!'});
        }
        //Se não aconteceu erros, agora criarei conta
        const user = await Users.create(req.body);
        user.password = undefined;
        
        return res.send({user, token: createUserToken(user.id)}); //retorno dados

    } catch (err) {   //se ocorrer erro na busca de um usuario já existente retorna erro
        return res.send({ error : 'Erro ao buscar usuario'});
    }
});

router.post('/auth', async (req,res)=>{
    const {email,password} = req.body;

    if(!email || !password){    //se não for informado email ou senha
        return res.send({error: 'Dados insuficientes'});
    }

    try{
        const user = await Users.findOne({email}).select('+password');
        
        if(!user){  //Se usuario não estiver registrado
            return res.send({error: 'Usuario não registrado!'});            
        }

        const pass_ok = await bcrypt.compare(password,user.password);

        if(!pass_ok){   //se não for a mesma senha
            return res.send({error: 'Erro ao autenticar usuario'});
        }

        user.password = undefined;
        return res.send({user, token: createUserToken(user.id)});

    } catch (err) {    //se email não for encontrado
        return (res.send({error: 'Erro ao buscar usuario!'}));
    }
});

module.exports = router;