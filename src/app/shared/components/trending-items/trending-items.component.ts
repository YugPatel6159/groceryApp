import { Component } from '@angular/core';
import { ProductService } from '../../services/productservice/product.service';

@Component({
  selector: 'app-trending-items',
  templateUrl: './trending-items.component.html',
  styleUrls: ['./trending-items.component.css']
})
export class TrendingItemsComponent {
  constructor(private service:ProductService){}
  
  // topRatedProducts = this.service.sortGroceriesByRating();
  products = [
    {
      img:"../../assets/image 3.png",
      category:"peach",
      numberOfItems:"20"
    },
    {
      img:"../../assets/image 3.png",
      category:"peach",
      numberOfItems:"20"
    },
    {
      img:"../../assets/image 3.png",
      category:"peach",
      numberOfItems:"20"
    }
  ]
}
