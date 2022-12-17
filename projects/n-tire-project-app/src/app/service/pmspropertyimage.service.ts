import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pmspropertyimage } from '../model/pmspropertyimage.model';
import { environment } from '../../environments/environment';
import { IpmspropertyimageResponse } from '../model/pmspropertyimage.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class pmspropertyimageService {
  formData: pmspropertyimage;
  readonly rootURL = AppConstants.baseURL;
  list: pmspropertyimage[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatepmspropertyimages():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprojectURL + '/pmspropertyimage', body);
  }
  }

  saveOrUpdatepmspropertyimagesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprojectURL + '/pmspropertyimage', body);
  }
  }

  getpmspropertyimagesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/pmspropertyimage').toPromise();
  }
  }
  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/pmspropertyimage'+'/param/'+key).toPromise();
  }
  }


  getpmspropertyimagesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/pmspropertyimage'+'/e/'+id).toPromise();
  }
  }
  getpmspropertyimagesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/pmspropertyimage'+'/'+id).toPromise();
  }
  }

  deletepmspropertyimage(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprojectURL + '/pmspropertyimage'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprojectURL + '/pmspropertyimage')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

