import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SettingsService } from '../services/settings.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegisterGuard implements CanActivate {

  constructor(
    private settingsService: SettingsService,
    private router: Router
    ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.settingsService.getSettings().allowRegistration) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
