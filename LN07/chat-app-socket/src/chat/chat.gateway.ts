import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger = new Logger('ChatGateway');
  private connectedClients = new Set<string>();

  handleConnection(client: Socket) {
    this.connectedClients.add(client.id);

    // Log connection details
    this.logger.log(`Client connected: ${client.id}`);
    this.logger.debug(`Connection details:
      - Socket ID: ${client.id}
      - IP Address: ${client.handshake.address}
      - User Agent: ${client.handshake.headers['user-agent']}
      - Time: ${new Date().toISOString()}
    `);

    // Broadcast current number of connected clients
    const connectedCount = this.connectedClients.size;
    this.server.emit('clientCount', connectedCount);

    // Send welcome message to the new client
    client.emit('message', 'Welcome to the chat!');

    // Notify others that a new user has joined
    client.broadcast.emit(
      'message',
      `A new user has joined! (ID: ${client.id})`,
    );
  }

  handleDisconnect(client: Socket) {
    this.connectedClients.delete(client.id);

    // Log disconnection
    this.logger.log(`Client disconnected: ${client.id}`);

    // Update connected clients count
    const connectedCount = this.connectedClients.size;
    this.server.emit('clientCount', connectedCount);

    // Notify others that a user has left
    this.server.emit('message', `A user has left the chat (ID: ${client.id})`);
  }

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() message: string,
    @ConnectedSocket() client: Socket,
  ): void {
    // Log the message
    this.logger.debug(`Message from ${client.id}: ${message}`);

    // Broadcast message with client ID
    this.server.emit('message', `User ${client.id}: ${message}`);
  }

  // Method to get current number of connected clients
  getConnectedClientsCount(): number {
    return this.connectedClients.size;
  }
}
