import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { TokenStorageService } from '../services/token-storage.service';

const AUTH_API = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
  	private httpClient:HttpClient, private tokenStorageService: TokenStorageService
  ) { }
  
    authenticate(usernamee, passworde) {
      return this.httpClient.post<any>(AUTH_API + 'api/auth/signin',{
        username: usernamee,
        password: passworde
      });
    }

  isUserLoggedIn() {
    let user = this.tokenStorageService.getUser()
    //console.log(!(user === null))
    return !(user === null)
  }

  logOut() {
    this.tokenStorageService.signOut()
  }
}
