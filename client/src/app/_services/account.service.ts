import { inject, Injectable, signal } from '@angular/core'
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http'

import { firstValueFrom } from 'rxjs'
import { User } from '../_models/users'
import { Photo } from '../_models/photo'
import { parseUserPhoto } from '../_helper/helper'


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  [x: string]: any

  private _key = 'account';
  private _baseApiUrl = environment.baseUrl + 'api/account/'
  private _http = inject(HttpClient)

  data = signal<{ user: User, token: string } | null>(null)


  // #region login_and_register
  logout() {
    localStorage.removeItem(this._key)
    this.data.set(null)
  }

  async login(loginData: { username: string, password: string }): Promise<string> {
    try {
      const url = this._baseApiUrl + 'login'
      const response = this._http.post<{ user: User, token: string }>(url, loginData)
      const data = await firstValueFrom(response)
      data.user = parseUserPhoto(data.user)
      this.data.set(data)
      this.saveDataToLocalStorage()
      return ''
    } catch (error: any) {
      console.log(error)

      return error.error?.message

    }
  }
  async register(registerData: User): Promise<string> {
    try {
      const url = this._baseApiUrl + 'register'
      const response = this._http.post<{ user: User, token: string }>(url, registerData)
      const data = await firstValueFrom(response)
      data.user = parseUserPhoto(data.user)
      this.data.set(data)
      this.saveDataToLocalStorage()
      return ''
    } catch (error: any) {
      return error.error?.message
    }
  }

  private saveDataToLocalStorage() {
    const jsonString = JSON.stringify(this.data())
    localStorage.setItem(this._key, jsonString)
  }

  private loadDataFromLocalStorage() {
    const jsonString = localStorage.getItem(this._key)
    if (jsonString) {
      const data = JSON.parse(jsonString)
      this.data.set(data)
    }
  }
  async updateProfile(user: User): Promise<boolean> {
    const url = environment.baseUrl + 'api/user'
    try {
      const response = this._http.patch(url, user)
      await firstValueFrom(response)
      const currentData = this.data()
      if (currentData) {
        currentData.user = user
        this.data.set(currentData)
        this.saveDataToLocalStorage()
      }
    } catch (error) {
      return false
    }
    return true
  }
  constructor() {
    this.loadDataFromLocalStorage()
  }

  async uploadPhoto(file: File): Promise<boolean> {
    const url = environment.baseUrl + 'api/photo/'
    const fromData = new FormData()
    fromData.append('file', file)
    try {
      const response = this._http.post<Photo>(url, fromData)
      const photo = await firstValueFrom(response)
      const user = this.data()!.user
      if (user) {
        if (!user.photos)
          user.photos = []
        user.photos.push(photo)
        this.setUser(user)
        return true
      }
    } catch (error) {

    }
    return false
  }
  private setUser(user: User) {
    this.setUser(user)
  }

  async setAvatar(photo_id: string): Promise<void> {
    const url = environment.baseUrl + 'api/photo/' + photo_id
    try {
      const response = this._http.patch(url, {})
      await firstValueFrom(response)
      const user = this.data()!.user
      if (user) {
        const photos = user.photos?.map(p => {
          p.is_avatar = p.id === photo_id
          return p
        })
        user.photos = photos
        this.setUser(user)
      }
    } catch (error) {

    }
  }
  async deletPhoto(photo_id: string):Promise<void> {
    const url = environment.baseUrl + 'api/photo' + photo_id
    try {
        const response = this._http.delete(url)
        await firstValueFrom(response)
        const user = this.data()!.user
        if (user) {
            const photos = user.photos?.filter(p => p.id !== photo_id)
            user.photos = photos
            this.setUser(user)
            
       } 
    } catch (error) {
        
    }
} 
  }




