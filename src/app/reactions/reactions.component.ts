import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-reactions',
  standalone: true,
  imports: [],
  templateUrl: './reactions.component.html',
  styleUrl: './reactions.component.scss'
})
export class ReactionsComponent implements OnInit {
  private addedReactionSubscription!: Subscription;
  @Input() addedReaction!: Observable<void>;
  @Input() msgReactions!: any[];
  @Input() myMessage!: boolean;
  allReactions: any[] = [];
  reactionsPreview: any[] = [];
  expandReaction: boolean = false;

  ngOnDestroy() {
    this.addedReactionSubscription.unsubscribe();
  }

  constructor(
    public userService: UserService,
  ) { }

  ngOnInit(): void {
    this.prepareReactions();
    this.addedReactionSubscription = this.addedReaction.subscribe(() => this.prepareReactions());
  }

  prepareReactions() {
    this.allReactions = [];
    this.msgReactions.forEach((reaction) => {
      if (this.allReactions.some(obj => obj.reaction === reaction.emoji)) {
        const index = this.allReactions.findIndex(obj => obj.reaction === reaction.emoji);
        this.allReactions[index].count++;
      } else {
        this.allReactions.push({
          reaction: reaction.emoji,
          count: 1,
        });
      }
    })
    this.sortReactions();
  }

  sortReactions() {
    this.allReactions.sort((a, b) => a.count - b.count);
    this.reactionsPreview = this.allReactions.slice(0, 3);

    this.msgReactions.sort((a, b) => a.user - b.user);
  }
}