import { CommonModule, NgSwitchCase } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-channel-dialog',
  standalone: true,
  imports: [NgSwitchCase, CommonModule, FormsModule],
  templateUrl: './new-channel-dialog.component.html',
  styleUrl: './new-channel-dialog.component.scss'
})
export class NewChannelDialogComponent {
  addMembers: boolean = true;
  addAllMembers: boolean = false;
}