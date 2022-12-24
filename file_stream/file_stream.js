import http from 'node:http'
import * as fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const server = http.createServer((req, res) =>{
      const stream = fs.createReadStream(__dirname + '/package.json')
      stream.pipe(res)
})

server.listen(8000)