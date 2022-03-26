import {Router} from 'express'
import { deleteUsuarios, getUsuario, getUsuarios, postUsuarios, putUsuarios } from '../controllers/usuarios'
const router = Router()

router.get('/', getUsuarios)
router.get('/:id', getUsuario)
router.post('/', postUsuarios)
router.put('/:id', putUsuarios)
router.delete('/:id', deleteUsuarios)
export default router