import { Component, Input } from '@angular/core';
import { SearchSolution } from '../search/search.component';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { ChannelService } from '../services/channel.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss'
})
export class SearchResultsComponent {
  @Input() searchSolution!: SearchSolution;
  @Input() searchType!: 'search' | 'user-search';

  constructor(
    public userService: UserService,
    public channelService: ChannelService,
    public messageService: MessageService,
  ) { }
}