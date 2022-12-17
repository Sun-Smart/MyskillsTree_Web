import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pmsiproperty } from '../model/pmsiproperty.model';
import { environment } from '../../environments/environment';
import { IpmsipropertyResponse } from '../model/pmsiproperty.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class pmsipropertyService {
  formData: pmsiproperty;
  readonly rootURL = AppConstants.ntirepropertyURL;
  list: pmsiproperty[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatepmsproperties() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(this.rootURL + '/pmsiproperty', body);
    }
  }

  saveOrUpdatepmspropertiesList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(this.rootURL + '/pmsiproperty', body);
    }
  }

  getpmspropertiesList() {
    {
      return this.http.get(this.rootURL + '/pmsiproperty').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(this.rootURL + '/pmsiproperty' + '/param/' + key).toPromise();
    }
  }

  getpmspropertiesByID(id: number): any {
    {
      return this.http.get(this.rootURL + '/pmsiproperty' + '/' + id).toPromise();
    }
  }

  deletepmsproperty(id: number) {
    {
      return this.http.delete(this.rootURL + '/pmsiproperty' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(this.rootURL + '/pmsproperty')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IpmsipropertyResponse> {
    return this.http.get<IpmsipropertyResponse>(this.rootURL + '/pmsiproperty')
      .pipe(
        tap((response: IpmsipropertyResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(pmsproperty => new pmsproperty(pmsproperty.propertyid, pmsproperty.title, pmsproperty.propertytype, pmsproperty.propertytypedesc, pmsproperty.imageurl, pmsproperty.metatag, pmsproperty.address1, pmsproperty.address2, pmsproperty.countryid, pmsproperty.countryiddesc, pmsproperty.stateid, pmsproperty.stateiddesc, pmsproperty.cityid, pmsproperty.cityiddesc, pmsproperty.pincode, pmsproperty.ownerid, pmsproperty.owneriddesc, pmsproperty.bankaccountid, pmsproperty.bankaccountiddesc, pmsproperty.currency, pmsproperty.currencydesc, pmsproperty.reserveamount, pmsproperty.responsibleid, pmsproperty.responsibleiddesc, pmsproperty.yearbuilt, pmsproperty.latitude, pmsproperty.longitude, pmsproperty.contactperson, pmsproperty.phone1, pmsproperty.phone2, pmsproperty.email, pmsproperty.website, pmsproperty.facebook, pmsproperty.googleplus, pmsproperty.twitter, pmsproperty.instagram, pmsproperty.pinterest, pmsproperty.linkedin, pmsproperty.unitno, pmsproperty.unittype, pmsproperty.unittypedesc, pmsproperty.address11, pmsproperty.address21, pmsproperty.sqft, pmsproperty.sizedetails, pmsproperty.rooms, pmsproperty.beds, pmsproperty.bedsdesc, pmsproperty.baths, pmsproperty.bathsdesc, pmsproperty.rent, pmsproperty.deposit, pmsproperty.notes, pmsproperty.assignowner, pmsproperty.ownership, pmsproperty.ownernotes, pmsproperty.advance, pmsproperty.invoiceday, pmsproperty.hasfirstrentcommission, pmsproperty.firstrentcommissiontype, pmsproperty.firstrentcommissiontypedesc, pmsproperty.firstrentcommission, pmsproperty.hasrentcommission, pmsproperty.rentcommissiontype, pmsproperty.rentcommissiontypedesc, pmsproperty.rentcommission, pmsproperty.hasrenewalfee, pmsproperty.renewalfeetype, pmsproperty.renewalfeetypedesc, pmsproperty.renewalfee, pmsproperty.hasservicefee, pmsproperty.servicefeetype, pmsproperty.servicefeetypedesc, pmsproperty.servicefee, pmsproperty.status, pmsproperty.customfield, pmsproperty.attachment))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(pmsproperty => pmsproperty.title.includes(filter.name))

          return response;
        })
      );
  }



}

