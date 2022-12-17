import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { flmtask } from '../model/flmtask.model';
import { environment } from '../../environments/environment';
import { IflmtaskResponse } from '../model/flmtask.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class flmtaskService {
  formData: flmtask;
  readonly rootURL = AppConstants.ntirefleetURL;
  list: flmtask[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateflmtasks() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirefleetURL + '/flmtask', body);
    }
  }

  saveOrUpdateflmtasksList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirefleetURL + '/flmtask', body);
    }
  }

  getflmtasksList() {
    {
      return this.http.get(AppConstants.ntirefleetURL + '/flmtask').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirefleetURL + '/flmtask' + '/param/' + key).toPromise();
    }
  }

  getflmtasksByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirefleetURL + '/flmtask' + '/' + id).toPromise();
    }
  }

  deleteflmtask(id: number) {
    {
      return this.http.delete(AppConstants.ntirefleetURL + '/flmtask' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirefleetURL + '/flmtask')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IflmtaskResponse> {
    return this.http.get<IflmtaskResponse>(AppConstants.ntirefleetURL + '/flmtask')
      .pipe(
        tap((response: IflmtaskResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(flmtask => new flmtask(flmtask.taskid, flmtask.description, flmtask.details, flmtask.frequency, flmtask.frequencyunit, flmtask.frequencyunitdesc, flmtask.measurementparameter, flmtask.measurementparameterdesc, flmtask.measurementvalue, flmtask.status))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(flmtask => flmtask.description.includes(filter.name))

          return response;
        })
      );
  }



}

