import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SaleGuard implements CanActivate {
  constructor(private _route:Router){}

  canActivate():boolean{
    const state = !!localStorage.getItem('SDN')
    if(state)
    return true;
    else{
      this._route.navigate(['sales/order'])
      return false
    }
  }

}
