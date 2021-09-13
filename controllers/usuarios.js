const {response, request} = require('express');

const usuariosGet = (req = request, res = response)=> {
    //Se obtienen las params
    const query = req.query;
    //const {q, limit} = req.query;

    res.json({
        msg: 'get API - controlador',
        query
    });
};

const usuariosPost = (req, res)=> {
    const {nombre, edad} = req.body;
    res.json({
        msg: 'post API - controlador',
        nombre,
        edad
    });
};

const usuariosPut = (req, res)=> {
    //Se obtiene de la ruta del api
    const id = req.params.id;

    res.json({
        msg: 'put API - controlador',
        id
    });
};


const usuariosDelete = (req, res)=> {
    res.json({
        msg: 'delete API - controlador'
    });
};

const usuariosPatch = (req, res)=> {
    res.json({
        msg: 'patch API - controlador'
    });
};

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
};