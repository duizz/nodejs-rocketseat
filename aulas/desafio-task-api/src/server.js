import http from 'node:http'
import { json } from './middleware/json.js'
import { routes } from './routes.js'

const server = http.createServer(async (req, res) => {

    const { method, url } = req

    await json(req, res)

    const route = routes.find(index => {
        return index.method === method && index.path.test(url)
    })

    if(route) {
        const routeParams = req.url.match(route.path)

        const { ...params } = routeParams

        req.params = params
        return route.handler(req, res)
    }

    return res
        .writeHead(404)
        .end()
})

server.listen(3333)