import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {

  print:any;
  deliveryStatus:boolean=false
  deliveryText:string="";
  displayStatus:boolean=false ;
  @Input() events:any ;
  constructor(private route:Router) { }

  ngOnInit(): void {


          if(this.events["ANGDT"]=="0000-00-00" || this.events["GUEEN"]=="0000-00-00" || this.events["GUEBG"]=="0000-00-00" || this.events["BNDDT"]=="0000-00-00"){
            this.displayStatus = false;
            Swal.fire({
              icon: 'error',
              title: 'Quotation has been cancelled for this document .',
              text: 'Participants might have not submitted the document in the Bid or Quotation might have rejected in the bid project proposal!',

            });

          }

          else{
            this.displayStatus = true;
          }

           if(this.events["AUTLF"] =="Y"){
              this.deliveryStatus=true
              this.deliveryText = "Quotation Item Has been Delivered on  "+this.events["VDATU"]+". Status Delivered"
           }
           else if(this.events["AUTLF"]=="N"){
            this.deliveryStatus=false
            this.deliveryText = "Not Delivered. Status Pending"
           }
           else{
            this.deliveryStatus=false
            this.deliveryText="Delivery Status is not updated "
           }




  } // end of onInit

   backToSales(){
       window.location.reload()
   }

   downloadDelivery(){
    this.print = document.getElementById('print');
    //var width = document.getElementById('print').offsetWidth;
    html2canvas(this.print).then(canvas => {
      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf.jsPDF('p', 'mm', 'a4');
      var position = 5;
      pdf.addImage(contentDataURL, 'PNG', 5, position, imgWidth-7, imgHeight)
      pdf.save('Delivery.pdf');
     })

   }
}
