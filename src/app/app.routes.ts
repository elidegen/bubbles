import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'forgotpassword', component: ForgotpasswordComponent },
    { path: 'resetpassword', component: ResetpasswordComponent },
];