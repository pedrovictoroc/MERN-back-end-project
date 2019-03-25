const jwt = require('jsonwebtoken');

const auth = (req,res,next) => {
    const token_header = req.headers.auth;

    if(!token_header){  //usuario tentando acessar informação sem token
        return res.send({error : 'Token nao enviado!'});
    }

    jwt.verify(token_header,'A6h5>j2k5<l45j@a8d8_a9ç3', (err,decoded) =>{
        if (err){
            return res.send({error: 'Token invalido'});
        }
        res.locals.auth_data = decoded; //guarda o token
        return next();
    });
}

module.exports = auth;