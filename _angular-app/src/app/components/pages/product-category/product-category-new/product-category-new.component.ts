import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Category, ProductCategory } from 'src/app/model';
import { CategoryHttpService } from 'src/app/services/http/category-http.service';
import { ProductCategoryHttpService } from 'src/app/services/http/product-category-http.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'product-category-new',
  templateUrl: './product-category-new.component.html',
  styleUrls: ['./product-category-new.component.css']
})
export class ProductCategoryNewComponent implements OnInit {

    categories: Category[] = [];
    categoriesId: number[] = [];

    @Input()
    productId: number;
    @Input()
    productCategory: ProductCategory = null;
    
    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

    constructor(private categoryHttp: CategoryHttpService,
                private productCategoryHttp: ProductCategoryHttpService) { }

    ngOnInit() {
        this.getCategories();
    }

    // change($event) {
    //     console.log($event);
    // }
    change() {
        console.log(this.categoriesId);
    }

    getCategories() {
        this.categoryHttp.list({all: 1})
            .subscribe(response => {
                this.categories = response.data;
            });
    }

    submit() {
        const categoriesId = this.mergeCategories();
        this.productCategoryHttp
            .create(this.productId, categoriesId)
            .subscribe(productCategory => this.onSuccess.emit(productCategory), 
                        error => this.onError.emit(error));
        return false;
    }

    // método criado para evitar a duplicação 
    private mergeCategories(): number[] {
        //[ {}, {}, {}]
        //[1, 4, 5]
        const categoriesId = this.productCategory.categories.map((category) => category.id);
        const newCategoriesId = this.categoriesId.filter(category => { // [2, 3]
            return categoriesId.indexOf(category) == -1; // lógica para pegar apenas os elementos que não estão presentes dentro do array escolhido
        });
        return categoriesId.concat(newCategoriesId);
    }

}
