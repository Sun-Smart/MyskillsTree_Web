import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { sasdemouser } from '../model/sasdemouser.model';
import { environment } from '../../environments/environment';
import { IsasdemouserResponse } from '../model/sasdemouser.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class sasdemouserService {
  formData: sasdemouser;
  readonly rootURL = AppConstants.ntireboURL;
  list: sasdemouser[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatesasdemousers() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntireboURL + '/sasdemouser', body);
    }
  }

  saveOrUpdatesasdemousersList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntireboURL + '/sasdemouser', body);
    }
  }

  getsasdemousersList() {
    {
      return this.http.get(AppConstants.ntireboURL + '/sasdemouser').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntireboURL + '/sasdemouser' + '/param/' + key).toPromise();
    }
  }

  getsasdemousersByID(id: number): any {
    {
      return this.http.get(AppConstants.ntireboURL + '/sasdemouser' + '/' + id).toPromise();
    }
  }

  deletesasdemouser(id: number) {
    {
      return this.http.delete(AppConstants.ntireboURL + '/sasdemouser' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntireboURL + '/sasdemouser')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

