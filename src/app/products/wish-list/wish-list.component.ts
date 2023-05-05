import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit{
  wProducts:any={}
  isCollapse:boolean=true
  constructor(private api:ApiService){}
  ngOnInit(): void {
    this.getWishlist()
    
  }
  getWishlist(){
    return this.api.getWishlist().subscribe((result:any)=>{
      this.wProducts=result
      console.log(this.wProducts);
      
    },(error:any)=>{
      alert(error.error)
    })
  }
  Collapse(){
    this.isCollapse=!this.isCollapse
  }
  removeItem(id:any){
    this.api.removeWishlistItem(id).subscribe((result:any)=>{
      this.wProducts=result
    })
  }
  addtoCart(product:any){

    //add quantity to product object
    Object.assign(product,{quantity:1}) 
    console.log(product);
    

    this.api.addtocart(product).subscribe((result:any)=>{

      // call cart count
      this.api.cartCount()
      //also remove item from wishlist
      this.removeItem(product.id )
      alert(result)
    },(result:any)=>{
      alert(result.error)
    })
  }
}
