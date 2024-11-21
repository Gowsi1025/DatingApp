import { Component,  inject,  NgModule,  OnDestroy,  OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { TabDirective, TabsetComponent, TabsModule } from 'ngx-bootstrap/tabs';
import { CommonModule, DatePipe, NgIf } from '@angular/common';
import { TimeagoModule } from 'ngx-timeago';
import { MemberMessagesComponent } from '../member-messages/member-messages.component';
import { Message } from 'src/app/_models/message';
import { MessagesService } from 'src/app/_services/messages.service';
import { PresenceService } from 'src/app/_services/presence.service';
import { AccountService } from 'src/app/_services/account.service';

@Component({
    selector: 'app-member-detail',
    templateUrl: './member-detail.component.html',
    styleUrls: ['./member-detail.component.css'],
    standalone: true,
    imports: [GalleryModule,TabsModule, CommonModule, TimeagoModule, DatePipe, MemberMessagesComponent]
})
export class MemberDetailComponent implements OnInit, OnDestroy{
 @ViewChild('memberTabs', {static: true}) memberTabs?: TabsetComponent;
 private messageService = inject(MessagesService);
 private accountService = inject(AccountService);
 presenceService = inject(PresenceService);
 private route = inject(ActivatedRoute);
 member: Member = {} as Member;
 images :GalleryItem[] = [];
 activeTab?: TabDirective;

 
  

  ngOnInit(): void {
    this.route.data.subscribe({
      next: data => {
        this.member = data['member'];
        this.member && this.member.photos.map(p=> {
          this.images.push(new ImageItem({src: p.url, thumb: p.url}))
        })
      }
    })

    this.route.queryParams.subscribe({
      next: params => {
        params['tab'] && this.selectTab(params['tab'])
      }
    })
  }


  selectTab(heading: string){
    if (this.memberTabs) {
      const messageTab = this.memberTabs.tabs.find(x => x.heading === heading);
      if (messageTab) messageTab.active = true;
    }
  }

  onTabActivated(data: TabDirective){
    this.activeTab = data;
    if (this.activeTab.heading === 'Messages' && this.member) {
      const user = this.accountService.currentUser();
      if(!user) return;
      this.messageService.createHubConnection(user, this.member.username);
    } else {
      this.messageService.stopHubConnection();
    }
  }

  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }
}
