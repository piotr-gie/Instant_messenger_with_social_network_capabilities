import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/fetch/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private toastr: ToastrService, private route: Router) {}
  
  canActivate(): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      map(user => {
        if (user) return true;
        this.route.navigate([''])
      })
    );
  }
  
}
