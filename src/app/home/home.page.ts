import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Message } from './message.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  messages: Message[] = [];
  currentMsg: Message;

  constructor(
    private homeService: HomeService
  ) {
    this.currentMsg = this.getDefaultMessage();
  }

  ngOnInit() {
    this.homeService.connect();
    this.getMessages();
  }

  submit() {
    if (this.currentMsg.text.length) {
      this.homeService.sendMessage(this.currentMsg);
      this.currentMsg = this.getDefaultMessage();
    }

  }

  private getMessages() {
    this.homeService.getMessages()
      .subscribe((message) => {
        this.messages.push(message);
      });
  }

  private getDefaultMessage(): Message {
    return { text: '', author: 'Matheus' };
  }
}
