import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ProductCategory } from 'src/app/model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class ProductCategoryHttpService {

    private baseApi = 'http://localhost:8000/api';

    constructor(private httpClient: HttpClient) { }

    list(productId: number): Observable<ProductCategory> {
        const token = window.localStorage.getItem('token');
        return this.httpClient
            .get<{ data: ProductCategory }>
            // (this.baseUrl, {
            (this.getBaseUrl(productId), {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .pipe(
                map(response => response.data)
            );
    }

    create(productId: number, categoriesId: number[]): Observable<ProductCategory> { // retorno da api serializado
        const token = window.localStorage.getItem('token');
        return this.httpClient
            .post<{ data: ProductCategory }>
            // (this.baseUrl, {
            (this.getBaseUrl(productId), {categories: categoriesId}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .pipe(
                map(response => response.data)
            );
    }

    private getBaseUrl(productId: number, categoryId: number = null): string {
        let baseUrl = `${this.baseApi}/products/${productId}/categories`;
        if(categoryId) {
            baseUrl += `/${categoryId}`;
        }
        return baseUrl;
    }

}
