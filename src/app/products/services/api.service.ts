import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  BASE_URL='https://ecart-cdfs.onrender.com'
  searchTerm=new BehaviorSubject('')
  // store quantity
  cartItemsCount=new BehaviorSubject(0)
  constructor(private http:HttpClient) {
    this.cartCount()
   }
  getallproducts(){
    // api
    return this.http.get(`${this.BASE_URL}/products/all-products`)
  }
  viewProduct(id:any){
    return this.http.get(`${this.BASE_URL}/products/view-products/${id}`)
  }
  // /wishlist/addproduct
  addtowishlist(id:any,title:any,price:any,image:any){
    const body={
      id,title,price,image
    }
    // api
    return this.http.post(`${this.BASE_URL}/wishlist/addproduct/`,body)
  }
  getWishlist(){
    return this.http.get(`${this.BASE_URL}/products/wish-list`)
  }
  removeWishlistItem(id:any){
    return this.http.delete(`${this.BASE_URL}/wishlist/removeitem/${id}`)
  }
  // add to cart
  addtocart(product:any){
    // get id,title,image,price,quantity
    const body={
      id:product.id,
      title:product.title,
      image:product.image,
      price:product.price,
      quantity:product.quantity
    }
    return this.http.post(`${this.BASE_URL}/products/addtocart`,body)

  }
  getCart(){
    return this.http.get(`${this.BASE_URL}/products/cart`)
  }
  cartCount(){
    return  this.getCart().subscribe((result:any)=>{
     this.cartItemsCount.next(result.length)
    })
  }
  removeCartitem(id:any){
    return this.http.delete(`${this.BASE_URL}/products/cart/remove/${id}`)
  }

  // empty cart
  emptyCart(){
    return this.http.delete(`${this.BASE_URL}/cart/removeItems`)
  }

  // increment item
  increment(id:any){
    return this.http.get(`${this.BASE_URL}/cart/increment/${id}`)
  }

  // decrement item
  decrement(id:any){
    return this.http.get(`${this.BASE_URL}/cart/decrement/${id}`)
  }

}
