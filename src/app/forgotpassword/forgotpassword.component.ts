import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss'
})
export class ForgotpasswordComponent {
  hide:boolean = false;
  forgotPasswordForm:FormGroup;

  constructor(private router: Router){
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  navigateTo(path:string){
    this.hide = true;
    setTimeout(() => {
      this.router.navigate([path]);
    }, 300);
  }



  //*****FORM CONTROL */

  isFormValid() {
    return this.forgotPasswordForm.valid;
  }

  emailError(key:string){
    const field = this.getField(key);
    if (field) {
      return field.errors?.['email'] && this.dirtyTouched(field);
    }
  }

  getField(key:string){
    let myForm = this.forgotPasswordForm;
    let field = myForm?.get(key);
    return field;
  }

  dirtyTouched(field:any){
    return (field.dirty ||
      field.touched);
  }

  isInvalid(key: string) {
    const field = this.getField(key);
    if (field) {
      return field.invalid &&
      this.dirtyTouched(field);
    } else {
      return false;
    }
  }


  isValidInput(key: string){
    const field = this.getField(key);
    if (field) {
      return !this.isInvalid(key) && field.valid;
    } else {
      return false;
    }
  }


  requiredErrors(key:string){
    const field = this.getField(key);
    if (field) {
      return field.errors?.['required'] && 
      this.dirtyTouched(field);
    } else {
      return false;
    }
  }
}
