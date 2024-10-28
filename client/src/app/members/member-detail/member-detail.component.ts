import { Component,  NgModule,  OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CommonModule, DatePipe, NgIf } from '@angular/common';
import { TimeagoModule } from 'ngx-timeago';

@Component({
    selector: 'app-member-detail',
    templateUrl: './member-detail.component.html',
    styleUrls: ['./member-detail.component.css'],
    standalone: true,
    imports: [GalleryModule,TabsModule, CommonModule, TimeagoModule, DatePipe]
})
export class MemberDetailComponent implements OnInit{
 member: Member | undefined;
 images :GalleryItem[] = [];
 
 

 
  constructor(private memberService: MembersService, private route: ActivatedRoute) {}

  ngOnInit(): void {

    this.loadMember();
   
    
  }

  getImages(){
    if(!this.member) throw new Error('Member not found')
    for (const photo of this.member.photos) {
      this.images.push(new ImageItem({src: photo.url, thumb: photo.url}))
    }
  
  
  }

  loadMember(): void {
    const username = this.route.snapshot.paramMap.get('username');
    if(!username) return;
    this.memberService.getMember(username).subscribe({
      next: member =>{
        this.member = member;
        member.photos.map(p=> {
          this.images.push(new ImageItem({src: p.url, thumb: p.url}))
        })
        
      } 
    })
  }
}
