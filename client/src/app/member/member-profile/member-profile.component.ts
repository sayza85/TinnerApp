import { AfterViewChecked, Component, ElementRef, inject, OnInit, ViewChild, Signal, computed, OnDestroy } from '@angular/core';
import { User } from '../../_models/user'
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery'
import { MemberService } from '../../_services/member.service'
import { Photo } from '../../_models/photo'
import { ActivatedRoute, Router } from '@angular/router'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MessageService } from '../../_service/message.service';
import { Message } from '../../_models/message';
import { Subscription } from 'rxjs'
import { AccountService } from '../../_services/account.service';
import { FormsModule } from '@angular/forms'



@Component({
  selector: 'app-member-profile',
  imports: [GalleryModule, MatSidenavModule, MatCardModule, MatIconModule, MatButtonModule, FormsModule],
  templateUrl: './member-profile.component.html',
  styleUrl: './member-profile.component.scss'
})
export class MemberProfileComponent implements OnInit ,AfterViewChecked,OnDestroy{
 
  member!: User
  images: GalleryItem[] = []
  private memberService = inject(MemberService)
  private activeRount = inject(ActivatedRoute)
  private rounter = inject(Router)
  private messageService = inject(MessageService)
  private accountService = inject(AccountService)
  private subscription! : Subscription
  messages: Message[] = []
  newMessage = ''
  isWsconnected: Signal<boolean>
  user: User
  
  
  scrollChatBottom: boolean = false
  scrollChatTop: boolean = false
  isChatOpen: boolean = false
  numberOfMessage: number = 0
  @ViewChild('chat') chat!: ElementRef

  constructor() {
    this.user = this.accountService.data()!.user
    this.isWsconnected = computed(() => this.messageService.isWSconnected())
    this.subscription = this.messageService.message$.subscribe({
      next:newMessage => this.messages.push(newMessage),
      error: err => {
        
      }
    })
  }

  send() {
    if (this.newMessage.trim()) {
      const newMessage: Message = {
        sender: this.user.id,
        receiver: this.member.id,
        content: this.newMessage.trim()
      }
      this.messageService.sendMessage(newMessage)
      this.newMessage = ''
      this.scrollChatBottom = true
    }
  }
  async getMoreChatHistory() {
    const currentPage = this.messageService.paginator().pagination.currentPage ||0
    const nexPage = currentPage + 1
    this.messageService.paginator().pagination.currentPage = nexPage
    await this.messageService.getMessageHistory(this.member.id!)

    const moreMessage = this.messageService.paginator().items
    this.numberOfMessage = this.messageService.paginator().pagination.length!
    this.messages = [...moreMessage.reverse(), ...this.messages]
    this.scrollChatTop = true
  }

  async toggleChat() {
  this.isChatOpen = !this.isChatOpen
  if (this.isChatOpen) {
    const token = this.accountService.data()!.token
    this.messageService.connect(this.member.id!, token, this.user.id!)
    this.messages = []
  }else {
    if (this.subscription)
    this.subscription.unsubscribe()
    this.messageService.close()
  }
  if (this.messages.length > 0) return
  console.log('load chat history')
  await this.messageService.getMessageHistory(this.member.id!)
    this.messages = [...this.messageService.paginator().items.reverse()]
    this.numberOfMessage =this.messageService.paginator().pagination.length!
  
}

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe()
    this.messageService.close()
    console.log('disconnected')
  }

  ngAfterViewChecked(): void {
    if (!this.chat) return
    const containner = this.chat.nativeElement as Element
    
    if(this.scrollChatTop){
      containner.scrollTop = 0
      this.scrollChatTop = false
    }
    if (this.scrollChatBottom) {
      containner.scrollTop = containner.scrollHeight
      this.scrollChatBottom = false
    }
  }

  private intiGalleryItem(photos: Photo[]) {
    for (const photo of photos) {
      this.images.push(new ImageItem({ src: photo.url, thumb: photo.url }))
    }
  }

  async getMember() {
    const username = this.activeRount.snapshot.paramMap.get('username')
    if (!username) return
    const member = await this.memberService.getMemberByUsername(username)
    if (!member) {
      this.rounter.navigate(['404'])
    } else {
      this.member = member
      if (this.member.photos) {
        this.intiGalleryItem(this.member.photos)
      }
    }
  }

  ngOnInit(): void {
    this.getMember()
  }
}
