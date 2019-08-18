import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Observable } from 'rxjs/internal/Observable';
import { Category } from 'src/app/model';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';

declare const $;

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

    public baseUrl = 'http://localhost:8000/api';

    public categories: Array<Category> = [];

    public category = {
        name: '',
        active: false
    }

    @ViewChild(ModalComponent, {static: false})  modal: ModalComponent;

    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

    constructor(private httpClient: HttpClient) { }

    ngOnInit() {
        this.getCategories();
    }

    // getCategories(): Observable<{ data: Array<Category> }> {
    getCategories() {
        const token = window.localStorage.getItem('token');
        this.httpClient
            .get<{ data: Array<Category> }>
            (`${this.baseUrl}/categories`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .subscribe(response => {
                this.categories = response.data;
            });
    }

    showModal() {
        this.modal.show();
    }

    hideModal($event: Event) {
        console.log($event);
    }

    submit() {
        const token = window.localStorage.getItem('token');
        this.httpClient
            .post<{ data: Category }>
            (`${this.baseUrl}/categories`, this.category, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).subscribe((category) => {
                // $('#exampleModal').modal('hide')
                console.log(category);
                this.onSuccess.emit(category);
                this.getCategories();
                this.modal.hide();
            }, error => this.onError.emit(error));
    }

    onInsertSuccess($event: any) {
        console.log($event);
        this.getCategories();
    }

}
