import * as io from "socket.io-client";

export class Socket {
    static readonly URL = "http://localhost:8080";

    private socket: SocketIOClient.Socket;

    connect(): void {
        this.socket = io(Socket.URL);
    }

    getSocket(): SocketIOClient.Socket {
        return this.socket;
    }
}
