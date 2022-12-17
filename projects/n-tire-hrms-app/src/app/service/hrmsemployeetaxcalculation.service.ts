import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeetaxcalculation } from '../model/hrmsemployeetaxcalculation.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeetaxcalculationResponse } from '../model/hrmsemployeetaxcalculation.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeetaxcalculationService {
  formData: hrmsemployeetaxcalculation;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsemployeetaxcalculation[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsemployeetaxcalculations():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeetaxcalculation', body);
  }
  }

  saveOrUpdatehrmsemployeetaxcalculationsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeetaxcalculation', body);
  }
  }

  gethrmsemployeetaxcalculationsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeetaxcalculation').toPromise();
  }
  }
  getListBytaxid(taxid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeetaxcalculation'+'/taxid/'+taxid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeetaxcalculation'+'/param/'+key).toPromise();
  }
  }


  gethrmsemployeetaxcalculationsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeetaxcalculation'+'/e/'+id).toPromise();
  }
  }
  gethrmsemployeetaxcalculationsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeetaxcalculation'+'/'+id).toPromise();
  }
  }

  deletehrmsemployeetaxcalculation(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeetaxcalculation'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeetaxcalculation')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

