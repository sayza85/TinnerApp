import { file } from "bun"

let _tls = {}
const mode = Bun.env.Mode || 'production'

if (mode !== 'production') {
    const cert = file("../ssl/localhost.pem")
    const key = file("../ssl/localhost-key.pem")
    _tls = { cert, key }

}
export const tlsConfigs = { ..._tls }