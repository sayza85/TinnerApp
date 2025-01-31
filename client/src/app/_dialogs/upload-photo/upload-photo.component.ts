import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { fileTypeFromBlob } from 'file-type'
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog'

@Component({
  selector: 'app-upload-photo',
  imports: [CommonModule, MatDialogActions, MatDialogContent, MatDialogContent, MatDialogTitle],
  templateUrl: './upload-photo.component.html',
  styleUrl: './upload-photo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class UploadPhotoComponent {
  acceptedImageTypes = ['img/jpeg', 'image/png']
  imgFile: File | undefined
  imgPreview = signal<undefined | string>(undefined)
  errMessage = signal<undefined | string>(undefined)
  private readonly dialogRef = inject(MatDialogRef<UploadPhotoComponent>)

  onSubmit() {
    this.dialogRef.close(this.imgFile)
  }
  async onImgPicked(even: Event) {
    this.imgPreview.set(undefined)
    this.errMessage.set(undefined)
    this.imgFile = undefined
    const input = even.target as HTMLInputElement
    if (input.files && input.files.length > 0) {
      this.imgFile = input.files[0]
      const fileType = await fileTypeFromBlob(this.imgFile)
      if (fileType && this.acceptedImageTypes.includes(fileType.mime)) {
       const fileReader = new FileReader()
        fileReader.onload = () => {
          this.imgPreview.set(fileReader.result as string)
        }
        fileReader.readAsDataURL(this.imgFile)
      }
      else {
        this.imgFile = undefined
        this.errMessage.set('Img file is not supported')
      }
  }
  }
}

