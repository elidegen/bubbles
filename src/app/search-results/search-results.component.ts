import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SearchSolution, SearchSolutionUser } from '../search/search.component';
import { CommonModule } from '@angular/common';
import { User, UserService } from '../services/user.service';
import { ChannelService } from '../services/channel.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss'
})
export class SearchResultsComponent implements OnInit {
  @Input() searchSolution!: SearchSolution;
  @Input() searchSolutionUser!: SearchSolutionUser;
  @Input() searchType!: 'search' | 'user-search';
  @Output() selectedUsers = new EventEmitter<User[]>();

  userSelection: User[] = [];

  constructor(
    public userService: UserService,
    public channelService: ChannelService,
    public messageService: MessageService,
  ) { }

  ngOnInit(): void {
    // console.log('searchtype', this.searchType);

    // console.log('solution', this.searchSolution);
    // console.log('solutionUser', this.searchSolutionUser);
  }

  selectUser(user: User) {
    console.log('before', this.userSelection);
    if (this.userSelection.includes(user)) {
      this.userSelection.splice(this.userSelection.indexOf(user), 1);
      console.log(this.userSelection);
    } else {
      this.userSelection.push(user);
      console.log(this.userSelection);
    }
    this.selectedUsers.emit(this.userSelection);
  }
}