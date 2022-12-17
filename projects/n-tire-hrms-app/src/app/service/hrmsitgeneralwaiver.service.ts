import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsitgeneralwaiver } from '../model/hrmsitgeneralwaiver.model';
import { environment } from '../../environments/environment';
import { IhrmsitgeneralwaiverResponse } from '../model/hrmsitgeneralwaiver.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsitgeneralwaiverService {
  formData: hrmsitgeneralwaiver;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsitgeneralwaiver[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsitgeneralwaivers():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsitgeneralwaiver', body);
  }
  }

  saveOrUpdatehrmsitgeneralwaiversList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsitgeneralwaiver', body);
  }
  }

  gethrmsitgeneralwaiversList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsitgeneralwaiver').toPromise();
  }
  }
  getListBygwaiverid(gwaiverid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsitgeneralwaiver'+'/gwaiverid/'+gwaiverid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsitgeneralwaiver'+'/param/'+key).toPromise();
  }
  }


  gethrmsitgeneralwaiversByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsitgeneralwaiver'+'/e/'+id).toPromise();
  }
  }
  gethrmsitgeneralwaiversByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsitgeneralwaiver'+'/'+id).toPromise();
  }
  }

  deletehrmsitgeneralwaiver(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsitgeneralwaiver'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsitgeneralwaiver')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

