export async function json(req, res) {
    const buffers = []

    //readable stream
    for await (const chunk of req) {
        buffers.push(chunk)
    }

    try {
        //parsing stream into object
        req.body = JSON.parse(Buffer.concat(buffers).toString())
    } catch{
        req.body = null;
    }

    return res
        .setHeader('Content-type', 'application/json')
}