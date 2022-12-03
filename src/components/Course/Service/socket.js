import io from "socket.io-client";
// import { SOCKET_URL } from "config";

// const socket = io.connect(process.env.REACT_APP_SERVER)
// const socket = io.connect(process.env.REACT_APP_SERVER)
export const socket = io.connect(process.env.REACT_APP_SERVER);