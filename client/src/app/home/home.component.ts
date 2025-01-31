import { Component, computed, inject, Inject, Signal } from '@angular/core'
import { AccountService } from '../_services/account.service';
import { User } from '../_models/users'
import { MemberComponent } from '../member/member.component'

@Component({
  selector: 'app-home',
  imports: [MemberComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private accountService = inject(AccountService)
  user: Signal<User | undefined>
  constructor() {
    this.user = computed(() => this.accountService.data()?.user)
  }

}
