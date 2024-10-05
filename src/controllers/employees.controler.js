import { pool } from '../db.js'

//operaciones con la db (api local)
export const getEmployees = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM employee')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'ups'
        })
    }
}

//extrae los datos de la db con un su id
export const getEmployee = async (req, res) => {

    try {
        const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [req.params.id])

        if (rows.length <= 0) return res.status(404).json({
            message: 'Employee not found'
        })

        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'ups'
        })
    }
}

export const createEmployees = async (req, res) => { //las operaciones con las db siempre son asincronas
    try {
        const { name, salary } = req.body
        const [rows] = await pool.query('INSERT INTO employee (name, salary) VALUES (?,?)', [name, salary])
        res.send({
            id: rows.insertId,
            name,
            salary,
        })
    } catch (error) {
        return res.status(500).json({
            message: 'ups'
        })
    }
}

export const deleteEmployees = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM employee WHERE id = ?', [req.params.id])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Employee not found'
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'ups'
        })
    }

}

export const updateEmployees = async (req, res) => {

    try {
        const id = req.params.id
        const { name, salary } = req.body

        const [result] = await pool.query('UPDATE employee SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?', [name, salary, id])

        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Not found'
        })

        const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'ups'
        })
    }

}


