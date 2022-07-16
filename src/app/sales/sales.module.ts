import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InquiryComponent } from './inquiry/inquiry.component';
import { Routes,RouterModule } from '@angular/router';
import { DeliveryComponent } from './delivery/delivery.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { FormsModule } from '@angular/forms';
import { SalesorderComponent } from './salesorder/salesorder.component';
import { SaleslineComponent } from './salesline/salesline.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { SaleGuard } from './sale.guard';

const route:Routes=[
  {path:'',redirectTo:'inquiry'},
  {path:'inquiry',component:InquiryComponent},
  {path:'order',component:SalesorderComponent},
  {path:'invoice',component:InvoiceComponent,canActivate:[SaleGuard]}
]

@NgModule({
  declarations: [
    InquiryComponent,
    DeliveryComponent,
    SalesorderComponent,
    SaleslineComponent,
    InvoiceComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    OrderModule,
    FilterPipeModule,
    FormsModule,
    RouterModule.forChild(route)
  ]
})
export class SalesModule {

   constructor(){
    console.log("Sales Module ");

   }
 }
