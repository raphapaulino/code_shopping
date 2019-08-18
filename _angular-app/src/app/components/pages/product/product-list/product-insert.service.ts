import { Injectable } from "@angular/core"
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyMessageService } from 'src/app/services/notify-message.service';
import { ProductListComponent } from './product-list.component';

@Injectable({
    providedIn: 'root'
})
export class ProductInsertService {

    private _productListComponent: ProductListComponent;

    constructor(private notifyMessage: NotifyMessageService) {
    }

    set productListComponent(value: ProductListComponent) {
        this._productListComponent = value;
    }

    showModalInsert() {
        this._productListComponent.productNewModal.showModal();
    }

    onInsertSuccess($event: any) {
        console.log($event);
        this.notifyMessage.success('Produto cadastrado com sucesso.');
        this._productListComponent.getCategories();
    }

    onInsertError($event: HttpErrorResponse) {
        console.log($event);
        this.notifyMessage.error('Erro ao tentar registrar o novo Produto.');
    }
}