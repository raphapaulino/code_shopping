import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Observable } from 'rxjs/internal/Observable';
import { Category } from 'src/app/model';
import { CategoryNewModalComponent } from '../category-new-modal/category-new-modal.component';
import { CategoryEditModalComponent } from '../category-edit-modal/category-edit-modal.component';
import { CategoryDeleteModalComponent } from '../category-delete-modal/category-delete-modal.component';

declare const $;

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

    public baseUrl = 'http://localhost:8000/api';

    public categories: Array<Category> = [];

    @ViewChild(CategoryNewModalComponent) 
    categoryNewModal: CategoryNewModalComponent;

    @ViewChild(CategoryEditModalComponent) 
    categoryEditModal: CategoryEditModalComponent;

    @ViewChild(CategoryDeleteModalComponent) 
    categoryDeleteModal: CategoryDeleteModalComponent;

    categoryId: number;

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

    showModalInsert() {
        this.categoryNewModal.showModal();
    }

    onInsertSuccess($event: any) {
        console.log($event);
        this.getCategories();
    }

    onInsertError($event: HttpErrorResponse) {
        console.log($event);
    }

    showModalEdit(categoryId: number) {
        this.categoryId = categoryId;
        this.categoryEditModal.showModal();
    }

    onEditSuccess($event: any) {
        console.log($event);
        this.getCategories();
    }

    onEditError($event: HttpErrorResponse) {
        console.log($event);
    }

    showModalDelete(categoryId: number) {
        this.categoryId = categoryId;
        this.categoryDeleteModal.showModal();
    }

    onDeleteSuccess($event: any) {
        console.log($event);
        this.getCategories();
    }

    onDeleteError($event: HttpErrorResponse) {
        console.log($event);
    }
}
