import { Component } from '@angular/core';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-add-members',
  standalone: true,
  imports: [],
  templateUrl: './add-members.component.html',
  styleUrl: './add-members.component.scss'
})
export class AddMembersComponent {

  constructor(
    public mainService: MainService,
  ) { }

}
