import { Component } from '@angular/core';
import { MainService } from '../services/main.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService, CurrentUser } from '../services/auth.service';
import { FilePickerComponent } from '../file-picker/file-picker.component';
import { environment } from '../../environments/environment.development';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User, UserService } from '../services/user.service';

@Component({
  selector: 'app-profile-dialog',
  standalone: true,
  imports: [CommonModule, FilePickerComponent],
  templateUrl: './profile-dialog.component.html',
  styleUrl: './profile-dialog.component.scss'
})
export class ProfileDialogComponent {

  constructor(
    public mainService: MainService,
    private router: Router,
    public authService: AuthService,
    private http: HttpClient,
    private userService: UserService,
  ) { }

  logout() {
    this.router.navigate(['/login']);
    this.mainService.closePopups();
  }

  async uploadImg(file: File) {
    const url = environment.baseUrl + 'upload_img/' + this.authService.currentUser.id + '/';
    const formdata = new FormData();
    formdata.append('picture', file);
    const response = await firstValueFrom(this.http.post<CurrentUser>(url, formdata));
    this.authService.currentUser = response;
    this.updateUsers(response as User);
  }

  updateUsers(response: User) {
    const index = this.userService.users.findIndex(obj => obj.id === response.id);
    this.userService.users.splice(index, 1, response);
  }
}