import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Channel, ChannelService } from '../services/channel.service';
import { User, UserService } from '../services/user.service';
import { Message, MessageService } from '../services/message.service';
import { firstValueFrom } from 'rxjs';

interface SearchSolution {
  channels: Channel[],
  messages: Message[],
  threads:Message[],
  users:User[],
}

interface SearchSolutionUser {
  users:User[]
}

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  @Input() searchType: 'search' | 'user-search' | undefined;

  searchValue: string = '';

  searchSolution: SearchSolution = {
    channels: [],
    messages:[],
    threads:[],
    users:[]
  };

  searchSolutionUser: SearchSolutionUser = {
    users: []
  }

  constructor(
    private http: HttpClient,
    public channelService:ChannelService,
    public userService:UserService,
    public messageService:MessageService,
    ) {

  }

  triggerSearch() {
    let url = environment.baseUrl + this.searchType;

    if (this.searchType === "search") {
      this.mainSearch(url);
    } else if (this.searchType === "user-search") {
      this.userSearch(url)
    } 
  }


  async mainSearch(url:string){
    if(!this.searchIsValid()) return;
    const data = {
      search_value: this.searchValue
    }
    this.searchSolution = await firstValueFrom(this.http.post(url, data)) as SearchSolution;
    console.log(this.searchSolution);
  }


  async userSearch(url:string){
    if(!this.searchIsValid()) return;
    const data = {
      search_value: this.searchValue
    }
    this.searchSolutionUser = await firstValueFrom(this.http.post(url, data)) as SearchSolutionUser;
    console.log(this.searchSolutionUser);
  }

  searchIsValid(){    
    return this.searchValue.length > 1;
  }





}
