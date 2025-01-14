import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Court } from '../model/court';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourtService {

  constructor(private httpClient:HttpClient) { }

  baseUrl = 'http://localhost:8080/Demo5/api/courts';
  
  public getAllCourts():Observable<CourtResponse>{
    return this.httpClient.get<CourtResponse>(this.baseUrl);
  }
  public getCourt(id:any):Observable<Court>{
    return this.httpClient.get<Court>(`${this.baseUrl}/${id}`);
  }
  public updateCourt(court:Court):Observable<any>{
    return this.httpClient.put(`${this.baseUrl}/${court.id}`,court);
  }
  public addCourt(court:Court):Observable<any>{
    return this.httpClient.post(this.baseUrl,court);
  }
  public deleteCourt(id:any):Observable<any>{
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }
  public findByArea(area:string):Observable<CourtResponse>{
    return this.httpClient.get<CourtResponse>(`${this.baseUrl}/search/findByArea?area=${area}`);
  }
  

}
interface CourtResponse{
    _embedded:{
      courts:Court[],
      link:{self:{href:string}}
    }
  }