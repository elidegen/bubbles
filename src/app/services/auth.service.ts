import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, take } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { MainService } from './main.service';

export interface CurrentUser {
  id: number,
  username: string,
  email: string,
  picture: null | string
  is_online: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private mainService: MainService) {
    let response = this.getCurrentuser(); // DIESE FUNKTION WIRD GELÖSCHT (wenn login aktiv)
   }

  currentUser: CurrentUser = {
    id: 3,
    username: "CurrentUser",
    email: "guestuser@mailinator.com",
    picture: 'assets/img/profile_placeholder.svg',
    is_online: true,
  }

  async getCurrentuser(){
    let url = environment.baseUrl + 'users/' + this.currentUser?.id + '/';
    let response = await firstValueFrom(this.http.get(url)) as CurrentUser;
    this.currentUser = response
  }

  getImg() {    
    if (this.currentUser.picture) {
      return this.currentUser.picture;
    }
    return 'assets/img/profile_placeholder.svg';
  }

  logIn(formData: FormData){
    const url = environment.baseUrl + 'login';
    this.http.post<CurrentUser>(url, formData).pipe(take(1)).subscribe(
      {
        next: (response:CurrentUser) => {
          this.currentUser = response;
          this.mainService.messageLog('Login successfull');
          this.mainService.loader = false;
        },
        error: e => {
          this.mainService.errorLog('Login failed..');
          console.log('Login Error:', e);
          
        },
      }
    );
  }
}