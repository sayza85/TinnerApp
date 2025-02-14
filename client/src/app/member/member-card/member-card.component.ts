import { Component, inject, input } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { User } from '../../_models/users'
import { LikeService } from '../../_services/like.service'
import { cacheManager } from '../../_helper/cache'
import { RouterLink } from '@angular/router'
@Component({
  selector: 'app-member-card',
  imports: [MatButtonModule, MatCardModule,RouterLink],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.scss'
})

export class MemberCardComponent {
  LikeService = inject(LikeService)
  member = input.required<User>()
  isFollowing = false

  ngOnInit(): void{
    const member = this.member()
    if (!member || !member.id) return
    this.isFollowing = this.LikeService.IsfollowingMember(member.id)
  
  }
   
  togglelike() {
    const member = this.member()
    if (!member || !member.id) return
    this.isFollowing = this.LikeService.toggleLike(member.id)
    cacheManager.clear('all')
   }
}
