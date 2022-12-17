import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { dmslinkeddocument } from '../model/dmslinkeddocument.model';
import { environment } from '../../environments/environment';
import { IdmslinkeddocumentResponse } from '../model/dmslinkeddocument.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class dmslinkeddocumentService {
  formData: dmslinkeddocument;
  readonly rootURL = AppConstants.baseURL;
  list: dmslinkeddocument[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatedmslinkeddocuments():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntiredmsURL + '/dmslinkeddocument', body);
  }
  }

  saveOrUpdatedmslinkeddocumentsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntiredmsURL + '/dmslinkeddocument', body);
  }
  }

  getdmslinkeddocumentsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmslinkeddocument').toPromise();
  }
  }
  getListBylinkedid(linkedid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmslinkeddocument'+'/linkedid/'+linkedid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmslinkeddocument'+'/param/'+key).toPromise();
  }
  }


  getdmslinkeddocumentsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmslinkeddocument'+'/e/'+id).toPromise();
  }
  }
  getdmslinkeddocumentsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmslinkeddocument'+'/'+id).toPromise();
  }
  }

  deletedmslinkeddocument(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntiredmsURL + '/dmslinkeddocument'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntiredmsURL + '/dmslinkeddocument')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

