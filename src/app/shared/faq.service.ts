import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

import {Faq} from './faq.model';
import {Injectable} from '@angular/core';
import {BehaviorSubject,Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable()
export class FaqService {
  
  constructor(private http: HttpClient){ }
  
  public _refreshNeeded$ : BehaviorSubject<any> = new BehaviorSubject(null);

  get refreshNeeded$(){
       return this._refreshNeeded$;
  }
  
    getFaqs(): Observable<Faq[]>{

        return this.http.get<Faq[]>("http://localhost:3000/faqs/")

    }

    addFaq(newFaq:any): Observable<Faq[]>{
        
        var headers = new HttpHeaders();
        headers.append('content-type','application/json');
        return this.http.post<Faq[]>("http://localhost:3000/faqs",newFaq,{headers:headers})
                .pipe(
                    tap(()=> {
                        this._refreshNeeded$.next(newFaq);
                    })
                );       
    } 

    deleteFaq(id:any){

        return this.http.delete('http://localhost:3000/faqs/'+id)
            .pipe(map((res: any) => res.json()));
            
    }

    updateFaq(editFaq:any){

        var headers = new HttpHeaders();
        headers.append('content-type','application/json');
        return this.http.patch('http://localhost:3000/faqs/'+editFaq._id,editFaq,{headers:headers})
    }

}