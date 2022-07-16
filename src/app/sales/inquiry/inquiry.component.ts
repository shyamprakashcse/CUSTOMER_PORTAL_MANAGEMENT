import { HttpClient } from '@angular/common/http';
import { Component, OnInit ,Input} from '@angular/core';
import { SalesService } from '../sales.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-inquiry',
  templateUrl: './inquiry.component.html',
  styleUrls: ['./inquiry.component.css']
})
export class InquiryComponent implements OnInit {

  InquiryData:any;
  UserId:any;
  InquiryBody:any;
  doc:any;
  showDelivery:boolean=false
  DeliveryData:any;
  ErrorBG:string="{bg-danger:true}";
  page:number=1;
  orderField:string='';
  reverseSort:boolean=false;
  print : any ;
  searchInput:any={VBELN:'',ERNAM:'',ERDAT:'',ANGDT:'',BNDDT:'',GUEBG:'',GUEEN:''}







  private _InquiryDataURL = "http://localhost:3000/api/inquiry";
  constructor(private sales:SalesService,private http:HttpClient,private route:Router,private loader:NgxSpinnerService) {
   }

  ngOnInit(): void {
    localStorage.removeItem('SDN')
    this.UserId=localStorage.getItem('id');
    this.InquiryBody={
      "custNo" : this.UserId
    }

    // loader on
    this.loader.show(undefined,{
      type: "ball-climbing-dot",
      color:'#0f1aec',
      size:'large',
      fullScreen:false,

      bdColor:'rgba(100,149,237,0.1)',

    });

    this.http.post<any>(this._InquiryDataURL,this.InquiryBody).subscribe((res)=>{
      console.log(res);
      this.loader.hide();
      this.InquiryData = res
      Swal.fire({
        icon: 'success',
        title: 'Data found',
        text: 'Inquiry Data is Found!...',
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


    });
  } // end of onInit

  ExportPDF(){

    // console.log("exporter pdf")  // take
    // const doc = new jsPDF('l', 'mm', 'a4'); // take

    // const head = [['ID', 'Country', 'Index', 'Capital']]
    // const data = [
    //     [1, 'Finland', 7.632, 'Helsinki'],
    //     [2, 'Norway', 7.594, 'Oslo'],
    //     [3, 'Denmark', 7.555, 'Copenhagen'],
    //     [4, 'Iceland', 7.495, 'Reykjavík'],
    //     [5, 'Switzerland', 7.487, 'Bern'],
    //     [9, 'Sweden', 7.314, 'Stockholm'],
    //     [73, 'Belarus', 5.483, 'Minsk'],
    // ]

    // autoTable(doc, {
    //     head: head,
    //     body: data,
    //     didDrawCell: (data) => { },
    // });

    // doc.save('table.pdf');

    // 2nd code
    // autoTable(doc,  // take
    //   { html: '#inqtab'});  // take
    // doc.save('salesinquiry.pdf') // take

    //3rd code
    // const head = [["Inquiry No","Inquiry Created On","Inquiry Created By","Quotation Date","Bid End Date","Product Proposal date","Proposal End Date"]]
    // autoTable(doc, {
    //   styles: { fillColor: [255, 255, 255] , textColor:[0,0,255],fontStyle:'bold'},

    //   columnStyles: { 0: { halign: 'center', fillColor: [255,255,255] } }, // Cells in first column centered and green
    //   margin: { top: 10 },
    //   theme: 'grid',
    //   head : head,
    //   body: this.InquiryData,
    //   didDrawCell: (data) => { },

    // })

    // doc.save('salesInquiry.pdf');


    this.print = document.getElementById('print');
    //var width = document.getElementById('print').offsetWidth;
    html2canvas(this.print).then(canvas => {
      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf.jsPDF('p', 'mm', 'a4');
      var position = 5;
      pdf.addImage(contentDataURL, 'PNG', 5, position, imgWidth-7, imgHeight)
      pdf.save('Inquiry.pdf');
     })




  }

  setDeliveryData(inquiry:any){

      this.DeliveryData = inquiry;
      this.showDelivery = true ;
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

  backToHome(){
    this.route.navigate(['home'])
  }




}
