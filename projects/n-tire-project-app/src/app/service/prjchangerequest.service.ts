import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { prjchangerequest } from '../model/prjchangerequest.model';
import { prjchangerequestimpact } from '../model/prjchangerequestimpact.model';
import { environment } from '../../environments/environment';
import { IprjchangerequestResponse } from '../model/prjchangerequest.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class prjchangerequestService {
  formData: prjchangerequest;
  readonly rootURL = AppConstants.ntireprojectURL;
  prjchangerequestimpacts: prjchangerequestimpact[]=[];
  list: prjchangerequest[];

  constructor(private http: HttpClient,public sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateprjchangerequests():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      prjchangerequestimpacts: this.prjchangerequestimpacts.filter(function(el) { return el!=undefined && Object.keys(el).length!=0; }),
    };
    return this.http.post(this.rootURL + '/prjchangerequest', body);
  }
  }

  saveOrUpdateprjchangerequestsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(this.rootURL + '/prjchangerequest', body);
  }
  }

  getprjchangerequestsList():any {
  if (this.valid()){ 
    return this.http.get(this.rootURL + '/prjchangerequest').toPromise();
  }
  }
  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(this.rootURL + '/prjchangerequest'+'/param/'+key).toPromise();
  }
  }


  getprjchangerequestsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(this.rootURL + '/prjchangerequest'+'/e/'+id).toPromise();
  }
  }
  getprjchangerequestsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(this.rootURL + '/prjchangerequest'+'/'+id).toPromise();
  }
  }

  deleteprjchangerequest(id:number):any {
  if (this.valid()){ 
    return this.http.delete(this.rootURL + '/prjchangerequest'+'/'+id).toPromise();
  }
  }
clearList(){
this.prjchangerequestimpacts = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(this.rootURL + '/prjchangerequest')
.toPromise()
.then((res:any) => this.list = res as any[]);
}
}


}

