import { SetupServer } from "./bootstrap";

const PORT = 3500;
const server = new SetupServer(PORT);
server.init();
server.setupErrorHandler()
server.start();