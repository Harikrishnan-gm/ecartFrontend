import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit{
  allProducts:any=[]
  searchTerm:string=''
  constructor (private api:ApiService){}
  ngOnInit(): void {
    this.api.getallproducts().subscribe((result:any)=>{
      console.log(result);
      this.allProducts=result
      
    })
    // to get search term from api service 
    this.api.searchTerm.subscribe((result:any)=>{
      this.searchTerm=result
      console.log(this.searchTerm);
      
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
