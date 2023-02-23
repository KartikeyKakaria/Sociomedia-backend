import { config } from "dotenv";
import { join } from "path"
config({ path: join(__dirname, '../../config.env') })
const { NODE_ENV, PORT, DB, SECRET_KEY } = process.env
const serverProps = {
    server: {
        env: NODE_ENV || 'development',
        port: Number(PORT || 8000),
    },
    db: DB || 'mognodb://127.0.0.1/sociomedia',
    auth: {
        key: SECRET_KEY || 'somerandomsecretkeythatisyourfavourite:)getit'
    }
}
export default serverProps