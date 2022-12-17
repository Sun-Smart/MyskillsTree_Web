import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hlpcapacityplan } from '../model/hlpcapacityplan.model';
import { environment } from '../../environments/environment';
import { IhlpcapacityplanResponse } from '../model/hlpcapacityplan.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hlpcapacityplanService {
  formData: hlpcapacityplan;
  readonly rootURL = AppConstants.baseURL;
  list: hlpcapacityplan[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehlpcapacityplans():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehelpdeskURL + '/hlpcapacityplan', body);
  }
  }

  saveOrUpdatehlpcapacityplansList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehelpdeskURL + '/hlpcapacityplan', body);
  }
  }

  gethlpcapacityplansList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpcapacityplan').toPromise();
  }
  }
  getListBycapacityplanid(capacityplanid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpcapacityplan'+'/capacityplanid/'+capacityplanid).toPromise();
  }
  }

  getListBysourcereference(sourcereference:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpcapacityplan'+'/sourcereference/'+sourcereference).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpcapacityplan'+'/param/'+key).toPromise();
  }
  }


  gethlpcapacityplansByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpcapacityplan'+'/e/'+id).toPromise();
  }
  }
  gethlpcapacityplansByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpcapacityplan'+'/'+id).toPromise();
  }
  }

  deletehlpcapacityplan(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehelpdeskURL + '/hlpcapacityplan'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehelpdeskURL + '/hlpcapacityplan')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

