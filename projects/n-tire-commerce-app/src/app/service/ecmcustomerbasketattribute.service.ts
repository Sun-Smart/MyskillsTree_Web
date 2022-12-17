import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ecmcustomerbasketattribute } from '../model/ecmcustomerbasketattribute.model';
import { environment } from '../../environments/environment';
import { IecmcustomerbasketattributeResponse } from '../model/ecmcustomerbasketattribute.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class ecmcustomerbasketattributeService {
  formData: ecmcustomerbasketattribute;
  readonly rootURL = AppConstants.ntirecommerceURL;
  list: ecmcustomerbasketattribute[];

  constructor(private http: HttpClient,public sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateecmcustomerbasketattributes():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirecommerceURL + '/ecmcustomerbasketattribute', body);
  }
  }

  saveOrUpdateecmcustomerbasketattributesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecommerceURL + '/ecmcustomerbasketattribute', body);
  }
  }

  getecmcustomerbasketattributesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecommerceURL + '/ecmcustomerbasketattribute').toPromise();
  }
  }
  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecommerceURL + '/ecmcustomerbasketattribute'+'/param/'+key).toPromise();
  }
  }


  getecmcustomerbasketattributesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecommerceURL + '/ecmcustomerbasketattribute'+'/e/'+id).toPromise();
  }
  }
  getecmcustomerbasketattributesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecommerceURL + '/ecmcustomerbasketattribute'+'/'+id).toPromise();
  }
  }

  deleteecmcustomerbasketattribute(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecommerceURL + '/ecmcustomerbasketattribute'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecommerceURL + '/ecmcustomerbasketattribute')
.toPromise()
.then((res:any) => this.list = res as any[]);
}
}


}

