import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeedocument } from '../model/hrmsemployeedocument.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeedocumentResponse } from '../model/hrmsemployeedocument.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeedocumentService {
  formData: hrmsemployeedocument;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsemployeedocument[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsemployeedocuments():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeedocument', body);
  }
  }

  saveOrUpdatehrmsemployeedocumentsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeedocument', body);
  }
  }

  gethrmsemployeedocumentsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeedocument').toPromise();
  }
  }
  getListBydocid(docid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeedocument'+'/docid/'+docid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeedocument'+'/param/'+key).toPromise();
  }
  }


  gethrmsemployeedocumentsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeedocument'+'/e/'+id).toPromise();
  }
  }
  gethrmsemployeedocumentsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeedocument'+'/'+id).toPromise();
  }
  }

  deletehrmsemployeedocument(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeedocument'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeedocument')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

