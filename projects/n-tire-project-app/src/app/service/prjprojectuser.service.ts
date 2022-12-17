import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { prjprojectuser } from '../model/prjprojectuser.model';
import { environment } from '../../environments/environment';
import { IprjprojectuserResponse } from '../model/prjprojectuser.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class prjprojectuserService {
  formData: prjprojectuser;
  readonly rootURL = AppConstants.ntireprojectURL;
  list: prjprojectuser[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateprjprojectusers() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(this.rootURL + '/prjprojectuser', body);
    }
  }

  saveOrUpdateprjprojectusersList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(this.rootURL + '/prjprojectuser', body);
    }
  }

  getprjprojectusersList() {
    {
      return this.http.get(this.rootURL + '/prjprojectuser').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(this.rootURL + '/prjprojectuser' + '/param/' + key).toPromise();
    }
  }

  getprjprojectusersByID(id: number): any {
    {
      return this.http.get(this.rootURL + '/prjprojectuser' + '/' + id).toPromise();
    }
  }

  deleteprjprojectuser(id: number) {
    {
      return this.http.delete(this.rootURL + '/prjprojectuser' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(this.rootURL + '/prjprojectuser')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

