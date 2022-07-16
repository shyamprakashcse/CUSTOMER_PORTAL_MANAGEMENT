import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SalesService } from '../sales.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';



@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  private _InvoiceURL = "http://localhost:3000/api/invoice"
  private _InvoiceBody = {
      "SalesOrderNo" : localStorage.getItem('SDN')
  }
  print : any;
  InvoiceData:any;
  Credit=0
  Debit=0
  PaidAmount = 0
  DueAmount = 0
  SalesOrderData:any= {
    "SALESDOCNO": "0000000013",
    "ITEMNO": "000010",
    "MATERIALNO": "000000000000000103",
    "MATERIALNAME": "test material 1",
    "DOCUMENTTYPE": "TA",
    "DOCUMENTDATE": "2022-06-08",
    "REQUIREDQUANTITY": "2.000",
    "REQUESTEDDELIVERYDATE": "2022-06-08",
    "PURCHASEORDERNO": "sdvfdv",
    "SOLDPARTYNO": "0000000012",
    "CUSTOMERNAME": "TEST USER 1 USER1",
    "EXCHANGERATE": "1.00000",
    "DELIVERYQUANTITY": "2.000",
    "NETPRICE": "12.00",
    "NETVALUE": "24.00",
    "STATUS": "Completed",
    "SHIPPOINT": "0001",
    "DISTRIBUTEDCHANNEL": "01",
    "GOODSISSUEDATE": "2022-06-09",
    "CURRENCY": "EUR"
}
  MemoType:string="";
  constructor(private http:HttpClient,private sales:SalesService,private spinner:NgxSpinnerService,private route:Router) { }

  ngOnInit(): void {

    this.spinner.show(undefined,{
      type: "ball-climbing-dot",
      color:'#0f1aec',
      size:'large',
      fullScreen:false,

      bdColor:'rgba(100,149,237,0.1)',

    });






    this.http.post<any>(this._InvoiceURL,this._InvoiceBody).subscribe((res)=>{
      this.SalesOrderData = this.sales.selectedSalesOrder
      console.log(res)
      console.log(this.SalesOrderData)
      this.InvoiceData=res;
      this.spinner.hide();

      this.InvoiceData.forEach((invoice:any) => {
        if(invoice["CRDBINDICATOR"]=="H"){
         this.Credit+=1;
        }
     });

      this.Debit = this.InvoiceData.length-this.Credit
      this.PaidAmount = parseFloat(this.SalesOrderData["NETVALUE"])-(parseFloat(this.SalesOrderData["NETPRICE"])*this.Debit)
      this.DueAmount =  parseFloat(this.SalesOrderData["NETVALUE"])-this.PaidAmount
      document.documentElement.scrollTop=0;




    },(err)=>{
      console.log(err)
      this.spinner.hide()
    });

  } // end of ngOninit

  paymentAging(dt1:any,dt2:any){
    let credit = 0 ;

    this.InvoiceData.forEach((invoice:any) => {
       if(invoice["CRDBINDICATOR"]=="H"){
        credit+=1;
       }
    });

    console.log(credit)

    dt1="2022-06-01"
    dt2="2022-07-09"
    dt1=dt1.split("-")
    dt2=dt2.split("-")
    dt1.reverse()
    dt2.reverse()
    dt1=dt1[1]+"/"+dt1[0]+"/"+dt1[2]
    dt2=dt2[1]+"/"+dt2[0]+"/"+dt2[2]
    console.log(dt1)
    console.log(dt2)

    const date1 = new Date(dt1);
    const date2 = new Date(dt2);

    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();

    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);

    console.log(diffInDays)



  }

  exportPDF()
  {
    this.print = document.getElementById('print');
    //var width = document.getElementById('print').offsetWidth;
    html2canvas(this.print).then(canvas => {
      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf.jsPDF('p', 'mm', 'a4');
      var position = 5;
      pdf.addImage(contentDataURL, 'PNG', 5, position, imgWidth-7, imgHeight)
      pdf.save('invoice.pdf');
     })
  }

  backToSales(){
    this.route.navigate(['sales/order'])
  }


}
