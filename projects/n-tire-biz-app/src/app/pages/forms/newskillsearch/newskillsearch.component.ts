import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { mstapplicantskilldetail } from '../../../model/mstapplicantskilldetail.model';
import { mstapplicantskilldetailService } from '../../../service/mstapplicantskilldetail.service';
import { AppConstants, DropDownValues } from '../../../shared/helper';

@Component({
  selector: 'app-newskillsearch',
  templateUrl: './newskillsearch.component.html',
  styleUrls: ['./newskillsearch.component.scss']
})
export class NewskillsearchComponent implements OnInit {
  showList: boolean = true;
  showGrid: boolean = false;
  showCard: boolean = false;
  showData: any;
  emailid = "";
  raio: any;
  mstapplicantskilldetail_Form: FormGroup;
  Segmentcategory_list: DropDownValues[];
  getidd: any;
  showinput1: boolean;
  showinput2: boolean;
  showinput3: boolean;
  skillcategory_List: DropDownValues[];
  subcategoryid_List: DropDownValues[];
  referenceacceptance_List: any;
  applicantid_List: any;
  pkList: mstapplicantskilldetail[];
  pkoptionsEvent: EventEmitter<any> = new EventEmitter<any>();
  getidd1: any;
  constructor(private http: HttpClient, private mstapplicantskilldetail_service: mstapplicantskilldetailService,) {
  }

  ngOnInit(): void {
    let data = {
      id: "mstsr",
      SessionUser: "ss",
      parameters: null,
      addparams: null,
      status: "all",
      fkname: "",
      fk: "",
      fkname1: "",
      fk1: "",
      modulename: "",
      modulepkcol: "",
      key: "",
      pkvalue: 0
    }
    this.http.post(AppConstants.ntireboURL + '/ReportViewer', data).subscribe((res: any) => {
      this.showData = res.results.Rows;
      console.log(this.showData);
    })

    this.mstapplicantskilldetail_service.getList_segmentcategory().then(res => {


      //  this.applicantid_List = res.list_applicantid.value;
      this.Segmentcategory_list = res;
      // this.referenceacceptance_List = res.list_referenceacceptance.value;
    }).catch((err) => { console.log(err); });

    this.mstapplicantskilldetail_service.getDefaultData().then(res => {

      console.log(res)

      this.applicantid_List = res.list_applicantid.value;

      // this.skillcategory_List = res.list_skillcategory.value;
      this.referenceacceptance_List = res.list_referenceacceptance.value;
    }).catch((err) => { console.log(err); });

    //autocomplete
    this.mstapplicantskilldetail_service.get_mstapplicantskilldetails_List().then(res => {
      this.pkList = res as mstapplicantskilldetail[];
      this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => { console.log(err); });
  }
  onList() {
    this.showList = true;
    this.showGrid = false;
    this.showCard = false;
  }
  onGrid() {
    this.showGrid = true;
    this.showCard = false;
    this.showList = false;
  };
  onCard() {
    this.showCard = true;
    this.showList = false;
    this.showGrid = false;
  }
  valueChanged(e) {
    console.log('e', e);
  }
  get f() { return this.mstapplicantskilldetail_Form.controls; }
  segmentcategory_onChange(evt: any) {
    debugger
    let e = evt.value;
    this.getidd = e

    if (this.getidd == "166") {
      this.showinput1 = true
    } else {
      this.showinput2 = false
      this.showinput3 = false
      this.showinput1 = false
    }
    this.mstapplicantskilldetail_Form.patchValue({ segmentcategorydesc: evt.options[evt.options.selectedIndex].text, segmentid: e });
    setTimeout(() => {
      if (this.f.segmentid.value && this.f.segmentid.value != "" && this.f.segmentid.value != null)
        this.mstapplicantskilldetail_service.getList_skillcategory2(e).then((res: any) => {
          debugger

          this.skillcategory_List = res as DropDownValues[];
        })

    }
    );

    setTimeout(() => {
      if (this.f.skillcategory.value && this.f.skillcategory.value != "" && this.f.skillcategory.value != null)
        this.mstapplicantskilldetail_service.getList_subcategoryid2(e).then(res =>
          this.subcategoryid_List = res as DropDownValues[]);
    });


  }

  skillcategory_onChange(evt: any) {
    debugger
    let e = evt.value;
    this.getidd1 = e
    if (this.getidd1 == "262") {
      this.showinput2 = true
    } else {
      this.showinput2 = false
    }
    this.mstapplicantskilldetail_Form.patchValue({
      skillcategorydesc: evt.options[evt.options.selectedIndex].text, skillcategory: e, categoryid: this.getidd1
    });
    setTimeout(() => {
      if (this.f.skillcategory.value && this.f.skillcategory.value != "" && this.f.skillcategory.value != null)

        debugger
      this.mstapplicantskilldetail_service.getList_subcategoryid2(e).then(res =>

        this.subcategoryid_List = res as DropDownValues[]);
    });
  }
}
