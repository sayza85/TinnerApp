import { HttpClient } from '@angular/common/http'
import { inject, Injectable, signal } from '@angular/core'
import { environment } from '../../environments/environment'
import { cacheManager } from '../_helper/cache'
import { pareQuery } from '../_helper/helper'
import { default_paginator, Paginator, UserQueryPagination } from '../_models/pagination'
import { User } from '../_models/users'



type dataCategory = 'member' | 'chat' | 'follower' | 'following'
@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private http = inject(HttpClient)
  private url = environment.baseUrl + 'api/' //user

  paginator = signal<Paginator<UserQueryPagination, User>>(default_paginator)

  private getData(category: dataCategory) {
    const pagination = this.paginator().pagination

    let key = cacheManager.createKey(pagination)
    const cachData = cacheManager.load(key, category)
    if (cachData) {
      console.log(`load ${category} from cache`)
      this.paginator.set(cachData)
      return
    }

    //get from server
    console.log(`load ${category} from server !!`)
    const url = this.url + 'user/' + pareQuery(pagination)
    this.http.get<Paginator<UserQueryPagination, User>>(url).subscribe({
      next: response => {
        key = cacheManager.createKey(pagination)
        cacheManager.save(key, response, category)
        this.paginator.set(response)
      }
    })
  }
  getMembers() {
    this.getData('member')
  }
}