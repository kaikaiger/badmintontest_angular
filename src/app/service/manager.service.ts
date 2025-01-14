import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Manager } from '../model/manager';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private httpClient: HttpClient) { }

  baseUrl = 'http://localhost:8080/Demo5/api/managers';

  public getManager(id: any):Observable<Manager>{
    return this.httpClient.get<Manager>(`${this.baseUrl}/${id}`)
  }

}

interface ManagerResponse{
  _embedded:{
    manager:Manager[],
    link:{self:{href:string}}
  }
}
