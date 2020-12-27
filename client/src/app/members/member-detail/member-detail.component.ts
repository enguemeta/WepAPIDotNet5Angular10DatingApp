import { MembersService } from 'src/app/_services/members.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from 'src/app/_models/member';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  public member: Member;
  public galleryOptions: NgxGalleryOptions[];
  public galleryImages: NgxGalleryImage[];

  constructor(private membersService: MembersService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadMember();

    this.galleryOptions = [
       {
         width: '500px',
         height: '500px',
         imagePercent: 100,
         thumbnailsColumns: 4,
         imageAnimation: NgxGalleryAnimation.Slide,
         preview: false
       }
    ];    
  }

  getImages() : NgxGalleryImage[]{
   const imageUrls = [];
   for(const photo of this.member.photos) { 
     imageUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url,
     });
   }
   return imageUrls;
  }

  loadMember() {
    this.membersService.getMember(this.route.snapshot.paramMap.get('username')).subscribe((member) => {
      this.member = member;
      this.galleryImages = this.getImages();
    });
  }

}
