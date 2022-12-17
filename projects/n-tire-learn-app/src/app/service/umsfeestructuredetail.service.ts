import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { umsfeestructuredetail } from '../model/umsfeestructuredetail.model';
import { environment } from '../../environments/environment';
import { IumsfeestructuredetailResponse } from '../model/umsfeestructuredetail.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class umsfeestructuredetailService {
  formData: umsfeestructuredetail;
  readonly rootURL = AppConstants.ntirelearnURL;
  list: umsfeestructuredetail[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateumsfeestructuredetails() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirelearnURL + '/umsfeestructuredetail', body);
    }
  }

  saveOrUpdateumsfeestructuredetailsList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirelearnURL + '/umsfeestructuredetail', body);
    }
  }

  getumsfeestructuredetailsList() {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsfeestructuredetail').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsfeestructuredetail' + '/param/' + key).toPromise();
    }
  }

  getumsfeestructuredetailsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsfeestructuredetail' + '/' + id).toPromise();
    }
  }

  deleteumsfeestructuredetail(id: number) {
    {
      return this.http.delete(AppConstants.ntirelearnURL + '/umsfeestructuredetail' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirelearnURL + '/umsfeestructuredetail')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

