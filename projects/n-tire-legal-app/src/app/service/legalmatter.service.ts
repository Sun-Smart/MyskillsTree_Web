import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { legalmatter } from '../model/legalmatter.model';
import { legalmatterresponse } from '../model/legalmatterresponse.model';
import { environment } from '../../environments/environment';
import { IlegalmatterResponse } from '../model/legalmatter.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class legalmatterService {
  formData: legalmatter;
  readonly rootURL = AppConstants.baseURL;
  list: legalmatter[];
  legalmatterresponses: legalmatterresponse[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelegalmatters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      legalmatterresponses: this.legalmatterresponses.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legalmatter', body);
  }
  }

  saveOrUpdatelegalmattersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legalmatter', body);
  }
  }

  getlegalmattersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalmatter').toPromise();
  }
  }
  getListBymatterid(matterid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalmatter'+'/matterid/'+matterid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalmatter'+'/param/'+key).toPromise();
  }
  }


  getlegalmattersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalmatter'+'/e/'+id).toPromise();
  }
  }
  getlegalmattersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalmatter'+'/'+id).toPromise();
  }
  }

  deletelegalmatter(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirelegalURL + '/legalmatter'+'/'+id).toPromise();
  }
  }
clearList(){
this.legalmatterresponses = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirelegalURL + '/legalmatter')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

