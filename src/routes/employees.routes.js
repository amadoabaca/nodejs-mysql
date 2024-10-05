import { Router } from "express";
import { getEmployees, getEmployee, createEmployees, updateEmployees, deleteEmployees } from "../controllers/employees.controler.js";


const router = Router();

//rutas - endpoints - ruta en controladores, cuando ejecute el get en /employees, ejecuta esa funcion
router.get('/employees', getEmployees)

router.get('/employees/:id', getEmployee)  

router.post('/employees', createEmployees)

router.patch('/employees/:id', updateEmployees) //patch actualiza algunos datos, put actualiza todo

router.delete('/employees/:id', deleteEmployees)

export default router