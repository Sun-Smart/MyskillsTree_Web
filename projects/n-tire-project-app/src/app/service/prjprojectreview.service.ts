import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { prjprojectreview } from '../model/prjprojectreview.model';
import { environment } from '../../environments/environment';
import { IprjprojectreviewResponse } from '../model/prjprojectreview.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class prjprojectreviewService {
  formData: prjprojectreview;
  readonly rootURL = AppConstants.ntireprojectURL;
  list: prjprojectreview[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateprjprojectreviews(): any {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(this.rootURL + '/prjprojectreview', body);
    }
  }

  saveOrUpdateprjprojectreviewsList(): any {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(this.rootURL + '/prjprojectreview', body);
    }
  }

  getprjprojectreviewsList(): any {
    {
      return this.http.get(this.rootURL + '/prjprojectreview').toPromise();
    }
  }
  getList(key: string): any {
    {
      return this.http.get(this.rootURL + '/prjprojectreview' + '/param/' + key).toPromise();
    }
  }


  getprjprojectreviewsByEID(id: any): any {
    {
      return this.http.get(this.rootURL + '/prjprojectreview' + '/e/' + id).toPromise();
    }
  }
  getprjprojectreviewsByID(id: number): any {
    {
      return this.http.get(this.rootURL + '/prjprojectreview' + '/' + id).toPromise();
    }
  }

  deleteprjprojectreview(id: number): any {
    {
      return this.http.delete(this.rootURL + '/prjprojectreview' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList(): any {
    {
      this.http.get(this.rootURL + '/prjprojectreview')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

