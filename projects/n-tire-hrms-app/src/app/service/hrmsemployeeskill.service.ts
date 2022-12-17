import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeeskill } from '../model/hrmsemployeeskill.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeeskillResponse } from '../model/hrmsemployeeskill.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeeskillService {
  formData: hrmsemployeeskill;
  readonly rootURL = AppConstants.ntirehrmsURL;
  list: hrmsemployeeskill[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatehrmsemployeeskills(): any {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeeskill', body);
    }
  }

  saveOrUpdatehrmsemployeeskillsList(): any {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeeskill', body);
    }
  }

  gethrmsemployeeskillsList(): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeskill').toPromise();
    }
  }
  getList(key: string): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeskill' + '/param/' + key).toPromise();
    }
  }


  gethrmsemployeeskillsByEID(id: any): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeskill' + '/e/' + id).toPromise();
    }
  }
  gethrmsemployeeskillsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeskill' + '/' + id).toPromise();
    }
  }

  deletehrmsemployeeskill(id: number): any {
    {
      return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeeskill' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList(): any {
    {
      this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeskill')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

