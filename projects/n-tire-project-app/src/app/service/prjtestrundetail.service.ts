import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { prjtestrundetail } from '../model/prjtestrundetail.model';
import { environment } from '../../environments/environment';
import { IprjtestrundetailResponse } from '../model/prjtestrundetail.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class prjtestrundetailService {
  formData: prjtestrundetail;
  readonly rootURL = AppConstants.ntireprojectURL;
  list: prjtestrundetail[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateprjtestrundetails(): any {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(this.rootURL + '/prjtestrundetail', body);
    }
  }

  saveOrUpdateprjtestrundetailsList(): any {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(this.rootURL + '/prjtestrundetail', body);
    }
  }

  getprjtestrundetailsList(): any {
    {
      return this.http.get(this.rootURL + '/prjtestrundetail').toPromise();
    }
  }
  getList(key: string): any {
    {
      return this.http.get(this.rootURL + '/prjtestrundetail' + '/param/' + key).toPromise();
    }
  }


  getprjtestrundetailsByEID(id: any): any {
    {
      return this.http.get(this.rootURL + '/prjtestrundetail' + '/e/' + id).toPromise();
    }
  }
  getprjtestrundetailsByID(id: number): any {
    {
      return this.http.get(this.rootURL + '/prjtestrundetail' + '/' + id).toPromise();
    }
  }

  deleteprjtestrundetail(id: number): any {
    {
      return this.http.delete(this.rootURL + '/prjtestrundetail' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList(): any {
    {
      this.http.get(this.rootURL + '/prjtestrundetail')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

