import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { prjprojectobjective } from '../model/prjprojectobjective.model';
import { environment } from '../../environments/environment';
import { IprjprojectobjectiveResponse } from '../model/prjprojectobjective.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class prjprojectobjectiveService {
  formData: prjprojectobjective;
  readonly rootURL = AppConstants.ntireprojectURL;
  list: prjprojectobjective[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateprjprojectobjectives(): any {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(this.rootURL + '/prjprojectobjective', body);
    }
  }

  saveOrUpdateprjprojectobjectivesList(): any {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(this.rootURL + '/prjprojectobjective', body);
    }
  }

  getprjprojectobjectivesList(): any {
    {
      return this.http.get(this.rootURL + '/prjprojectobjective').toPromise();
    }
  }
  getList(key: string): any {
    {
      return this.http.get(this.rootURL + '/prjprojectobjective' + '/param/' + key).toPromise();
    }
  }


  getprjprojectobjectivesByEID(id: any): any {
    {
      return this.http.get(this.rootURL + '/prjprojectobjective' + '/e/' + id).toPromise();
    }
  }
  getprjprojectobjectivesByID(id: number): any {
    {
      return this.http.get(this.rootURL + '/prjprojectobjective' + '/' + id).toPromise();
    }
  }

  deleteprjprojectobjective(id: number): any {
    {
      return this.http.delete(this.rootURL + '/prjprojectobjective' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList(): any {
    {
      this.http.get(this.rootURL + '/prjprojectobjective')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IprjprojectobjectiveResponse> {
    return this.http.get<IprjprojectobjectiveResponse>(this.rootURL + '/prjprojectobjective')
      .pipe(
        tap((response: IprjprojectobjectiveResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(prjprojectobjective => new prjprojectobjective(prjprojectobjective.projectid, prjprojectobjective.objectiveid, prjprojectobjective.objectivename, prjprojectobjective.target, prjprojectobjective.targetdate, prjprojectobjective.owner, prjprojectobjective.currentstatus, prjprojectobjective.currentstatusdesc, prjprojectobjective.nextsteps, prjprojectobjective.notes, prjprojectobjective.sequence, prjprojectobjective.customfield, prjprojectobjective.attachment, prjprojectobjective.status))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(prjprojectobjective => prjprojectobjective.objectivename.includes(filter.name))

          return response;
        })
      );
  }



}

