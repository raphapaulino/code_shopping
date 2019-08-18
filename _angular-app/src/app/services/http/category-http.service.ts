import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable'
import { map } from 'rxjs/operators'
import { Category } from 'src/app/model';

@Injectable({
    providedIn: 'root'
})
export class CategoryHttpService {

    private baseUrl = 'http://localhost:8000/api/categories';

    constructor(private httpClient: HttpClient) { }

    list(): Observable<{ data: Array<Category> }> {
        const token = window.localStorage.getItem('token');
        return this.httpClient
            .get<{ data: Array<Category> }>
            (this.baseUrl, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    }

    get(id: number): Observable<Category> {
        const token = window.localStorage.getItem('token');
        return this.httpClient
            .get<{ data: Category }>
            (`${this.baseUrl}/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .pipe(
                map( response => response.data )
            ) // associado ao conceito de pipeline (segmentação de tarefas);
    }

    create(data: Category): Observable<Category> {
        const token = window.localStorage.getItem('token');
        return this.httpClient
            .post<{ data: Category }>
            (this.baseUrl, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .pipe(
                map( response => response.data )
            )
    }

    update(id: number, data: Category) {
        const token = window.localStorage.getItem('token');
        return this.httpClient
            .put<{ data: Category }>
            (`${this.baseUrl}/${id}`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .pipe(
                map( response => response.data )
            )
    }

    destroy(id: number): Observable<any> {
        const token = window.localStorage.getItem('token');
        return this.httpClient
            .delete
            (`${this.baseUrl}/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
    }

}