import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { ProductHttpService } from 'src/app/services/http/product-http.service';
import { ProductCategoryHttpService } from 'src/app/services/http/product-category-http.service';
import { Product, ProductCategory } from 'src/app/model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.css']
})
export class ProductCategoryListComponent implements OnInit {

    productId: number;
    product: Product = null;
    productCategory: ProductCategory = null;

    constructor(private route: ActivatedRoute, 
                private productHttp: ProductHttpService,
                private productCategoryHttp: ProductCategoryHttpService) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.productId = params.product;
            this.getProduct();
            this.getProductCategory();
        });
    }

    getProduct() {
        this.productHttp
            .get(this.productId)
            .subscribe(product => this.product = product);
    }

    onInsertSuccess($event: ProductCategory) {
        console.log($event);
        this.getProductCategory();

        // this.notifyMessage.success('Categoria cadastrada com sucesso.');
        // this._categoryListComponent.getCategories();
    }

    getProductCategory() {
        this.productCategoryHttp
            .list(this.productId)
            .subscribe(productCategory => {
                this.productCategory = productCategory;
                console.log(this.productCategory)
            })
    }

    onInsertError($event: HttpErrorResponse) {
        console.log($event);
        // this.notifyMessage.error('Erro ao tentar registrar a nova Categoria.');
    }
}
