import { computed, inject, Injectable, signal, Signal } from '@angular/core'
import { User } from '../_models/user'
import { AccountService } from './account.service'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { Paginator, UserQueryPagination, } from '../_models/pagination'
import { default_paginator } from '../_models/pagination'
import { cacheManager } from '../_helper/cache'
import { parseQuery } from '../_helper/helper'
@Injectable({
  providedIn: 'root'
})
export class LikeService {

  user: Signal<User | undefined>
  following = signal<Paginator<UserQueryPagination, User>>(default_paginator)
  followers = signal<Paginator<UserQueryPagination, User>>(default_paginator)

  private http = inject(HttpClient)
  accountService: AccountService = inject(AccountService)
  private baseApiUrl = environment.baseUrl + 'api/like/'

  constructor() {
    this.user = computed(() => this.accountService.data()?.user)
  }

  public IsFollowingMember(id: string): boolean {
    const user = this.user()
    if (!user) return false
    const following = (user.following as string[])
    return following.includes(id)
  }

  toggleLike(target_id: string): boolean {
    const user = this.user()
    if (!user) return false
    const url = this.baseApiUrl
    this.http.put(url, { target_id }).subscribe()

    const following = (user.following as string[])
    const isFollowingTarget = following.includes(target_id)
    if (isFollowingTarget) {
      user.following = following.filter(id => id !== target_id)
    } else {
      following.push(target_id)
      user.following = following
    }
    this.accountService.SetUser(user)
    return user.following.includes(target_id)
  }

  getDataFromApi(type: 'following' | 'followers') {
    const setSignal = (cacheData: Paginator<UserQueryPagination, User>) => {
      if (type === 'following') {
        this.following.set(cacheData)
      } else {
        this.followers.set(cacheData)
      }
    }
    const pagination = type === 'following' ? this.following().pagination : this.followers().pagination
    const key = cacheManager.createKey(pagination)
    const cacheData = cacheManager.load(key, type)
    if (cacheData) {
      console.log(`----> load ${type} from cache <----`)
      if (type === 'following')
        setSignal(cacheData as Paginator<UserQueryPagination, User>)
      return
    }
    console.log('----> load data API <----')
    const url = this.baseApiUrl + type + parseQuery(pagination)
    this.http.get<Paginator<UserQueryPagination, User>>(url).subscribe({
      next: response => {
        const key = cacheManager.createKey(response.pagination)
        cacheManager.save(key, type, response)
        this.following.set(response)
        setSignal(response)
      }
    })
  }

  getFollowers() {
    this.getDataFromApi('followers')
  }

  getFollowing() {
    this.getDataFromApi('following')
  }
}
