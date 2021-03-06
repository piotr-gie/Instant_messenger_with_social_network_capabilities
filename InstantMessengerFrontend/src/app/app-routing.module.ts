import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '', component: WelcomePageComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'home', component: HomePageComponent,},
      {path: 'profile/:id', component: ProfilePageComponent},
      {path: 'users', component: UserListComponent},
    ]
  }, 
  {path: '**', component: HomePageComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
