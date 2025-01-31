import { Component, inject, Injectable, input } from '@angular/core'
import { User } from '../../_models/users'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card'
import { CommonModule } from '@angular/common'
import { MatDialog } from '@angular/material/dialog'
import { UploadPhotoComponent } from '../../_dialogs/upload-photo/upload-photo.component'
import { AccountService } from '../../_services/account.service'
import { TimeagoModule, TimeagoIntl, TimeagoFormatter, TimeagoClock, TimeagoDefaultClock, TimeagoCustomFormatter } from 'ngx-timeago'
import { strings as engStrings } from 'ngx-timeago/language-strings/en.js'
// @Injectable()
// class MyIntl extends TimeagoIntl {

// } 
@Component({
  selector: 'app-photo',
  imports: [MatButtonModule, MatIconModule, MatCardModule, CommonModule, TimeagoModule],
  templateUrl: './photo.component.html',
  styleUrl: './photo.component.scss',
  providers: [
    { provide: TimeagoIntl, useClass: TimeagoIntl },
    { provide: TimeagoFormatter, useClass: TimeagoCustomFormatter },
    { provide: TimeagoClock, useClass: TimeagoDefaultClock }
  ],
})
export class PhotoComponent {
  user = input.required<User>()
  // intl = inject(TimeagoIntl)

  constructor(private intl: TimeagoIntl) {
    this.intl.strings = engStrings
    this.intl.changes.next()
  }
  private dialog = inject(MatDialog)
  private accountService = inject(AccountService)
  openAddphotoDialog() {
    const ref = this.dialog.open(UploadPhotoComponent)
    ref.afterClosed().subscribe(async file => {
      await this.accountService.uploadPhoto(file)
    })
  }

  deletePhoto(photo_id: string) {
    this.accountService.deletPhoto(photo_id)
  }

  setAvatar(photo_id: string) {
    this.accountService.setAvatar(photo_id)
  }
}



