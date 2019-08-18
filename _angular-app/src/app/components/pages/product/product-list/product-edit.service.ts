import { Injectable } from "@angular/core"
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyMessageService } from 'src/app/services/notify-message.service';
import { ProductListComponent } from './product-list.component';

@Injectable({
    providedIn: 'root'
})
export class ProductEditService {

    private _productListComponent: ProductListComponent;

    constructor(private notifyMessage: NotifyMessageService) {
    }

    set productListComponent(value: ProductListComponent) {
        this._productListComponent = value;
    }

    showModalEdit(productId: number) {
        this._productListComponent.productId = productId;
        this._productListComponent.productEditModal.showModal();
    }

    onEditSuccess($event: any) {
        console.log($event);
        this.notifyMessage.success('Categoria editada com sucesso.');
        this._productListComponent.getCategories();
    }

    onEditError($event: HttpErrorResponse) {
        console.log($event);
        this.notifyMessage.error('Erro ao tentar registrar a nova Categoria.');
    }
}