import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit{
  productId:string=''
  product:any={}
  // dependency injection
  constructor(private viewActivatedroute:ActivatedRoute,private api:ApiService){}
ngOnInit(): void {
  this.viewActivatedroute.params
  .subscribe((data:any)=>{
    console.log(this.productId=data.id);
   
    
  })
  // call api for view product
  this.api.viewProduct(this.productId)
  .subscribe((data:any)=>{
   
    this.product=data
    console.log(this.product);
    
  },(error:any)=>{
    console.log(error.error);
    
  })
}
// api to add wishlist
addtowishList(){
  const {id,title,price,image}= this.product
  this.api.addtowishlist(id,title,price,image)
  .subscribe((result:any)=>{
    alert(result)
  },(error:any)=>{
    alert(error.error)
  })
}

addtoCart(product:any){

  //add quantity to product object
  Object.assign(product,{quantity:1}) 
  console.log(product);
  

  this.api.addtocart(product).subscribe((result:any)=>{

    // call cart count
    this.api.cartCount()
    alert(result)
  },(result:any)=>{
    alert(result.error)
  })
}

}
