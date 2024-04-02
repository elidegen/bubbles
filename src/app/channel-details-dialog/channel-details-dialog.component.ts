import { Component } from '@angular/core';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-channel-details-dialog',
  standalone: true,
  imports: [],
  templateUrl: './channel-details-dialog.component.html',
  styleUrl: './channel-details-dialog.component.scss'
})
export class ChannelDetailsDialogComponent {
  editName: boolean = false;
  editDesc: boolean = false;

  constructor(
    public mainService: MainService,
  ) { }
}
