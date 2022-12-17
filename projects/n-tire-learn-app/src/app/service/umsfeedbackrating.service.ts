import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { umsfeedbackrating } from '../model/umsfeedbackrating.model';
import { environment } from '../../environments/environment';
import { IumsfeedbackratingResponse } from '../model/umsfeedbackrating.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class umsfeedbackratingService {
  formData: umsfeedbackrating;
  readonly rootURL = AppConstants.ntirelearnURL;
  list: umsfeedbackrating[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateumsfeedbackratings() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirelearnURL + '/umsfeedbackrating', body);
    }
  }

  saveOrUpdateumsfeedbackratingsList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirelearnURL + '/umsfeedbackrating', body);
    }
  }

  getumsfeedbackratingsList() {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsfeedbackrating').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsfeedbackrating' + '/param/' + key).toPromise();
    }
  }

  getumsfeedbackratingsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsfeedbackrating' + '/' + id).toPromise();
    }
  }

  deleteumsfeedbackrating(id: number) {
    {
      return this.http.delete(AppConstants.ntirelearnURL + '/umsfeedbackrating' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirelearnURL + '/umsfeedbackrating')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

