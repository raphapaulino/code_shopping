import { Injectable } from "@angular/core"
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyMessageService } from 'src/app/services/notify-message.service';
import { UserListComponent } from './user-list.component';

@Injectable({
    providedIn: 'root'
})
export class UserEditService {

    private _userListComponent: UserListComponent;

    constructor(private notifyMessage: NotifyMessageService) {
    }

    set userListComponent(value: UserListComponent) {
        this._userListComponent = value;
    }

    showModalEdit(userId: number) {
        this._userListComponent.userId = userId;
        console.log(this._userListComponent.userEditModal);
        this._userListComponent.userEditModal.showModal();
    }

    onEditSuccess($event: any) {
        console.log($event);
        this.notifyMessage.success('Usuário editado com sucesso.');
        this._userListComponent.getUsers();
    }

    onEditError($event: HttpErrorResponse) {
        console.log($event);
        this.notifyMessage.error('Erro ao tentar registrar o novo Usuário.');
    }
}