import { Injectable } from "@angular/core"
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyMessageService } from 'src/app/services/notify-message.service';
import { UserListComponent } from './user-list.component';

@Injectable({
    providedIn: 'root'
})
export class UserInsertService {

    private _userListComponent: UserListComponent;

    constructor(private notifyMessage: NotifyMessageService) {
    }

    set userListComponent(value: UserListComponent) {
        this._userListComponent = value;
    }

    showModalInsert() {
        this._userListComponent.userNewModal.showModal();
    }

    onInsertSuccess($event: any) {
        console.log($event);
        this.notifyMessage.success('Usuário cadastrado com sucesso.');
        this._userListComponent.getUsers();
    }

    onInsertError($event: HttpErrorResponse) {
        console.log($event);
        this.notifyMessage.error('Erro ao tentar registrar o novo Usuário.');
    }
}