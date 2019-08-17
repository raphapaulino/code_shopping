import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs/internal/Observable';
import { Category } from 'src/app/model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  public baseUrl = 'http://localhost:8000/api';

  public categories = [];

  constructor(private httpClient: HttpClient) { 

  }

  ngOnInit() {
    this.getCategory();
  }

  getCategory() {
  // getCategory(): Observable<{ data: Array<Category> }> {
  // getCategory() {

    const token = window.localStorage.getItem('token');
    this.httpClient
      .get<{ data: Array<Category> }>
      (`${this.baseUrl}/categories`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .subscribe(response => {
        console.log(response.data);
        this.categories = response.data;
      });

  }

}
