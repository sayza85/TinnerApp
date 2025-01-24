import { Component, inject } from '@angular/core'
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private http = inject(HttpClient)

}
