import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent  {
  hide:boolean = false;

  constructor(private router: Router, private ms: MainService){

  }

  navigateTo(path:string){
    this.hide = true;
    setTimeout(() => {
      this.router.navigate([path]);
    }, 300);
  }

  guestLogin(){
     
    
  }


}
