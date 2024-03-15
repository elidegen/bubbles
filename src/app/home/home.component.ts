import { Component } from '@angular/core';
import { DummyService } from '../services/dummy.service';
import { MessageComponent } from '../message/message.component';
import { ChannelPreviewComponent } from '../channel-preview/channel-preview.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MessageComponent, ChannelPreviewComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(public ds: DummyService) {

  }
}
