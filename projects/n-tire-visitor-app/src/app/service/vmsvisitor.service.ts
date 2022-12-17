import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { vmsvisitor } from '../model/vmsvisitor.model';
import { environment } from '../../environments/environment';
import { IvmsvisitorResponse } from '../model/vmsvisitor.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class vmsvisitorService {
  formData: vmsvisitor;
  readonly rootURL = AppConstants.baseURL;
  list: vmsvisitor[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatevmsvisitors():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirevisitorURL + '/vmsvisitor', body);
  }
  }

  saveOrUpdatevmsvisitorsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirevisitorURL + '/vmsvisitor', body);
  }
  }

  getvmsvisitorsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirevisitorURL + '/vmsvisitor').toPromise();
  }
  }
  getListByvisitorid(visitorid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirevisitorURL + '/vmsvisitor'+'/visitorid/'+visitorid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirevisitorURL + '/vmsvisitor'+'/param/'+key).toPromise();
  }
  }


  getvmsvisitorsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirevisitorURL + '/vmsvisitor'+'/e/'+id).toPromise();
  }
  }
  getvmsvisitorsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirevisitorURL + '/vmsvisitor'+'/'+id).toPromise();
  }
  }

  deletevmsvisitor(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirevisitorURL + '/vmsvisitor'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirevisitorURL + '/vmsvisitor')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

