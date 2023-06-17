import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { error } from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'deepaksahoo.in ';
  users:any = [];
  fruits:any = [];
  //apiPath = "http://localhost:8081";
  //apiPath = "http://deepaksahoo.in:8081";
  apiPath = "http://deepaksahoo.in/api";

  constructor(private http: HttpClient) {
    this.loadData();
  }

  loadData() {
    this.http.get(this.apiPath + "/users-array").subscribe(response => {
      console.log(response);
      this.users = response;
    },
    (error:any) =>{
      console.log(error)
      alert('Could not access the api  : '+ error.status);
    });


    this.http.get(this.apiPath + "/get-fruits").subscribe(response => {
      console.log(response);
      this.fruits = response;
    },
    (error:any) =>{
      console.log(error)
      alert('Could not access the api  : '+ error.status);
    });
  }

  insertMany(){
    let reqbody = [{ id: 1, name: "apple", origin: "usa", price: 5 },
    { id: 2, name: "orange", origin: "italy", price: 3 },
    { id: 3, name: "mango", origin: "malaysia", price: 3 },
    { id: 4, name: "banana", origin: "India", price: 30 }
    ];
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'});
    let options = { headers: headers };

    this.http.post(this.apiPath + "/insert-many",reqbody,options).subscribe(response => {
      this.loadData();
    },
    (error:any) =>{
      console.log(error)
      alert('Could not access the api  : '+ error.status);
    });
  }

  updateBanana(){
    let reqbody = { id: 4, name: "banana", origin: "India", price: 90 };
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'});
    let options = { headers: headers };

    this.http.post(this.apiPath + "/update-record",reqbody,options).subscribe(response => {
      this.loadData();
    },
    (error:any) =>{
      console.log(error)
      alert('Could not access the api  : '+ error.status);
    });
  }
}
