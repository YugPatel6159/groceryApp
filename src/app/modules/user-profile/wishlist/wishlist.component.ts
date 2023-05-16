import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {

  LikedProducts = JSON.parse(localStorage.getItem('likedProducts'));
  constructor( private router:Router, private toastr: ToastrService) {}
  ngOnInit(): void {
    let userWiseLikedProducts = this.LikedProducts.find((res:any)=>{
      return res.username === localStorage.getItem('user')
    })
    console.log(userWiseLikedProducts,'userWiseLikedProducts');
    console.log(this.LikedProducts, 'this.LikedProducts');
  }

  showImage(img: any) {
    return 'http://localhost:8080/api/v1/get-image/' + img;
  }

  addProductToCart(i:any){
    console.log(i,'i')
  }

  routeToProductDetails(id: any, title: any) {
    this.router.navigate(['/product-details', id, title]);
  }
  deleteProduct(id:any){
    if(confirm('Are you sure?')){
      let likedProducts = JSON.parse(localStorage.getItem('likedProduct')) || [];
      likedProducts = likedProducts.filter((item:any) => item.id !== id);
      localStorage.setItem('likedProduct', JSON.stringify([...likedProducts]));
      this.LikedProducts = JSON.parse(localStorage.getItem('likedProduct')) || []
      this.toastr.success('Removed from wishlist','success');
    }
    console.log(id,'id');
  }
}
