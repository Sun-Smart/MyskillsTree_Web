import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pmselectkpi } from '../model/pmselectkpi.model';
import { pmemployeekpi } from '../model/pmemployeekpi.model';
import { environment } from '../../environments/environment';
import { IpmselectkpiResponse } from '../model/pmselectkpi.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class pmselectkpiService {
  formData: pmselectkpi;
  readonly rootURL = AppConstants.baseURL;
  pmemployeekpis: pmemployeekpi[]=[];
  Insertpmemployeekpis: pmemployeekpi[]=[];
  list: pmselectkpi[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatepmselectkpis():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      pmemployeekpis: this.Insertpmemployeekpis.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireprojectURL + '/pmselectkpi', body);
  }
  }

  saveOrUpdatepmselectkpisList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprojectURL + '/pmselectkpi', body);
  }
  }

  getpmselectkpisList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/pmselectkpi').toPromise();
  }
  }
  getListByemployeekpiid(employeekpiid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/pmselectkpi'+'/employeekpiid/'+employeekpiid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/pmselectkpi'+'/param/'+key).toPromise();
  }
  }


  getpmselectkpisByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/pmselectkpi'+'/e/'+id).toPromise();
  }
  }
  getpmselectkpisByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/pmselectkpi'+'/'+id).toPromise();
  }
  }

  deletepmselectkpi(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprojectURL + '/pmselectkpi'+'/'+id).toPromise();
  }
  }
clearList(){
this.pmemployeekpis = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprojectURL + '/pmselectkpi')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

