const { Router} = require('express');
const { check } = require('express-validator');
// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');

const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole
} = require('../middlewares');

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const router = Router();

router.get('/', usuariosGet);

router.post('/',[
    //Definir un middleware
    //Revisa el correo
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(emailExiste),
    check('password', 'El password es obligatorio y más de 6 caracteres').isLength({min: 6}),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    //Se verifica el rol en la base de datos
    check('rol').custom(esRoleValido),
    //Llamamos al middleware personalizado
    validarCampos
], usuariosPost);
router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    //Se verifica el rol en la base de datos
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPut);
router.delete('/:id',[
    validarJWT,
    //Valida si un usuario es administrador
    //esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);
router.patch('/', usuariosPatch);

module.exports = router;