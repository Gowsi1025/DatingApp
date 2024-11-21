import { Component, computed, inject, input, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { LikesService } from 'src/app/_services/likes.service';
import { PresenceService } from 'src/app/_services/presence.service';

@Component({
    selector: 'app-member-card',
    templateUrl: './member-card.component.html',
    styleUrls: ['./member-card.component.css'],
    standalone: true,
    imports: [NgIf, RouterLink],
})
export class MemberCardComponent {
  private likeService = inject(LikesService);
  private presenceService = inject(PresenceService);
  member = input.required<Member>();
  hasliked = computed(() => this.likeService.likeIds().includes(this.member().id))
  isOnline = computed(() => this.presenceService.onlineUsers().includes(this.member().username));
  
  toggleLike() {
    this.likeService.toggleLike(this.member().id).subscribe({
      next: () => {
        if (this.hasliked()) {
          this.likeService.likeIds.update(ids => ids.filter(x => x !== this.member().id))
        }
        else {
          this.likeService.likeIds.update(ids => [...ids, this.member().id])
        }
      }
    })
  }
}
