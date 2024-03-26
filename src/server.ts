import App from "./app";
import 'dotenv/config'

const port = Number(process.env.TRANSCODER_PORT)
new App().startServer(port);

