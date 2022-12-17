import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bofaq } from '../model/bofaq.model';
import { environment } from '../../environments/environment';
import { IbofaqResponse } from '../model/bofaq.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bofaqService {
  formData: bofaq;
  readonly rootURL = AppConstants.baseURL;
  list: bofaq[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebofaqs():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/bofaq', body);
  }
  }

  saveOrUpdatebofaqsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/bofaq', body);
  }
  }

  getbofaqsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bofaq').toPromise();
  }
  }
  getListByfaqid(faqid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bofaq'+'/faqid/'+faqid).toPromise();
  }
  }

  getListBysourcereference(sourcereference:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bofaq'+'/sourcereference/'+sourcereference).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bofaq'+'/param/'+key).toPromise();
  }
  }


  getbofaqsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bofaq'+'/e/'+id).toPromise();
  }
  }
  getbofaqsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bofaq'+'/'+id).toPromise();
  }
  }

  deletebofaq(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/bofaq'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/bofaq')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

