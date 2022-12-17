import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { selectkey } from '../model/selectkey.model';
import { environment } from '../../environments/environment';
import { IselectkeyResponse } from '../model/selectkey.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class selectkeyService {
  formData: selectkey;
  readonly rootURL = AppConstants.ntireboURL;
  list: selectkey[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateselectkeys(): any {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntireboURL + '/selectkey', body);
    }
  }

  saveOrUpdateselectkeysList(): any {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntireboURL + '/selectkey', body);
    }
  }

  getselectkeysList(): any {
    {
      return this.http.get(AppConstants.ntireboURL + '/selectkey').toPromise();
    }
  }
  getList(key: string): any {
    {
      return this.http.get(AppConstants.ntireboURL + '/selectkey' + '/param/' + key).toPromise();
    }
  }


  getselectkeysByEID(id: any): any {
    {
      return this.http.get(AppConstants.ntireboURL + '/selectkey' + '/e/' + id).toPromise();
    }
  }
  getselectkeysByID(id: number): any {
    {
      return this.http.get(AppConstants.ntireboURL + '/selectkey' + '/' + id).toPromise();
    }
  }

  deleteselectkey(id: number): any {
    {
      return this.http.delete(AppConstants.ntireboURL + '/selectkey' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList(): any {
    {
      this.http.get(AppConstants.ntireboURL + '/selectkey')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

