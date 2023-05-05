import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder } from '@angular/forms';
import {
  IPayPalConfig,
  ICreateOrderRequest 
} from 'ngx-paypal';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public payPalConfig ? : IPayPalConfig;
  cartProducts:any=[]
  cartTotal:number=0
  proceedToPayClickedStatus:boolean=false
  offerClickedStatus:boolean=false
  discountClickedStatus:boolean=false
  showSuccess:boolean=false
  showCancel:boolean=false
  showError:boolean=false
  showPaypal:boolean=false
  username:string=''
  flat:string=''
  street:string=''
  state:string=''

  addressForm=this.fb.group({
    Username:[''],
    AppFlat:[''],
    Street:[''],
    State:['']
  })
  constructor(private api:ApiService,private fb:FormBuilder){}
  ngOnInit(): void {
    this.api.getCart().subscribe((result:any)=>{
      
      this.cartProducts=result
      // call cart total function here
      this.getCarttotal()
      // paypal
      this.initConfig()
      
    },(error:any)=>{
      console.log(error.error);
      
    })
  }
  // get cart total
  getCarttotal(){
    let total=0
    this.cartProducts.forEach((item:any) => {
      total+=item.grandTotal
      this.cartTotal=Math.ceil(total)
    });
  }

removeCartitem(id:any){
  this.api.removeCartitem(id).subscribe((result:any)=>{
    console.log(result);

    // store currrent data 
    this.cartProducts=result
    // call cart total function here
    this.getCarttotal()
    // count for cart
    this.api.cartCount()
    
  },(error:any)=>{
    console.log(error.error);
    
  })
}
emptyCart(){
  return this.api.emptyCart().subscribe((result:any)=>{
    
    this.cartProducts=[]
    // call cart total function here
    this.getCarttotal()
    // count for cart
    this.api.cartCount()
    alert(result)
  },(Error)=>{
    alert(Error.error)
  })
}
incrementQ(id:any){
  this.api.increment(id).subscribe((result:any)=>{
    this.cartProducts=result
     // call cart total function here(update amount)
     this.getCarttotal()
  },(result:any)=>{
    alert(result.error)
  })
}
decrementCart(id:any){
  this.api.decrement(id).subscribe((result:any)=>{
    this.cartProducts=result
     // call cart total function here(update amount)
     this.getCarttotal()
  },(error:any)=>{
    alert(error.error)
  })
}
submitBtnClicked(){
  if(this.addressForm.valid){
    this.proceedToPayClickedStatus=true
    this.username=this.addressForm.value.Username||''
    this.flat=this.addressForm.value.AppFlat||''
    this.street=this.addressForm.value.Street||''
    this.state=this.addressForm.value.State||''
  }
  else{
    alert('Please enter valid details')
  }
}
OfferClicked(){
  this.offerClickedStatus=true
}
discount50(){
  let discount =Math.ceil(this.cartTotal*50/100)
  this.cartTotal-=discount
  this.discountClickedStatus=true
}
discount10(){
  let discount =Math.ceil(this.cartTotal*10/100)
  this.cartTotal-=discount
  this.discountClickedStatus=true
}

// PAY PAYMENT METHOD
private initConfig(): void {
  let amount=this.cartTotal.toString()
  this.payPalConfig = {
      currency: 'USD',
      clientId: 'sb',
      createOrderOnClient: (data) => < ICreateOrderRequest > {
          intent: 'CAPTURE',
          purchase_units: [{
              amount: {
                  currency_code: 'USD',
                  value: amount,
                  breakdown: {
                      item_total: {
                          currency_code: 'USD',
                          value: amount
                      }
                  }
              },
              items: [{
                  name: 'Enterprise Subscription',
                  quantity: '1',
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                      currency_code: 'USD',
                      value: amount
                  },
              }]
          }]
      },
      advanced: {
          commit: 'true'
      },
      style: {
          label: 'paypal',
          layout: 'vertical'
      },
      onApprove: (data, actions) => {
          console.log('onApprove - transaction was approved, but not authorized', data, actions);
          actions.order.get().then((details:any) => {
              console.log('onApprove - you can get full order details inside onApprove: ', details);
          });

      },
      onClientAuthorization: (data) => {
          console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
          this.showSuccess = true;
          // when success emtycart
          this.emptyCart()
          // hide paypal div
          this.showPaypal=false
          // hide proceedToPayClickedStatus
          this.proceedToPayClickedStatus=false

         
      },
      onCancel: (data, actions) => {
          console.log('OnCancel', data, actions);
          this.showCancel = true;
        

      },
      onError: err => {
          console.log('OnError', err);
          this.showError = true;
          this.showCancel=false
      },
      onClick: (data, actions) => {
          console.log('onClick', data, actions);
         
      }
  };
}
makePayment(){
  this.showPaypal=true 
  
}
modalclose(){
  this.addressForm.reset()
  this.showCancel=false
  this.showError=false
  this.showSuccess=false 
  this.proceedToPayClickedStatus=false

}
}
