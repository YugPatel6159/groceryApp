import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CartService } from '../../shared/services/cartservice/cart.service';
import { ProductService } from '../../shared/services/productservice/product.service';
import { ApiService } from 'src/app/shared/services/Api service/api.service';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  customerDetails: any;
  tokenValue: boolean = false;
  urlCategory: string;
  constructor(
    private service: ProductService,
    private cartService: CartService,
    private router: Router,
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    ) {
      this.router.events.subscribe((res:any)=>{
        if(res.url){
          this.subtotalAndlength();
        this.name = localStorage.getItem('user')
        // this.urlCategory = category;
      }

    })
    // this.route.paramMap.subscribe((res)=>
    // // this.urlCategory = res['i']
    // console.log(res.get('i'),'res')
    // )
    // console.log(this.urlCategory,'urlcategory')
  }

  uniqueCategories: any;
  category!: string;
  searchTerm!: string;
  cartLength!: number ;
  grandTotal = 0;
  token: any;
  userDetails: any;
  name: any;

  ngOnInit() {
    this.getAllCategories();
    this.getCustomerDetails();
    this.tokenExist();
    this.getCustomerDetails();
    console.log(this.urlCategory,'urlcategory')

    this.service.filterProducts(this.searchTerm,this.urlCategory);
    this.cartService.header$.subscribe((res) => {
      if (res) {
        this.tokenValue = res;
      }
    });
  }

  getAllCategories() {
    this.apiService.getAllCategories()?.subscribe((res: any) => {
      if (res) {
        console.log(res.data);
        this.uniqueCategories = res.data;
      }
    });
  }

  tokenExist() {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.tokenValue = true;
    } else {
      this.tokenValue = false;
    }
  }

  subtotalAndlength() {
    this.grandTotal = JSON.parse(localStorage.getItem('finalSubTotal'));
    this.cartLength = JSON.parse(localStorage.getItem('length'));
    this.cartService.cartLengths$.subscribe((res: any) => {
    this.cartLength = res;
  
    });
    this.cartService.subTotal$.subscribe((res: any) => {
      this.grandTotal = res;
    });
  }

  categoryChange(event: any) {
    this.category = event.target.value;
    console.log(this.category,'categortuwndcfcfh')
  }

  allCategories() {
    this.service.searchTerm = '';
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
    this.router.navigate(['/catalogue/categories/All']);
  }

  onSubmit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
    this.service.filterProducts(this.searchTerm,this.category);
    // console.log(this.service.filterProducts(this.searchTerm,this.category), 'searchProduce');
    this.service.searchTerm = this.searchTerm;
    const route = `/catalogue/search-categories/${this.category === undefined && 'All categories' ? 'All' : this.category
      }`;
    this.router.navigate([route]);
    this.searchTerm='';
  }

  getCustomerDetails() {
    if (this.token) {
      this.name = localStorage.getItem('user');
    }
  }

  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('customerId');
    this.router.navigate(['']);
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.tokenValue = true;
    } else {
      this.tokenValue = false;
    }
  }
}
