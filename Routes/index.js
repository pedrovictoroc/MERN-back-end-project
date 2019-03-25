const express = require('express'); //chamada do Express
const router = express.Router(); //instanciando o Router do Express
const auth = require('../middlewares/auth');

router.get('/', auth, (req,res) => {
    console.log(res.locals.auth_data);
    return res.send({message: 'Tudo ok com o metodo GET da raiz'});
});

router.post('/',(req,res) => {
    return res.send({message: 'Tudo ok com o metodo POST da raiz'});
});

module.exports = router;