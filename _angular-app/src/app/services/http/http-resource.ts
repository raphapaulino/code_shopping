import { Observable } from 'rxjs/internal/Observable';
import { Product } from 'src/app/model';

export interface SearchParams {
    page?: number;
    all?: any;
}

export class SearchParamsBuilder {
    constructor(private searchParams: SearchParams) {

    }

    makeObject(): SearchParams {
        const sParams: any = {
            page: this.searchParams.page + "", // macete para transformar em string
        };
        if (this.searchParams.all) {
            sParams.all = '1';
            delete sParams.page; // para não precisar passar a paginação
        }
        return sParams;
    }
}

export interface HttpResource<T> {

    list(searchParams: SearchParams): Observable<{ data: Array<T>, meta: any }>;

    get(id: number): Observable<T>;

    create(data: T): Observable<T>;

    update(id: number, data: T): Observable<T>;

    destroy(id: number): Observable<any>;

}

// abstract class BaseHttp<T> implements HttpResource<T> {

//     abstract baseUrl();

//     list(page: number): Observable<{ data: Array[T]; meta: any; }> {
//         const token = window.localStorage.getItem('token');
//         const params = new HttpParams({
//             fromObject: {
//                 page: page + "" // macete para transformar em string
//             }
//         });
//         return this.httpClient
//             .get<{ data: Array<T>, meta: any }>
//             (this.baseUrl(), {
//                 params,
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });
//     }

//     get(id: number): Observable<T> {
//         // throw new Error("Method not implemented.");
//         return undefined;
//     }

//     create(data: T): Observable<T> {
//         // throw new Error("Method not implemented.");
//         return undefined;
//     }

//     update(id: number, data: T): Observable<T> {
//         // throw new Error("Method not implemented.");
//         return undefined;
//     }

//     destroy(id: number): Observable<any> {
//         // throw new Error("Method not implemented.");
//         return undefined;
//     }
// }