import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { SettingsComponent } from "./settings/settings.component";
import { LoginComponent } from "./login/login.component";
import { SystemInfoComponent } from "./system-info/system-info.component";
import { 
  AuthService as AuthGuard 
} from 'src/app/services/auth.service';

const routes: Routes = [
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo:'/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'system-info', component: SystemInfoComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
