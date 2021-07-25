import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';

import {Catagory} from './catagory.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable()
export class CatagoryService {
  
  constructor(private http: HttpClient){ }
  
  public _refreshNeeded$ : BehaviorSubject<any> = new BehaviorSubject(null);

  get refreshNeeded$(){
       return this._refreshNeeded$;
  }
  
  getCatagories(): Observable<Catagory[]>{

      return this.http.get<Catagory[]>("http://localhost:3000/catagories/")

  }

  addCatagory(newCatagory:any): Observable<Catagory[]>{
        
      var headers = new HttpHeaders();
      headers.append('content-type','application/json');
      return this.http.post<Catagory[]>("http://localhost:3000/catagories",newCatagory,{headers:headers})
              .pipe(
                  tap(()=> {
                      this._refreshNeeded$.next(newCatagory);
                  })
              );       
  } 
 
  deleteCatagory(id:any){

       return this.http.delete('http://localhost:3000/catagories/'+id)
            .pipe(map((res: any) => res.json()));
            
  }
 
  updateCatagory(editCatagory:any){

         var headers = new HttpHeaders();
         headers.append('content-type','application/json');
         return this.http.patch('http://localhost:3000/catagories/'+editCatagory._id,editCatagory,{headers:headers})
  }

}