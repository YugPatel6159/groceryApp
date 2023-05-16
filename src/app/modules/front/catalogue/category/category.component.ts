import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ProductService } from 'src/app/shared/services/productservice/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/shared/services/cartservice/cart.service';
import { ApiService } from 'src/app/shared/services/Api service/api.service';
import { EncryptionService } from 'src/app/shared/services/encryption/encryption.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  cartLength: any;
  productByCategory: any;
  userId: any;
  cartToggle: boolean = false;
  crtArray: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private proService: ProductService,
    private cartService: CartService,
    private apiService: ApiService,
    private encryptionService: EncryptionService,
    private router: Router
  ) {}
  product: any;
  urlCategory: string = '';
  uniqueItems: any[] = [];
  filteredProducts = this.proService.filteredProducts;
  filterToggle: boolean = false;

  ngOnInit() {
    this.proService.onFilterProducts.subscribe((filteredProducts: any[]) => {
      this.productByCategory = filteredProducts;
    });
    this.route.params.subscribe((params) => {
      this.urlCategory = params['i'];
      this.proService.filterProducts('', this.urlCategory);
      if (this.urlCategory == 'All' || this.urlCategory == '') {
        this.allCategory();
      } else {
        this.otherThanAllCategory(); // this.getProductByCategories(this.urlCategory);
      }
    });
    console.log(this.urlCategory, 'urlcategory');
    this.getAllCategories();
    window.scrollTo(0, 0);
  }
  filteredCategory: any[] = [];
  onChangeCategory(event: any) {
    console.log(event.target.value, 'targetted');
    this.apiService.getAllProducts()?.subscribe((res: any) => {
      if (this.filteredCategory.includes(event.target.value)) {
        this.filteredCategory.splice(
          this.filteredCategory.indexOf(event.target.value),
          1
        );
      } else {
        this.filteredCategory.push(event.target.value);
      }
      this.productByCategory = res.data.filter((item: any) =>
        item.categoryArrayFromBody.some((category: any) =>
          this.filteredCategory.includes(category.category.title)
        )
      );
      if (this.filteredCategory.length == 0) {
        this.productByCategory = res.data;
      }
      // console.log(res.data, 'res.data');
    });
    console.log(this.productByCategory, 'productByCategory');
    console.log(this.filteredCategory, 'filtered');
  }

  getAllCategories() {
    this.apiService.getAllCategories()?.subscribe((res: any) => {
      if (res) {
        console.log(res.data, 'categories from filter');
        this.uniqueItems = res.data;
        console.log(this.uniqueItems, 'unique items');
      }
    });
  }

  allCategory() {
    this.apiService.getAllProducts()?.subscribe((res: any) => {
      if (res) {
        console.log('res.data', res.data);
        if (this.proService.searchTerm) {
          this.productByCategory = this.proService.filterProducts(
            this.proService.searchTerm,
            this.urlCategory
          );
          console.log(this.productByCategory, 'from aqall');
        } else {
          this.productByCategory = res.data;
          console.log('else');
        }
      }
    });
  }

  otherThanAllCategory() {
    let categories;
    this.apiService.getAllCategories()?.subscribe((res: any) => {
      if (res) {
        categories = res.data;
        console.log('res-data', res.data);
        let categoryId: any;
        categories.find((category: any) => {
          if (category.slug == this.urlCategory) {
            categoryId = category.id;
            console.log(categoryId);
            this.encryptionService
              .Encryption(JSON.stringify(categoryId))
              .subscribe((res) => {
                if (res) {
                  categoryId = res.data;
                }
                if (!this.proService.searchTerm) {
                  this.apiService
                    .getProductsByCategories(categoryId)
                    .subscribe((product: any) => {
                      if (product) {
                        this.productByCategory = product.data.map(
                          (product: any) => {
                            return product.product;
                          }
                        );
                      }
                    });
                } else {
                  this.productByCategory =
                    this.proService.filteredProductsBasedOnCategory;
                }
                console.log('this.product', this.productByCategory);
              });
          }
        });
      }
    });
  }

  getProductByCategories(id: any) {
    this.encryptionService.Encryption(id).subscribe((res: any) => {
      if (res) {
        this.apiService
          .getProductsByCategories(res.data)
          .subscribe((res: any) => {
            if (res) {
              console.log('category wise', res.data);
              this.productByCategory = res.data;
            }
          });
      }
    });
  }

  routeToProductDetails(id: any, title: any) {
    this.router.navigate(['/product-details', id, title]);
  }

  // this is for displaying filter box

  display() {
    this.filterToggle = !this.filterToggle;
  }

  getUserDetails(product: any) {
    this.apiService.getUserDetails()?.subscribe({
      next: (data: any) => {
        if (data) {
          console.log(data);
          this.userId = data.data.id;
          console.log(this.userId, 'userid from category');
          this.cartService.addProductToCart(product, this.userId);
        }
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  showImage(img: any) {
    return 'http://localhost:8080/api/v1/get-image/' + img;
  }

  addProductToCart(product: any) {
    let cart = JSON.parse(localStorage.getItem('Cart'));
    let username = localStorage.getItem('user');
    console.log(cart, 'cart');
    let matchedUser = cart.find((res: any) => {
      return res.username === username;
    });
    console.log(matchedUser, 'matchedUser');
    this.cartService.getProducts(product, username);
  }

  priceRange: any[] = [
    {
      name: '1-50',
      minRange: 1,
      maxRange: 50,
    },
    {
      name: '51-100',
      minRange: 51,
      maxRange: 100,
    },
    {
      name: '101-200',
      minRange: 101,
      maxRange: 200,
    },
    {
      name: '201-500',
      minRange: 201,
      maxRange: 500,
    },
    {
      name: '501-1000',
      minRange: 501,
      maxRange: 1000,
    },
    {
      name: '1000+',
      minRange: 1000,
      maxRange: 100000000,
    },
  ];
  filteredPriceRange: any[] = [];
  onChangePrice(event: any) {
    this.apiService.getAllProducts()?.subscribe((res: any) => {
      if (res) {
        const findPriceRange = this.priceRange.find(
          (price: any) => price.name === event.target.value
        );
        if (this.filteredPriceRange.includes(findPriceRange)) {
          // Remove price range from filteredPriceRange
          this.filteredPriceRange.splice(
            this.filteredPriceRange.indexOf(findPriceRange),
            1
          );
        } else {
          // Add price range to filteredPriceRange
          this.filteredPriceRange.push(findPriceRange);
        }

        // Apply price range filter to current category filter
        let filteredProducts = res.data.filter((item: any) =>
          item.categoryArrayFromBody.some((category: any) =>
            this.filteredCategory.includes(category.category.title)
          )
        );

        if (this.filteredPriceRange.length > 0) {
          filteredProducts = filteredProducts.filter((item: any) => {
            return this.filteredPriceRange.some((priceRange: any) => {
              return (
                item.amount >= priceRange.minRange &&
                item.amount <= priceRange.maxRange
              );
            });
          });
        }

        // Update productByCategory with filtered products
        this.productByCategory = filteredProducts;

        // If no price or category filters applied, show all products
        if (
          this.filteredPriceRange.length === 0 &&
          this.filteredCategory.length === 0
        ) {
          this.productByCategory = res.data;
        }

        if (
          this.filteredPriceRange.length != 0 &&
          this.filteredCategory.length == 0
        ) {
          this.productByCategory = res.data.filter((item: any) => {
            return this.filteredPriceRange.some((priceRange: any) => {
              return (
                item.amount >= priceRange.minRange &&
                item.amount <= priceRange.maxRange
              );
            });
          });
        }
      }
    });
  }
}
