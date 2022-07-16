import { Component } from '@angular/core';
import {  NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from './auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'CustomerPortal';
  constructor(private spinner:NgxSpinnerService,private auth:AuthService){}

  ngOnInit(): void {

    //<ngx-spinner bdColor = "rgba(0, 0, 0, 0.8)" size = "large" color = "#0f1aec" type = "ball-climbing-dot" [fullScreen] = "true"><p style="color: white" > Loading... </p></ngx-spinner>


  }





}
