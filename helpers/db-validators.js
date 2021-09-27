const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async(rol='') =>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no está registrado en la base de datos`);
    }
}

const emailExiste = async(correo='')=>{
    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({correo:correo});
    if(existeEmail){
        // return res.status(400).json({
        //     msg: 'Ese correo ya está registrado'
        // });
        throw new Error(`El correo ${correo} ya está registrado`);
    }
}

const existeUsuarioPorId = async(id)=>{
    //Verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        // return res.status(400).json({
        //     msg: 'Ese correo ya está registrado'
        // });
        throw new Error(`El id ${ id } no existe`);
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
};