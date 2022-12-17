import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { dmsfolder } from '../model/dmsfolder.model';
import { dmsdownloadqueue } from '../model/dmsdownloadqueue.model';
import { dmslinkedfolder } from '../model/dmslinkedfolder.model';
import { environment } from '../../environments/environment';
import { IdmsfolderResponse } from '../model/dmsfolder.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class dmsfolderService {
  formData: dmsfolder;
  readonly rootURL = AppConstants.baseURL;
  list: dmsfolder[];
  dmsdownloadqueues: dmsdownloadqueue[]=[];
  dmslinkedfolders: dmslinkedfolder[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatedmsfolders():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      dmsdownloadqueues: this.dmsdownloadqueues.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      dmslinkedfolders: this.dmslinkedfolders.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntiredmsURL + '/dmsfolder', body);
  }
  }

  saveOrUpdatedmsfoldersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntiredmsURL + '/dmsfolder', body);
  }
  }

  getdmsfoldersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmsfolder').toPromise();
  }
  }
  getListByfolderid(folderid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmsfolder'+'/folderid/'+folderid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmsfolder'+'/param/'+key).toPromise();
  }
  }


  getdmsfoldersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmsfolder'+'/e/'+id).toPromise();
  }
  }
  getdmsfoldersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmsfolder'+'/'+id).toPromise();
  }
  }

  deletedmsfolder(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntiredmsURL + '/dmsfolder'+'/'+id).toPromise();
  }
  }
clearList(){
this.dmsdownloadqueues = [];
this.dmslinkedfolders = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntiredmsURL + '/dmsfolder')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

