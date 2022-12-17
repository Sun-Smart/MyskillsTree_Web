import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { umssemestertopic } from '../model/umssemestertopic.model';
import { environment } from '../../environments/environment';
import { IumssemestertopicResponse } from '../model/umssemestertopic.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class umssemestertopicService {
  formData: umssemestertopic;
  readonly rootURL = AppConstants.ntirelearnURL;
  list: umssemestertopic[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateumssemestertopics() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirelearnURL + '/umssemestertopic', body);
    }
  }

  saveOrUpdateumssemestertopicsList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirelearnURL + '/umssemestertopic', body);
    }
  }

  getumssemestertopicsList() {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umssemestertopic').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umssemestertopic' + '/param/' + key).toPromise();
    }
  }

  getumssemestertopicsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umssemestertopic' + '/' + id).toPromise();
    }
  }

  deleteumssemestertopic(id: number) {
    {
      return this.http.delete(AppConstants.ntirelearnURL + '/umssemestertopic' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirelearnURL + '/umssemestertopic')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

