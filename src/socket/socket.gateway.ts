/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SocketService } from './socket.service';

@WebSocketGateway(8081)
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly socketService: SocketService) {}

  @WebSocketServer()
  server: Server;

  afterInit(server: any) {
    console.log(`Socket.IO server has been initialized`);
  }

  handleConnection(client: any, ...args: any[]) {
    console.log(`Client connected to server: ${client.id}`);
  }

  handleDisconnect(client: any) {
    console.log(`Client ${client.id} disconncted from server`);
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any) {
    this.socketService.handleMessage(payload);
  }
}
