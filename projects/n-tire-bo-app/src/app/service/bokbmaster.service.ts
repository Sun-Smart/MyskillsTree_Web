import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bokbmaster } from '../model/bokbmaster.model';
import { bokbaccess } from '../model/bokbaccess.model';
import { bokbtopic } from '../model/bokbtopic.model';
import { environment } from '../../environments/environment';
import { IbokbmasterResponse } from '../model/bokbmaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bokbmasterService {
  formData: bokbmaster;
  readonly rootURL = AppConstants.baseURL;
  bokbaccesses: bokbaccess[]=[];
  Insertbokbaccesses: bokbaccess[]=[];
  bokbtopics: bokbtopic[]=[];
  list: bokbmaster[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebokbmasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      bokbaccesses: this.Insertbokbaccesses.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      bokbtopics: this.bokbtopics.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireboURL + '/bokbmaster', body);
  }
  }

  saveOrUpdatebokbmastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/bokbmaster', body);
  }
  }

  getbokbmastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bokbmaster').toPromise();
  }
  }
  getListBykbid(kbid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bokbmaster'+'/kbid/'+kbid).toPromise();
  }
  }

  getListBykbcategory(kbcategory:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bokbmaster'+'/kbcategory/'+kbcategory).toPromise();
  }
  }

  getListBykbsubcategory(kbsubcategory:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bokbmaster'+'/kbsubcategory/'+kbsubcategory).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bokbmaster'+'/param/'+key).toPromise();
  }
  }


  getbokbmastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bokbmaster'+'/e/'+id).toPromise();
  }
  }
  getbokbmastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bokbmaster'+'/'+id).toPromise();
  }
  }

  deletebokbmaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/bokbmaster'+'/'+id).toPromise();
  }
  }
clearList(){
this.bokbaccesses = [];
this.bokbtopics = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/bokbmaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

