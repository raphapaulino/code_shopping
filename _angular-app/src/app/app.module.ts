import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/pages/login/login.component';
import { CategoryListComponent } from './components/pages/category/category-list/category-list.component';

import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ModalComponent } from './components/bootstrap/modal/modal.component';
import { CategoryNewModalComponent } from './components/pages/category/category-new-modal/category-new-modal.component';

const routes: Routes = [
	{
		path: 'login', component: LoginComponent
	},
	{
		path: 'categories/list', component: CategoryListComponent
	},
	{
		path: '',
		redirectTo: '/login',
		pathMatch: 'full'
	}
]

// ES7 - JavaScript
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CategoryListComponent,
    ModalComponent,
    CategoryNewModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
