import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  public baseUrl = 'http://localhost:8000/api';

  public category = {
    name: '',
    active: true
  }

  constructor(private httpClient: HttpClient) { 

  }

  ngOnInit() {
    this.getCategory();
  }

  // getCategory(): Observable<{ data: Array<any>}> {
  getCategory() {

    const token = window.localStorage.getItem('token');
    this.httpClient
      .get(`${this.baseUrl}/categories`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .subscribe(response => {
        console.log(response.data);
      });

  }

}
