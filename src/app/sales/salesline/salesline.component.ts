import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { SalesService } from '../sales.service';
@Component({
  selector: 'app-salesline',
  templateUrl: './salesline.component.html',
  styleUrls: ['./salesline.component.css']
})
export class SaleslineComponent implements OnInit {

  @Input() events:any={};
  print:any;

  constructor(private route:Router,private http:HttpClient,private sale:SalesService) {


   }

  ngOnInit(): void {
    console.log(this.events)
    localStorage.removeItem('SDN')
  }

  backToSales(){
    window.location.reload()
}

backToInvoice(){
  localStorage.setItem('SDN',this.events["SALESDOCNO"]);
  this.sale.setSalesOrder(this.events)
  this.route.navigate(['sales/invoice'])
}

downloadSalesLine(){
  this.print = document.getElementById('print');
  //var width = document.getElementById('print').offsetWidth;
  html2canvas(this.print).then(canvas => {
    var imgWidth = 208;
    var imgHeight = canvas.height * imgWidth / canvas.width;
    const contentDataURL = canvas.toDataURL('image/png')
    let pdf = new jspdf.jsPDF('p', 'mm', 'a4');
    var position = 5;
    pdf.addImage(contentDataURL, 'PNG', 5, position, imgWidth-7, imgHeight)
    pdf.save('SaleslineChart.pdf');
   })
}

}
