import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Channel, ChannelService } from '../services/channel.service';
import { User, UserService } from '../services/user.service';
import { Message, MessageService } from '../services/message.service';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';

export interface SearchSolution {
  channels: Channel[],
  messages: Message[],
  threads: Message[],
  users: User[],
}

export interface SearchSolutionUser {
  users: any[]
}

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  @Input() searchType!: 'search' | 'user-search';
  @Input() userSelection: User[] = [];
  @Output() selectedUsers = new EventEmitter<User[]>();
  
  searchValue: string = '';
  placeholder!: string;
  showResults: boolean = false;
  searchSolution: SearchSolution = {
    channels: [],
    messages: [],
    threads: [],
    users: [],
  };
  searchSolutionUser: SearchSolutionUser = {
    users: [],
  }

  constructor(
    private http: HttpClient,
    public userService: UserService,
    public channelService: ChannelService,
    public messageService: MessageService,
  ) {
    this.setupClickListener();  
  }

  private setupClickListener() {
    document.addEventListener('click', () => {
      this.showResults = false;
    });
  }

  ngOnInit(): void {
    this.placeholder = this.searchType === 'search' ? 'Search' : 'Search members';
  }

  triggerSearch() {
    if (this.searchIsValid())
      this.search();
  }

  async search() {
    const url = environment.baseUrl + this.searchType;
    const data = {
      search_value: this.searchValue
    }
    if (this.searchType === 'search') {
      this.searchSolution = await firstValueFrom(this.http.post(url, data)) as SearchSolution;
    } else {
      this.searchSolutionUser = await firstValueFrom(this.http.post(url, data)) as SearchSolutionUser;
    }
  }

  searchIsValid() {
    return this.searchValue.trim().length > 1;
  }

  stopProp($event: Event) {
    $event.stopPropagation();
  }

  selectUser(user: User) {
    if (this.userSelection.includes(user)) {
      this.userSelection.splice(this.userSelection.indexOf(user), 1);
    } else {
      this.userSelection.push(user);
    }
    this.selectedUsers.emit(this.userSelection);
  }
}