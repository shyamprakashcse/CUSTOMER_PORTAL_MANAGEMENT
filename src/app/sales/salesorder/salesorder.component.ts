import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"
import { Router } from '@angular/router';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-salesorder',
  templateUrl: './salesorder.component.html',
  styleUrls: ['./salesorder.component.css']
})
export class SalesorderComponent implements OnInit {
  private _ORDERURL = 'http://localhost:3000/api/salesorder'

  private _ORDERBODY = {
    "custNo":localStorage.getItem('id'),
    "saleOrg":localStorage.getItem('salesOrg')
  }

  print:any;
  displayStatus:boolean=true ;

  salesOrderData :any;
  orderField:any;
  reverseSort:boolean=false
  page:number=1
  selectedSaleOrder:any;
  searchInput:any={
              CURRENCY: "",
              CUSTOMERNAME: "",
              DELIVERYQUANTITY: "",
              DISTRIBUTEDCHANNEL: "",
              DOCUMENTDATE: "",
              DOCUMENTTYPE: "",
              EXCHANGERATE: "",
              GOODSISSUEDATE: "",
              ITEMNO: "",
              MATERIALNAME: "",
              MATERIALNO: "",
              NETPRICE: "",
              NETVALUE: "",
              PURCHASEORDERNO: "",
              REQUESTEDDELIVERYDATE: "",
              REQUIREDQUANTITY: "",
              SALESDOCNO: "",
              SHIPPOINT: "",
              SOLDPARTYNO: "",
              STATUS: ""
  }

  constructor(private http:HttpClient,private route:Router,private loader:NgxSpinnerService) { }

  ngOnInit(): void {

    localStorage.removeItem('SDN');

    //loader on

    this.loader.show(undefined,{
      type: "ball-climbing-dot",
      color:'#0f1aec',
      size:'large',
      fullScreen:false,

      bdColor:'rgba(100,149,237,0.1)',

    });



    this.http.post<any>(this._ORDERURL,this._ORDERBODY).subscribe((res)=>{

      this.salesOrderData = res ;
      this.loader.hide();

      console.log(res)
      Swal.fire({
        icon: 'success',
        title: 'Data found',
        text: 'Sales Order Data is Found!...',
        timer : 2000

      })
    },(err)=>{
      console.log(err);
      this.loader.hide();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No Data is Found!...',
        timer : 2000

      })

    })
  }


  ExportPDF(){
    // console.log("exporter pdf")
    // const doc = new jsPDF('l', 'mm', 'a4');


    // autoTable(doc,
    //   { html: '#salordtab'});
    // doc.save('salesorder.pdf')

    this.print = document.getElementById('print');
    //var width = document.getElementById('print').offsetWidth;
    html2canvas(this.print).then(canvas => {
      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf.jsPDF('p', 'mm', 'a4');
      var position = 5;
      pdf.addImage(contentDataURL, 'PNG', 5, position, imgWidth-7, imgHeight)
      pdf.save('SalesOrder.pdf');
     })





  }


  sortHeader(sortField:string){
    this.orderField=sortField;
    if(this.reverseSort==true)
    {
      this.reverseSort=false;
    }
    else{
      this.reverseSort=true;
    }
  }

  setSaleLineData(saleData:any){
    this.selectedSaleOrder = saleData
    this.displayStatus=false;

  }

  backToInquiry(){
     this.route.navigate(['sales/inquiry'])
  }

}
