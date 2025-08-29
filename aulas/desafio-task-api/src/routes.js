import { Database } from "./database.js"
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from "./utils/build-route-path.js"

const database = new Database()

export const routes = [

    {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {

        const tasks = database.select('tasks')

        return res
            .writeHead(200)
            .end(JSON.stringify(tasks))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { title, description } = req.body

            if(!title || !description){
                return res
                    .writeHead(404)
                    .end(new Error('Missing required fields'))
            }

            const tasks = {
                id: randomUUID(),
                title,
                description,
                completed_at: null,
                created_at: new Date(),
                updated_at: null
            }

            database.insert('tasks', tasks)

            return res.writeHead(201).end(tasks.id)
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {

            const { id } = req.params
            const { title, description } = req.body

            const updated_at = new Date()

            const task = database.findByID('tasks', id)


            if ((title && description) || !title && !description) {
                return res.writeHead(400).end(JSON.stringify({
                    error: 'Envie pelo menos um campo: title OU description'
                }))
            }

            if(!task.id) {
                return res.writeHead(400).end(JSON.stringify({
                    error: 'Task not found'
                }))
            }

            const update = {
                ...task,
                ...(description ? { description } : {}),
                ...(title ? { title }: {}),
                updated_at
            }

            database.update('tasks', update, id)

            return res.writeHead(204).end()

        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params

            const task = database.findByID('tasks', id)

            if(!task.id) {
                return res.writeHead(400).end(JSON.stringify({
                    error: 'Task not found'
                }))
            }

            database.delete('tasks', id)
            
            return res
                .writeHead(204)
                .end()
        }
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
        handler: (req, res) => {

            const { id } = req.params

            const task = database.findByID('tasks', id)

            if(task.id) {

                const { completed_at } = task

                const update = {
                    ...task,
                    completed_at: completed_at ?? true
                }

                database.update('tasks', update, id)

                return res.writeHead(204).end()
            }

            return res
                .writeHead(404)
                .end()
        }
    }

]