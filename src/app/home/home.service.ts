import { Injectable } from '@angular/core';
import { HomePage } from './home.page';
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message } from './message.interface';

@Injectable({
  providedIn: 'any'
})
export class HomeService {
  private socket: Socket;
  private messages$: BehaviorSubject<Message>;

  constructor() {
    this.messages$ = new BehaviorSubject<Message>(null);
  }

  connect() {
    this.socket = io('http://localhost:9000');
    this.listenMessages();
  }

  sendMessage(msg: Message) {
    this.socket.emit('message', msg);
  }

  getMessages(): Observable<Message> {
    return this.messages$.asObservable();
  }

  private listenMessages() {
    this.socket.on('newMessages', (data) => {
      this.messages$.next(data);
    });
  }
}
