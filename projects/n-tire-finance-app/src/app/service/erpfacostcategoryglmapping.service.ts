import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpfacostcategoryglmapping } from '../model/erpfacostcategoryglmapping.model';
import { environment } from '../../environments/environment';
import { IerpfacostcategoryglmappingResponse } from '../model/erpfacostcategoryglmapping.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpfacostcategoryglmappingService {
  formData: erpfacostcategoryglmapping;
  readonly rootURL = AppConstants.ntirefinanceURL;
  list: erpfacostcategoryglmapping[];
DeletederpfacostcategoryglmappingIDs:string="";

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpfacostcategoryglmappings():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirefinanceURL + '/erpfacostcategoryglmapping', body);
  }
  }

  saveOrUpdateerpfacostcategoryglmappingsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
DeletederpfacostcategoryglmappingIDs:this.DeletederpfacostcategoryglmappingIDs,    };
    return this.http.post(AppConstants.ntirefinanceURL + '/erpfacostcategoryglmapping', body);
  }
  }

  geterpfacostcategoryglmappingsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfacostcategoryglmapping').toPromise();
  }
  }
  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfacostcategoryglmapping'+'/param/'+key).toPromise();
  }
  }


  geterpfacostcategoryglmappingsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfacostcategoryglmapping'+'/e/'+id).toPromise();
  }
  }
  geterpfacostcategoryglmappingsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfacostcategoryglmapping'+'/'+id).toPromise();
  }
  }

  deleteerpfacostcategoryglmapping(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirefinanceURL + '/erpfacostcategoryglmapping'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirefinanceURL + '/erpfacostcategoryglmapping')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

