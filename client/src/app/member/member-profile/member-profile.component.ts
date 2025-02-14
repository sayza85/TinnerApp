import { Component, inject, OnInit } from '@angular/core'
import { User } from '../../_models/users'
import {GalleryModule, GalleryItem, ImageItem } from 'ng-gallery';
import { MemberService } from '../../_services/member.service';
import { Photo } from '../../_models/photo'
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'app-member-profile',
  imports: [GalleryModule, MatSidenavModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './member-profile.component.html',
  styleUrl: './member-profile.component.scss'
})
export class MemberProfileComponent implements OnInit {

  member!: User
  images: GalleryItem[] = [];
  MemberService = inject(MemberService)
  activeRoute = inject(MemberService)
  router: any
  private initGalleryItem(photos: Photo[]) {
    for (const photo of photos) {
      this.images.push(new ImageItem({ src: photo.url, thumb: photo.url }))
    }
  }
  async getmember() {
    const username = this.activeRoute.snapshot.paramMap.get('username')
    if (!username) return
    const member = await this.MemberService.getMemberByUsername(username)
    if (!member) {
      this.router.navigate(['404'])
    } else {
      this.member = member
      if (this.member.photos)
        this.initGalleryItem(this.member.photos)
    }
  }
  ngOnInit(): void {
    this.getmember();
  }
}
