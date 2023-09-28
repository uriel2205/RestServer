const { Router } = require('express');
const { check } = require('express-validator');


const { validarJWT, validarCampos, esAdminRole, tieneRole } = require('../middlewares');
const { crearCategoria, categoriasGet, categoriaPut, categoriaDelete } = require('../controllers/categorias');
const { existeCategoria } = require('../helpers/db-validators');

const router = Router();

/** 
 * {{url}}/api/categorias
*/

// Obtener todas las categorias - publico
router.get('/', categoriasGet);

// Obtener una categoria por id - publico
router.get('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos
], categoriasGet);
// Crear categoria - privado - cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);
//Actualizar - privado - cualquiera con token valido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoria),
    validarCampos
], categoriaPut);

// Borrar una categoria - Admin
router.delete('/:id',[
    validarJWT,
        esAdminRole,
        tieneRole('ADMIN_ROLE'),
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existeCategoria),
        validarCampos
], categoriaDelete);
module.exports = router;