import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Channel, ChannelService } from '../services/channel.service';
import { User, UserService } from '../services/user.service';
import { Message, MessageService } from '../services/message.service';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

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
  currentUserId: number = 0;
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
    private authService: AuthService
  ) {
    this.setupClickListener();
    this.currentUserId = this.authService.currentUser.id;
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
      search_value: this.searchValue.trim(),
      current_user: this.currentUserId
    }
    if (this.searchType === 'search') {
      this.searchSolution = await firstValueFrom(this.http.post(url, data)) as SearchSolution;

    } else {
      this.searchSolutionUser = await firstValueFrom(this.http.post(url, data)) as SearchSolutionUser;
    }
    console.log('searchSol', this.searchSolutionUser);
    console.log('userSel', this.userSelection);
  }

  searchIsValid() {
    return this.searchValue.trim().length > 0;
  }

  stopProp($event: Event) {
    $event.stopPropagation();
  }

  selectUser(user: User, event: Event) {

    if (this.userSelection.some(obj => obj.id === user.id)) {
      const index = this.userSelection.findIndex(obj => obj.id === user.id);
      this.userSelection.splice(index, 1);      
    } else {
      this.userSelection.push(user);
    }
    if (event.currentTarget) {
      const previewElement = event.currentTarget as HTMLElement;
      previewElement.classList.toggle('selected-user');
    }
    this.selectedUsers.emit(this.userSelection);
  }

  isChannel(msg: Message) {
    return this.channelService.getChannel(msg.source);
  }

  alreadySelected(userId: number) {
    return this.userSelection.includes(this.userService.getUser(userId));
  }
}