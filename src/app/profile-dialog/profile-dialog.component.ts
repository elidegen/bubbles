import { Component } from '@angular/core';
import { MainService } from '../services/main.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment.development';
import { AuthService, CurrentUser } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-profile-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-dialog.component.html',
  styleUrl: './profile-dialog.component.scss'
})
export class ProfileDialogComponent {

  selectedImg: File | undefined;

  constructor(
    public mainService: MainService,
    private router: Router,
    public authService: AuthService,
    private http: HttpClient
  ) { }

  logout() {
    this.router.navigate(['/login']);
    this.mainService.closePopups();
  }

  onImgSelected(event: any): void {
    /**
     * The selected file.
     * @type {File}
     */
    const file: File = event.target.files[0];
    if (file) {
      if (this.checkForFormat(file)) {
        this.selectedImg = file;
      } else {
        this.selectedImg = undefined;
      }
    }
  }

  /**
* Checks if the selected file is in a valid image format (JPEG or PNG).
* @param {File} file - The file to be checked.
* @returns {boolean} - Returns true if the file format is valid (JPEG or PNG), otherwise false.
*/
  checkForFormat(file: File): boolean {
    return file.type === 'image/jpeg' || file.type === 'image/png';
  }

  async uploadImg(userId: number) {
    const url = environment.baseUrl + 'upload_img/' + userId + '/';
    if (this.selectedImg) {
      let formdata = new FormData;
      formdata.append('picture', this.selectedImg);
      const data = await lastValueFrom(this.http.post<CurrentUser>(url, formdata));
      console.log('data', data);
      this.authService.currentUser = data;
      this.selectedImg = undefined;
    }
  }
}