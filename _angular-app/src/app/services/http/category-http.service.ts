import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable'
import { map } from 'rxjs/operators'
import { Category } from 'src/app/model';
import { HttpResource, SearchParams, SearchParamsBuilder } from './http-resource';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CategoryHttpService implements HttpResource<Category> {

    private baseUrl = `${environment.api.url}/categories`;

    constructor(private httpClient: HttpClient) { }

    list(searchParams: SearchParams): Observable<{ data: Array<Category>, meta: any }> {
        const token = window.localStorage.getItem('token');
        const sParams = new SearchParamsBuilder(searchParams).makeObject(); 
        const params = new HttpParams({
            fromObject: (<any>sParams)
        });
        return this.httpClient
            .get<{ data: Array<Category>, meta: any }>
            (this.baseUrl, {params});
    }

    get(id: number): Observable<Category> {
        const token = window.localStorage.getItem('token');
        return this.httpClient
            .get<{ data: Category }>
            (`${this.baseUrl}/${id}`)
            .pipe(
                map( response => response.data )
            ) // associado ao conceito de pipeline (segmentação de tarefas);
    }

    create(data: Category): Observable<Category> {
        const token = window.localStorage.getItem('token');
        return this.httpClient
            .post<{ data: Category }>
            (this.baseUrl, data)
            .pipe(
                map( response => response.data )
            )
    }

    update(id: number, data: Category): Observable<Category> {
        const token = window.localStorage.getItem('token');
        return this.httpClient
            .put<{ data: Category }>
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
