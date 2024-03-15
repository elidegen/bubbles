import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss'
})
export class ForgotpasswordComponent {
  hide:boolean = false;

  constructor(private router: Router){

  }

  navigateTo(path:string){
    this.hide = true;
    setTimeout(() => {
      this.router.navigate([path]);
    }, 300);
  }
}
