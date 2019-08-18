import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryHttpService } from 'src/app/services/http/category-http.service';
import { Category } from 'src/app/model';

@Component({
  selector: 'category-delete-modal',
  templateUrl: './category-delete-modal.component.html',
  styleUrls: ['./category-delete-modal.component.css']
})
export class CategoryDeleteModalComponent implements OnInit {

    public baseUrl = 'http://localhost:8000/api';

    public category: Category = null;
    
    _categoryId: number;

    @ViewChild(ModalComponent) modal: ModalComponent;

    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();
    
    constructor(private categoryHttp: CategoryHttpService) { }

    ngOnInit() {
    }

    @Input()
    set categoryId(value) {
        this._categoryId = value;
        if (this._categoryId) {
            this.categoryHttp
                .get(this._categoryId)
                .subscribe(category => this.category = category);
        }
    }

    destroy() {
        this.categoryHttp
            .destroy(this._categoryId)
            .subscribe((category) => {
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
