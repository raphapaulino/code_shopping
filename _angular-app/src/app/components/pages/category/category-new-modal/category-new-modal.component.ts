import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Category } from 'src/app/model';

@Component({
  selector: 'category-new-modal',
  templateUrl: './category-new-modal.component.html',
  styleUrls: ['./category-new-modal.component.css']
})
export class CategoryNewModalComponent implements OnInit {

    public baseUrl = 'http://localhost:8000/api';

    public category = {
        name: '',
        active: false
    }
    
    @ViewChild(ModalComponent) modal: ModalComponent;

    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

    constructor(private httpClient: HttpClient) { }

    ngOnInit() {
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
                console.log(category);
                this.onSuccess.emit(category);
                this.modal.hide();
            }, error => this.onError.emit(error));
    }

    showModal() {
        this.modal.show();
    }

    hideModal($event: Event) {
        console.log($event);
    }

}
