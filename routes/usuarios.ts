
import { Router } from 'express';
import { getUsuarios, getUsuario, postUsuario, putUsuario, deleteUsuario } from '../controllers/usuarios';
import { check } from 'express-validator';
import validarCampos from './../middlewares/validar-campos';




const router = Router();

router.get('/', getUsuarios);


router.get('/:id', [    
    check('id','El id debe ser numérico').isNumeric(),
    validarCampos
], getUsuario);


router.post('/', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').not().isEmpty(),
    check('email','El email no es válido').isEmail(),    
    validarCampos
], postUsuario);


router.put('/:id', [
    check('id','No hay id').not().isEmpty(),
    check('id','El id debe ser numérico').isNumeric(),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], putUsuario);


router.delete('/:id', [
    check('id','No hay id').not().isEmpty(),
    check('id','El id debe ser numérico').isNumeric(),
    validarCampos
], deleteUsuario);







export default router;