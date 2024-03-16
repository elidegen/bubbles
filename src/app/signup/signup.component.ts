import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  hide:boolean = false;
  signUpForm:FormGroup;
  
  constructor(private router: Router){
    this.signUpForm = new FormGroup({
      username: new FormControl('' , [Validators.required, Validators.minLength(4)]),
      email: new FormControl('' , [Validators.required, Validators.email]),
      password: new FormControl('' , [Validators.required, Validators.minLength(8)]),
    });
  }

  navigateTo(path:string){
    this.hide = true;
    setTimeout(() => {
      this.router.navigate([path]);
    }, 300);
  }


  /** FORM CONTROL */

  isFormValid() {
    return this.signUpForm.valid;
  }

  emailError(key:string){
    const field = this.getField(key);
    if (field) {
      return field.errors?.['email'] && this.dirtyTouched(field);
    }
  }

  getField(key:string){
    let myForm = this.signUpForm;
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


  minLengthError(key:string){
    const field = this.getField(key);
    if (field) {
      return field.errors?.['minlength'];
    } else {
      return false;
    }
  }

}
