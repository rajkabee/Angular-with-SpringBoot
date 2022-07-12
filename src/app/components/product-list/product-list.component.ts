import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  currentCategoryId: number;
  products : Product[];

  constructor( private productService : ProductService,
                private route: ActivatedRoute
            ) {

            }


  ngOnInit() {
      this.route.paramMap.subscribe(()=>{
      this.listProducts();
    });

  }
  listProducts() {
    const hasCategoryId:boolean = this.route.snapshot.paramMap.has('id');
    if(hasCategoryId){
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    }
    else{
      this.currentCategoryId = 1;
    }
    this.productService.getProductList(this.currentCategoryId).subscribe(
    data => {
    this.products = data;
    }
    )
  }
}
