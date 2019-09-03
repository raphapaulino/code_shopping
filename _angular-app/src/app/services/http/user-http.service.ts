import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { User } from 'src/app/model';
import { SearchParams, SearchParamsBuilder } from './http-resource';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {

    private baseUrl = `${environment.api.url}/users`;

    constructor(private httpClient: HttpClient) { }

    list(searchParams: SearchParams): Observable<{ data: Array<User>, meta: any }> {
        const sParams = new SearchParamsBuilder(searchParams).makeObject(); 
        const params = new HttpParams({
            fromObject: (<any>sParams)
        });
        return this.httpClient
            .get<{ data: Array<User>, meta: any }>
            (this.baseUrl, {params});
    }

    get(id: number): Observable<User> {
        return this.httpClient
            .get<{ data: User }>
            (`${this.baseUrl}/${id}`)
            .pipe(
                map( response => response.data )
            ) // associado ao conceito de pipeline (segmentação de tarefas);
    }

    create(data: User): Observable<User> {
        return this.httpClient
            .post<{ data: User }>
            (this.baseUrl, data)
            .pipe(
                map( response => response.data )
            )
    }

    update(id: number, data: User): Observable<User> {
        return this.httpClient
            .put<{ data: User }>
            (`${this.baseUrl}/${id}`, data)
            .pipe(
                map( response => response.data )
            )
    }

    destroy(id: number): Observable<any> {
        return this.httpClient
            .delete
            (`${this.baseUrl}/${id}`)
    }
}
