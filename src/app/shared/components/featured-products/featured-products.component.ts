import { Component } from '@angular/core';
import Swiper from 'swiper';
import { ProductService } from '../../services/productservice/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cartservice/cart.service';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/Api service/api.service';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.css'],
})
export class FeaturedProductsComponent {
  userId: any;
  constructor(
    private service: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private toastr: ToastrService,
    private apiService:ApiService
  ) {
    this.route.params.subscribe((params) => {
      this.urlCategory = params['i'];
    });
   
  }
  product:any;
  // groceryList = this.service.groceryList;
  urlCategory: string = '';
  getUserDetails(){
    this.apiService.getUserDetails()?.subscribe((res:any)=>{
      if(res){
        this.userId = res.data.id;
      }
    })
  }
  onAdd(product: any) {
    this.getUserDetails();
    let cart = JSON.parse(localStorage.getItem('Cart'));
    let username = localStorage.getItem('user');
    console.log(cart,'cart')
    let matchedUser = cart.find((res:any)=>{
      return res.username === username
    })
    console.log(matchedUser,'matchedUser')
    this.cartService.getProducts(product,username);
  }
  ngOnInit() {
    this.apiService.getAllProducts()?.subscribe((res:any)=>{
      if(res){
        this.product=res.data;
        console.log(res.data)
      }
    })
    window.scrollTo(0, 0);
  }
  showImage(img:any){
    let src = "http://localhost:8080/api/v1/get-image/"
    return src+img
  }
  ngAfterViewInit() {
    const swiper = new Swiper('.swiper-container', {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      centeredSlides: true,
      grabCursor: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
    });
  }
}
