import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private spinner:boolean=false;
  private validAuth:any;
  private token:any="";
  private UserID:string="";
  public LoginUserObject:any;

  private _barrerTokenCheckURL="http://localhost:3000/api/barrer";
  private _loginURL ="http://localhost:3000/api/custlogin";


  constructor(private http:HttpClient , private route:Router , private loader:NgxSpinnerService) { }

  async loginUser(loginUserFormData:any)
  {
     this.http.post<any>(this._loginURL,loginUserFormData).subscribe((res)=>{
        this.validAuth=true;
        this.UserID = res["KUNNR"]
        this.LoginUserObject = res;
        console.log(res);
        this.token=res["TOKEN"]
        this.loader.hide();
        localStorage.setItem('token',this.token);
        localStorage.setItem('id',this.UserID);
        localStorage.setItem('salesOrg',res["SALEORG"])
        this.SuccessMessage("You Are Successfully Authenticated ... !");
        console.log("hello home login")
        this.route.navigate(['/home'])
        return this.validAuth ;

     },(err)=>{
      this.loader.hide();
      this.validAuth=false
       console.log(err)
       if(err.status === 404)
       this.ErrorMessage("UnAuthorized User . Please Enter a valid Credentials")
       else
       this.ErrorMessage("Internal Server Error")

       this.route.navigate(['/login']);
       return false;

     })

     return this.validAuth ;

  }

  ErrorMessage(Text:any){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: Text,

    })

  }

  SuccessMessage(Text:any){
    Swal.fire({
      icon: 'success',
      title: 'Successful',
      text: Text,

    })

  }



   async checkBarrerToken()
  {
    this.http.get<any>(this._barrerTokenCheckURL).subscribe((res)=>{
     return true;
   },(err)=>{
     this.route.navigate(['/login']);
     return false;
   })
  }

  getUserId(){
    return this.UserID;
  }

  getLoginUserObject():any{
    return this.LoginUserObject;

  }

  getSpinnerValue()
  {
    return this.spinner;
  }
  setSpinnerValue(value:boolean)
  {
    this.spinner=value;

    console.log(this.spinner)
  }

  getTokenFromLocalStorage()
  {
    return localStorage.getItem('token');
  }

  deleteLocalStorage()
  {
    localStorage.removeItem('token');
  }

  isLoggedIn(){
    return !!localStorage.getItem('token')
  }
  logout()
  {
    localStorage.removeItem('token');
    this.route.navigate(['/login']);
  }
}

