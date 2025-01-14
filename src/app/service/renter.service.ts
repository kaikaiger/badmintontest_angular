import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Renter } from '../model/renter';

@Injectable({
  providedIn: 'root'
})
export class RenterService {

  constructor(private httpClient:HttpClient) { }

  baseUrl = 'http://localhost:8080/Demo5/api/renters';

  public getRenter(id:any):Observable<Renter>{
      return this.httpClient.get<Renter>(`${this.baseUrl}/${id}`);
  }
  public addRenter(renter:Renter):Observable<any>{
      return this.httpClient.post(this.baseUrl,renter);
  }
  public findByPhone(phone:string):Observable<Renter>{
      return this.httpClient.get<Renter>(`${this.baseUrl}/search/findByPhone?phone=${phone}`);
  }
}

interface RentersResponse{
    _embedded:{
      renters:Renter[],
      link:{self:{href:string}}
    }
}
