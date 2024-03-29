import { Request, Response } from "express";
import Usuario from "../models/usuario";

export const getUsuarios =async (req:Request, res:Response) =>{
    const usuarios = await Usuario.findAll()
    res.json({
        msg:'GetUsuarios',
        usuarios
    })
}
export const getUsuario = async(req:Request, res:Response) =>{
    const {id} = req.params
    const usuario = await Usuario.findByPk(id)
    if(usuario){
        res.json(usuario)
    }else{
        res.status(404).json({
            msg:`NO existe un usuario con el id ${id}`
        })
    }
   
}
export const postUsuarios =async (req:Request, res:Response) =>{
    const {body} = req
    try {
        const existEmail = await Usuario.findOne({
            where:{
                email:body.email
            }
        })
        if(existEmail){
            return res.status(400).json({
                msg:`Ya existe un usuario con el email: ${body.email}`
            })
        }
        const usuario = await Usuario.create(body)       
        res.json(usuario)
    } catch (error) {
        res.status(500).json({
            msg:`Error de servidor`
        })
    }
   
}
export const putUsuarios = async (req:Request, res:Response) =>{
    const {id} = req.params
    const {body} = req
    try {
        const usuario = await Usuario.findByPk(id)
        if(!usuario){
            return res.status(400).json({
                msg:`No existe un usuario con el id: ${id}`
            })
        }
        await usuario.update(body)       
        res.json(usuario)
    } catch (error) {
        res.status(500).json({
            msg:`Error de servidor`
        })
    }
}
export const deleteUsuarios = async(req:Request, res:Response) =>{
    const {id} = req.params
    try {
        const usuario = await Usuario.findByPk(id)
        if(!usuario){
            return res.status(400).json({
                msg:`No existe un usuario con el id: ${id}`
            })
        }
       await usuario.update({estado:false}) //eliminacion logica
       // await usuario.destroy()       //eliminacion fisica
        res.json(usuario)
    } catch (error) {
        res.status(500).json({
            msg:`Error de servidor`
        })
    }
}