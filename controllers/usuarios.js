const {response, request} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');


const usuariosGet = async(req = request, res = response)=> {
    //Se obtienen las params
    const {limite = 5, desde = 0} = req.query;
    const query = {estado:true};
    // const usuarios = await Usuario.find(query)
    //     .skip(Number(desde))
    //     .limit(Number(limite));

    // const total = await Usuario.countDocuments(query);

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        // total,
        // usuarios
        total,
        usuarios
    });
};

const usuariosPost = async(req, res)=> {
    
    const {nombre, correo, password, rol} = req.body;
    // const body = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    
    //Guardar en DB
    //Lo guarda en base de datos
    await usuario.save();

    res.json({
        usuario
    });
};

const usuariosPut = async(req, res)=> {
    //Se obtiene de la ruta del api
    const {id} = req.params;
    const {_id, password, google, correo, ...resto} = req.body;

    //Validar contra base de datos
    if(password){
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuarioDB = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        usuarioDB
    });
};


const usuariosDelete = async(req, res)=> {
    const {id} = req.params;
    //Físicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});
    res.json({
        usuario
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