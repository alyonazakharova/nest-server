import { Injectable } from '@nestjs/common';

@Injectable()
export class SocketService {
  handleMessage(payload: any) {
    console.log(`Received message:`, payload);
  }
}
