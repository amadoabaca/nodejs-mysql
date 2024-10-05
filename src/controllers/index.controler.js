//controladores para ordenar las funciones de las rutas
import {pool} from '../db.js'

export const ping = async (req,res) => {
    //probando conexion con mysql
    const [result] = await pool.query('SELECT "pong" AS result')
    res.json(result[0]);
}