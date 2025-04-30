import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})

export class UserService{
    private url = "http://localhost:5000";

    constructor(private http:HttpClient){
        
    }

    addUser(data:any):Observable<any>{
    return this.http.post(`${this.url}/create`,data)
    }

    getUsers():Observable<any>{
      return this.http.get(`${this.url}/get`)
    }
}