import { Component, input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { User } from '../../_models/users'
@Component({
  selector: 'app-member-card',
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.scss'
})
export class MemberCardComponent {
member = input.required<User>()

}
