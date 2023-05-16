import { EventEmitter, Injectable } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Subject } from 'rxjs';
import { Grocery } from '../../models/interface';
import { ApiService } from '../Api service/api.service';
import { EncryptionService } from '../encryption/encryption.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private route:ActivatedRoute, private apiService:ApiService, private encryptionService:EncryptionService) { }
 
  products = [
    {
      img:"../assets/image 3.png",
      category:"vegetable",
      productName:"Redish 500g",
      store:"Mr Food",
      price:3.99,
      discountedPrice:2
    },{
      img:"../assets/image 3.png",
      category:"vegetable",
      productName:"Redish 500g",
      store:"Mr Food",
      price:3.99,
      discountedPrice:2
    },{
      img:"../assets/image 3.png",
      category:"vegetable",
      productName:"Redish 500g",
      store:"Mr Food",
      price:3.99,
      discountedPrice:2
    },{
      img:"../assets/image 3.png",
      category:"vegetable",
      productName:"Redish 500g",
      store:"Mr Food",
      price:3.99,
      discountedPrice:2
    },
    {
      img:"../assets/image 3.png",
      category:"vegetable",
      productName:"Redish 500g",
      store:"Mr Food",
      price:3.99,
      discountedPrice:2
    },{
      img:"../assets/image 3.png",
      category:"vegetable",
      productName:"Redish 500g",
      store:"Mr Food",
      price:3.99,
      discountedPrice:2
    },{
      img:"../assets/image 3.png",
      category:"vegetable",
      productName:"Redish 500g",
      store:"Mr Food",
      price:3.99,
      discountedPrice:2
    },{
      img:"../assets/image 3.png",
      category:"vegetable",
      productName:"Redish 500g",
      store:"Mr Food",
      price:3.99,
      discountedPrice:2
    },{
      img:"../assets/image 3.png",
      category:"vegetable",
      productName:"Redish 500g",
      store:"Mr Food",
      price:3.99,
      discountedPrice:2
    },{
      img:"../assets/image 3.png",
      category:"vegetable",
      productName:"Redish 500g",
      store:"Mr Food",
      price:3.99,
      discountedPrice:2
    },
  ]
  exploreCategories = [
    {
      img:"../assets/image 3.png",
      category:"Vegetables",
      numberOfItems:"20"
    },
    {
      img:"../assets/image 3.png",
      category:"Fruits",
      numberOfItems:"20"
    },
    {
      img:"../assets/image 3.png",
      category:"Meat",
      numberOfItems:"20"
    },
    {
      img:"../assets/image 3.png",
      category:"Fruits",
      numberOfItems:"20"
    },
    {
      img:"../assets/image 3.png",
      category:"Meat",
      numberOfItems:"20"
    },
    {
      img:"../assets/image 3.png",
      category:"Vegetables",
      numberOfItems:"20"
    },
    {
      img:"../assets/image 3.png",
      category:"Fruits",
      numberOfItems:"20"
    }
  ]
  
  categories=["All","Vegetables","Fruits","Coffee & Teas","Meat"]
  
    productByCategory:any;
    getProductByCategories(id:any){
       this.encryptionService.Encryption(id).subscribe((res:any)=>{
        if(res){

          this.apiService.getProductsByCategories(res.data).subscribe((res:any)=>{
            if(res){  
              this.productByCategory = res.data
            }
          })
        }
      })
      return this.productByCategory
    }
    filteredProducts(duplicateProducts:any, urlCategory:string) {
      if (urlCategory == "All") {
        return duplicateProducts;
      } else {
        return duplicateProducts.filter((product:any) => product.category === urlCategory);
      }
    }
    
    //  this function is for unique stores from filtered stores
    
  storesFilterData(urlCategory:string){
   let stores: string[]=[];
  const products = this.filteredProducts(this.products, urlCategory);
  products.forEach((element:any) => {
    if(!stores.includes(element.store)){
      stores.push(element.store)
    }
  });
  // console.log(stores);
  return stores;
}
searchTerm: string; 
filteredProductsBasedOnCategory:any[]=[];
// get products based on the category

onFilterProducts: EventEmitter<any> = new EventEmitter();
  filterProducts(searchTerm: string, category:string) {
    this.apiService.getAllProducts()?.subscribe((res: any) => {
      if (res) {
        console.log(res.data, 'res');
        console.log(searchTerm, 'search');
        console.log(category,'cvategory')
        if(category!="All" && searchTerm){ 
          this.filteredProductsBasedOnCategory = res.data.filter(
            (product: any) =>
            product.title.toLowerCase().includes(searchTerm?.toLowerCase()) && product.categoryArrayFromBody[0].category.title == category
            );
          }
          else{
            if(searchTerm){
              this.filteredProductsBasedOnCategory = res.data.filter(
                (product: any) =>
                product.title.toLowerCase().includes(searchTerm?.toLowerCase()) 
                );
              }
              else{
                this.filteredProductsBasedOnCategory = res.data.filter(
                  (product:any)=>
                  product.categoryArrayFromBody[0].category.title == category
                )
              }
    }
            console.log(
          this.filteredProductsBasedOnCategory,
          'filteredProductsBasedOnCategory'
        );
        this.onFilterProducts.emit(this.filteredProductsBasedOnCategory);
      }
    });
  }
  
selectedCategory:string='';

//  sortGroceriesByRating(): Grocery[] {
//   let sortedGroceries = this.groceryList.sort((a, b) => {
//     if (a.rating !== undefined && b.rating !== undefined) {
//       return b.rating - a.rating;
//     }
//     // handle the case when one or both ratings are undefined
//     // for example, you can sort by name or price instead
//     return a.grocery_name.localeCompare(b.grocery_name);
//   });
//   return sortedGroceries.slice(0,3);
// }

product:any
   matchProduct(id:number){
    this.encryptionService.Encryption(JSON.stringify(id)).subscribe((res:any)=>{
      if(res){
        console.log(res.data);
        let encryptedId = res.data;
        this.apiService.getProductsById(encryptedId)?.subscribe(
          {next:(res:any)=>{
            if(res){
              console.log(res.data)
              this.product = res.data
            }
          },
          error:(err:any)=>{
            console.log(err);
          }})
        }
    })
    // console.log(id);
    // this.apiService.getAllProducts().subscribe((res:any)=>{
    //   console.log(res.data)
    //   this.product = res.data
    // })
    // let products = this.product.find((res:any)=>{
    //   return res.id === id;
    // })
    // console.log(this.product,'peoeorrj')
    return this.product;
   }
   allProducts = new Subject<any>();
   allProducts$ = this.allProducts.asObservable();
  }


