import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { homeComponent } from './home/home.component';

const routes: Routes = [
   {path:'',component: LoginComponent},
   { path: 'home', component: homeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
