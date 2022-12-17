import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { prjexpense } from '../model/prjexpense.model';
import { environment } from '../../environments/environment';
import { IprjexpenseResponse } from '../model/prjexpense.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class prjexpenseService {
  formData: prjexpense;
  readonly rootURL = AppConstants.ntireprojectURL;
  list: prjexpense[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateprjexpenses(): any {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(this.rootURL + '/prjexpense', body);
    }
  }

  saveOrUpdateprjexpensesList(): any {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(this.rootURL + '/prjexpense', body);
    }
  }

  getprjexpensesList(): any {
    {
      return this.http.get(this.rootURL + '/prjexpense').toPromise();
    }
  }
  getList(key: string): any {
    {
      return this.http.get(this.rootURL + '/prjexpense' + '/param/' + key).toPromise();
    }
  }


  getprjexpensesByEID(id: any): any {
    {
      return this.http.get(this.rootURL + '/prjexpense' + '/e/' + id).toPromise();
    }
  }
  getprjexpensesByID(id: number): any {
    {
      return this.http.get(this.rootURL + '/prjexpense' + '/' + id).toPromise();
    }
  }

  deleteprjexpense(id: number): any {
    {
      return this.http.delete(this.rootURL + '/prjexpense' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList(): any {
    {
      this.http.get(this.rootURL + '/prjexpense')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

