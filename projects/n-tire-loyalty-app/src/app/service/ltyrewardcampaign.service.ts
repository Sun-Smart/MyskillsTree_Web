import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ltyrewardcampaign } from '../model/ltyrewardcampaign.model';
import { environment } from '../../environments/environment';
import { IltyrewardcampaignResponse } from '../model/ltyrewardcampaign.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class ltyrewardcampaignService {
  formData: ltyrewardcampaign;
  readonly rootURL = AppConstants.ntireloyaltyURL;
  list: ltyrewardcampaign[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateltyrewardcampaigns() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(this.rootURL + '/ltyrewardcampaign', body);
    }
  }

  saveOrUpdateltyrewardcampaignsList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(this.rootURL + '/ltyrewardcampaign', body);
    }
  }

  getltyrewardcampaignsList() {
    {
      return this.http.get(this.rootURL + '/ltyrewardcampaign').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(this.rootURL + '/ltyrewardcampaign' + '/param/' + key).toPromise();
    }
  }

  getltyrewardcampaignsByID(id: number): any {
    {
      return this.http.get(this.rootURL + '/ltyrewardcampaign' + '/' + id).toPromise();
    }
  }

  deleteltyrewardcampaign(id: number) {
    {
      return this.http.delete(this.rootURL + '/ltyrewardcampaign' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(this.rootURL + '/ltyrewardcampaign')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

