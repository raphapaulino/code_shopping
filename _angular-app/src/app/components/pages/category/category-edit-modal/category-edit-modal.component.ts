import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Category } from 'src/app/model';

@Component({
  selector: 'category-edit-modal',
  templateUrl: './category-edit-modal.component.html',
  styleUrls: ['./category-edit-modal.component.css']
})
export class CategoryEditModalComponent implements OnInit {

  public baseUrl = 'http://localhost:8000/api';

  public category = {
      name: '',
      active: false
  }
  
  _categoryId: number;

  @ViewChild(ModalComponent) modal: ModalComponent;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();
  
  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
  }

  @Input()
  set categoryId(value) {
    this._categoryId = value;
    const token = window.localStorage.getItem('token');
    if (this._categoryId) {
      this.httpClient
        .get<{ data: any }>
        (`${this.baseUrl}/categories/${value}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .subscribe((response) => this.category = response.data);
    }
  }

  submit() {
    const token = window.localStorage.getItem('token');
    this.httpClient
        .put<{ data: Category }>
        (`${this.baseUrl}/categories/${this._categoryId}`, this.category, {
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
