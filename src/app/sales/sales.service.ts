import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private _InquiryDataURL = "http://localhost:3000/api/inquiry";
  private InquiryData :any;
  selectedSalesOrder:any;

  constructor(private http:HttpClient) { }

  setSalesOrder(saleorder:any){
    this.selectedSalesOrder=saleorder ;
  }

  getSalesOrder(){
    return this.selectedSalesOrder ;
  }







}
