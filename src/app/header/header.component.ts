import { Component, OnInit } from '@angular/core';
import { ApiService } from '../products/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private api:ApiService){}
  cartItems:number=0
  ngOnInit(): void {
    this.api.cartItemsCount.subscribe((result:any)=>{
      
      this.cartItems=result
      console.log(this.cartItems);
    })
  }
  search(event:any){
    
    // to assign new value to behaviour subject use next method
    this.api.searchTerm.next(event.target.value)
    
  }
}
