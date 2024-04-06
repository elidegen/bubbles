import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Channel } from '../services/channel.service';
import { User } from '../services/user.service';
import { Message } from '../services/message.service';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SearchResultsComponent } from '../search-results/search-results.component';

export interface SearchSolution {
  channels: Channel[],
  messages: Message[],
  threads: Message[],
  users: User[],
}

export interface SearchSolutionUser {
  users: User[]
}

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule, SearchResultsComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  @Input() searchType!: 'search' | 'user-search';
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
      // console.log('searchSolution', this.searchSolution);
    } else {
      this.searchSolutionUser = await firstValueFrom(this.http.post(url, data)) as SearchSolutionUser;
      // console.log('searchSolutionUser', this.searchSolutionUser);
    }
  }

  searchIsValid() {
    return this.searchValue.trim().length > 1;
  }

  stopProp($event: Event) {
    $event.stopPropagation();
  }
}