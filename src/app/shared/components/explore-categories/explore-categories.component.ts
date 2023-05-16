import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swiper from 'swiper';
import { ProductService } from '../../services/productservice/product.service';
import { ApiService } from '../../services/Api service/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-explore-categories',
  templateUrl: './explore-categories.component.html',
  styleUrls: ['./explore-categories.component.css'],
})
export class ExploreCategoriesComponent {
  constructor(
    private service: ProductService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {
    // this.totalCategories = this.service.categories;
    this.apiService.getAllCategories()?.subscribe((data: any) => {
      if (data) {
        this.totalCategories = data.data;
        console.log('categories', this.totalCategories);
      }
    });
  }
  exploreCategories = this.service.exploreCategories;
  totalCategories: any;
  categoryName: any;
  countByCategory:any
  groceryList = this.apiService.getAllProducts()?.subscribe((res:any)=>{
    console.log(res.data,'resaefsdaf')
    this.countByCategory = res.data.reduce((accumulator: any, currentItem) => {
      console.log(currentItem,'currentIte,')
      this.categoryName = currentItem.categoryArrayFromBody[0].category.title;
      accumulator[this.categoryName] = (accumulator[this.categoryName] || 0) + 1;
      return accumulator;
    }, {});
    // return res
    console.log(this.countByCategory,'this.countByCategory')
  });
  
  urlCategory: string = '';
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.urlCategory = params['i'];
    });
    // console.log(this.countByCategory)
  }
  allProductsbasedOnCategory(slug: any) {
    this.service.searchTerm = '';
    this.route.params.subscribe((params) => {
      // console.log
      this.router.navigate(['catalogue/categories', slug]);
    });
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
    this.router.navigate(['/catalogue/categories', slug]);
  }

  ngAfterViewInit() {
    const swiper = new Swiper('.swiper-container', {
      slidesPerView: 5,
      spaceBetween: 5,
      // loop: true,
      // centeredSlides: true,
      grabCursor: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
      },
    });
  }
  routeToCategoryProducts(slug: any) {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
    this.router.navigate(['/catalogue/categories', slug]);
  }
}
