import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeecareer } from '../model/hrmsemployeecareer.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeecareerResponse } from '../model/hrmsemployeecareer.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeecareerService {
  formData: hrmsemployeecareer;
  readonly rootURL = AppConstants.ntirehrmsURL;
  list: hrmsemployeecareer[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatehrmsemployeecareers(): any {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeecareer', body);
    }
  }

  saveOrUpdatehrmsemployeecareersList(): any {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeecareer', body);
    }
  }

  gethrmsemployeecareersList(): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeecareer').toPromise();
    }
  }
  getList(key: string): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeecareer' + '/param/' + key).toPromise();
    }
  }


  gethrmsemployeecareersByEID(id: any): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeecareer' + '/e/' + id).toPromise();
    }
  }
  gethrmsemployeecareersByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeecareer' + '/' + id).toPromise();
    }
  }

  deletehrmsemployeecareer(id: number): any {
    {
      return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeecareer' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList(): any {
    {
      this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeecareer')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

