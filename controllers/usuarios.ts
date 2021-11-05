import { Request, Response } from 'express';
import Usuario from './../models/usuario';



export const getUsuario = async (req: Request, res:Response)=>{

    try {
        
        const { id } = req.params;

        const usuario = await Usuario.findByPk(id);

        if(!usuario){
            res.status(404).json({
                msg: `No existe usuario con id=${id}`
            });
        }

    res.json(usuario);

    } catch (error: any) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error interno'
        });  
    }

}

export const getUsuarios = async (req: Request, res:Response)=>{


    try {

        const usuarios = await Usuario.findAll();
        res.json({
            usuarios
        });
        
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error interno'
        });
    }


    

}

export const postUsuario = async (req: Request, res:Response)=>{
    
    try {
        
        const { body } = req;
        const { email } = body;

        const usuarioExiste = await Usuario.findOne({ where: { email }});

        if(usuarioExiste){
            return res.status(404).json({
                msg: `Ya existe usuario con email '${email}'`
            }); 
        }

        body.estado = 1;
        const usuario = Usuario.build(body);

        await usuario.save();

        res.json(usuario);

    } catch (error: any) {
        //throw new Error(error); 
        console.log(error);
        return res.status(500).json({
            msg: 'Error interno'
        });
    }

}

export const putUsuario = async (req: Request, res:Response)=>{
    
    try {
        
        const { id } = req.params;

        const { body } = req;

        const usuario = await Usuario.findByPk(id);

        if(!usuario){
            return res.status(404).json({
                msg: `No existe usuario con id=${id}`
            });
        }

        
        await usuario.update(body);

        res.json(usuario);

    } catch (error: any) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error interno'
        }); 
    }
    

}

export const deleteUsuario = async (req: Request, res:Response)=>{
    

    try {
        
        const { id } = req.params;
    
        const usuario = await Usuario.findByPk(id);

        if(!usuario){
            return res.status(404).json({
                msg: `No existe usuario con id=${id}`
            });
        }

        //Fisico
        //await usuario.destroy();

        //Logico
        await usuario.update({estado: 0});

        res.json({msg: `usuario id: ${id} borrado`});

    } catch (error: any) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error interno'
        }); 
    }

    

}