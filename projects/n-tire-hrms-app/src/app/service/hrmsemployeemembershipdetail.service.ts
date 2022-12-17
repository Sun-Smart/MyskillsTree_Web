import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeemembershipdetail } from '../model/hrmsemployeemembershipdetail.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeemembershipdetailResponse } from '../model/hrmsemployeemembershipdetail.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeemembershipdetailService {
  formData: hrmsemployeemembershipdetail;
  readonly rootURL = AppConstants.ntirehrmsURL;
  list: hrmsemployeemembershipdetail[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatehrmsemployeemembershipdetails(): any {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeemembershipdetail', body);
    }
  }

  saveOrUpdatehrmsemployeemembershipdetailsList(): any {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeemembershipdetail', body);
    }
  }

  gethrmsemployeemembershipdetailsList(): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemembershipdetail').toPromise();
    }
  }
  getList(key: string): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemembershipdetail' + '/param/' + key).toPromise();
    }
  }


  gethrmsemployeemembershipdetailsByEID(id: any): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemembershipdetail' + '/e/' + id).toPromise();
    }
  }
  gethrmsemployeemembershipdetailsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemembershipdetail' + '/' + id).toPromise();
    }
  }

  deletehrmsemployeemembershipdetail(id: number): any {
    {
      return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeemembershipdetail' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList(): any {
    {
      this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemembershipdetail')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

