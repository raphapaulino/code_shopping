import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/model';
import { HttpResource, SearchParams, SearchParamsBuilder } from './http-resource';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductHttpService implements HttpResource<Product> {

    private baseUrl = `${environment.api.url}/products`;

    constructor(private httpClient: HttpClient) { }

    list(searchParams: SearchParams): Observable<{ data: Array<Product>, meta: any }> {
        const token = window.localStorage.getItem('token');
        const sParams = new SearchParamsBuilder(searchParams).makeObject(); 
        const params = new HttpParams({
            fromObject: (<any>sParams)
        });
        return this.httpClient
            .get<{ data: Array<Product>, meta: any }>
            (this.baseUrl, {params});
    }

    get(id: number): Observable<Product> {
        const token = window.localStorage.getItem('token');
        return this.httpClient
            .get<{ data: Product }>
            (`${this.baseUrl}/${id}`)
            .pipe(
                map( response => response.data )
            ) // associado ao conceito de pipeline (segmentação de tarefas);
    }

    create(data: Product): Observable<Product> {
        const token = window.localStorage.getItem('token');
        return this.httpClient
            .post<{ data: Product }>
            (this.baseUrl, data)
            .pipe(
                map( response => response.data )
            )
    }

    update(id: number, data: Product): Observable<Product> {
        const token = window.localStorage.getItem('token');
        return this.httpClient
            .put<{ data: Product }>
            (`${this.baseUrl}/${id}`, data)
            .pipe(
                map( response => response.data )
            )
    }

    destroy(id: number): Observable<any> {
        const token = window.localStorage.getItem('token');
        return this.httpClient
            .delete
            (`${this.baseUrl}/${id}`)
    }
}
