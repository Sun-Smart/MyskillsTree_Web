import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { mstapplicantskilldetail } from '../../../model/mstapplicantskilldetail.model';
import { mstapplicantskilldetailService } from '../../../service/mstapplicantskilldetail.service';
import { AppConstants, DropDownValues } from '../../../shared/helper';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { mstapplicantgeographypreferenceService } from './../../../service/mstapplicantgeographypreference.service';
import { ReportViewerCtrlComponent } from '../boreportviewer/reportviewerctrl.component';
import { DialogService } from 'primeng/dynamicDialog';
import { dataComponent } from '../boreportdata/data.component';
import { BOReportViewerService } from '../../../../../../n-tire-biz-app/src/app/service/boreportviewer.service';
import { bodlgviewerComponent } from '../boreportviewer/bodlgviewer.component';
import { SharedService } from '../../../../../../n-tire-biz-app/src/app/service/shared.service';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { Router } from '@angular/router';
import { SessionService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
import { bomenumasterService } from '../../../../../../n-tire-biz-app/src/app/service/bomenumaster.service';
import { mstcategoryComponent } from '../mstcategory/mstcategory.component';
@Component({
  selector: 'app-newskillsearch',
  templateUrl: './newskillsearch.component.html',
  styleUrls: ['./newskillsearch.component.scss']
})
export class NewskillsearchComponent implements OnInit {
  showList: boolean = true;
  showGrid: boolean = false;
  showCard: boolean = false;
  showData: any = [];
  mstapplicantskilldetail_Form: FormGroup;
  Segmentcategory_list: DropDownValues[];
  getidd: any;
  showinput1: boolean;
  showinput2: boolean;
  showinput3: boolean;
  skillcategory_List: DropDownValues[];
  subcategoryid_List: DropDownValues[];
  location_List: DropDownValues[];
  referenceacceptance_List: any;
  applicantid_List: any;
  pkList: mstapplicantskilldetail[];
  pkoptionsEvent: EventEmitter<any> = new EventEmitter<any>();
  getidd1: any;
  selectOptions: DropDownValues[];
  selectedOptions: any;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings;
  categorySettings: IDropdownSettings;
  subCategorySettings: IDropdownSettings;
  locationSettings: IDropdownSettings;
  mstapplicantgeographypreference_Form: FormGroup;
  country_List: DropDownValues[];
  country_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
  city_List: DropDownValues[];
  city_optionsEvent: EventEmitter<any> = new EventEmitter<any>();
  rangevalue = 0;
  skillcategory: any;
  label: any;
  skillcategoryarry: any = []
  skillcategory1: any;
  skillsegment1: any;
  getdata2: any;
  skillsegment2: any;
  skillcategory3: any;
  rangevalue1: any;
  skillcategory4: any;
  Zone: any[] = ["0"];
  districtLists: any = [];
  stateLists: any = [];
  check: any;
  skillcategory2: any;
  skillcategory1arry: any = [];
  skillcategory2arry: any = [];
  locationValue: any;
  configdata: any;
  dialogdata: any;
  menuactions: any = [];
  pmenuid: any;
  selecteddata: any;
  pmenucode: any;
  componentRef: any;
  bsameform: boolean;
  fkname: string;
  fk: string;
  fk1: any;
  fkname1: string;
  paramid: any;
  term: string;
  location_arry: any = [];
  location_field: any;
  constructor(private http: HttpClient, public dialog: DialogService, private bomenumasterservice: bomenumasterService, public sessionService: SessionService, public dialogRef: DynamicDialogRef, private sharedService: SharedService, private router: Router, private boreportviewerservice: BOReportViewerService, private mstapplicantskilldetail_service: mstapplicantskilldetailService, private mstapplicantgeographypreference_service: mstapplicantgeographypreferenceService, private fb: FormBuilder) {
    this.mstapplicantgeographypreference_Form = this.fb.group({
      country: [null],
      countrydesc: [null],
      city: [null],
      citydesc: [null],
    });
    if (this.sharedService.menuid != undefined) {
      //console.log(this.sharedService.menuid);
      this.pmenuid = this.sharedService.menuid;
      this.pmenucode = this.sharedService.menucode;
    }
  }

  ngOnInit() {
    this.checktest();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'value',
      textField: 'label',
      allowSearchFilter: false
    };
    this.categorySettings = {
      singleSelection: false,
      idField: 'categoryid',
      textField: 'code',
      allowSearchFilter: false
    }
    this.subCategorySettings = {
      singleSelection: false,
      idField: 'subcategoryid',
      textField: 'code',
      allowSearchFilter: false
    }
    this.locationSettings = {
      singleSelection: false,
      idField: 'value',
      textField: 'label',
      allowSearchFilter: false
    }
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
    // this.http.post(AppConstants.ntireboURL + '/ReportViewer', data).subscribe((res: any) => {
    //   this.showData = res.results.Rows;
    //   console.log(this.showData);
    // })
    this.http.get(AppConstants.ntirebizURL + '/boreport/reportcode/mstsr').subscribe((res: any) => {
      console.log(res);
    })
    this.http.get(AppConstants.ntirebizURL + '/mstapplicantgeographypreference/getList_city').subscribe((res: any) => {
      console.log('location check', res);
      this.location_List = res;
    })
    this.mstapplicantskilldetail_service.getList_segmentcategory().then(res => {


      //  this.applicantid_List = res.list_applicantid.value;
      this.Segmentcategory_list = res;
      console.log('res ', res);

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

    this.mstapplicantgeographypreference_service.getDefaultData().then(res => {
      debugger
      this.applicantid_List = res.list_applicantid.value;
      this.country_List = res.list_country.value;
      console.log('this.applicantid_List ', this.applicantid_List);
      console.log('this.country_List ', this.country_List);


    }).catch((err) => { });
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

  get f() { return this.mstapplicantskilldetail_Form.controls; }
  segmentcategory_onChange(evt: any) {
    debugger
    let e = evt.value;

    this.skillcategoryarry.push({ segment: e })
    // console.log('eee', e);
    this.skillcategory1 = 0;
    for (let i = 0; i < this.skillcategoryarry.length; i++) {
      this.skillcategory1 = this.skillcategory1 + ',' + this.skillcategoryarry[i].segment;
    }
    console.log(this.skillcategory1);

    this.mstapplicantskilldetail_service.getMultipleSkillSearch(this.skillcategory1 ? this.skillcategory1 : null, null, null, null, null, null, null).then((res: any) => {
      console.log('res ', res);
      debugger
      this.showData = res;
      for (let z = 0; this.showData.length > 0; z++) {
        this.showData[z].useprofilephoto = this.showData[z]?.useprofilephoto.split("\"")[1];
        console.log(this.showData[z].useprofilephoto);
      }
      debugger
      this.showData = res;

      console.log('split image', this.showData);

    });
    this.getidd = e

    if (this.getidd == "166") {
      this.showinput1 = true
    } else {
      this.showinput2 = false
      this.showinput3 = false
      this.showinput1 = false
    }
    setTimeout(() => {
      //New code
      this.mstapplicantskilldetail_service.getMultipleCheckSegmentID(this.skillcategory1).then((res: any) => {
        debugger
        this.skillcategory_List = res as DropDownValues[];
      })

    }
    );

    setTimeout(() => {
      // if (this.f.skillcategory.value && this.f.skillcategory.value != "" && this.f.skillcategory.value != null)
      this.mstapplicantskilldetail_service.getList_subcategoryid2(e).then(res =>
        this.subcategoryid_List = res as DropDownValues[]);
    });


  }

  skillcategory_onChange(evt: any) {
    debugger
    let e = evt.categoryid;
    console.log('evt.categoryid ', e);


    this.skillcategory1arry.push({ category: e })
    // console.log('eee', e);
    this.skillcategory2 = 0;
    for (let i = 0; i < this.skillcategory1arry.length; i++) {
      this.skillcategory2 = this.skillcategory2 + ',' + this.skillcategory1arry[i].category;
    }
    this.mstapplicantskilldetail_service.getMultipleSkillSearch(this.skillcategory1 ? this.skillcategory1 : null, this.skillcategory2 ? this.skillcategory2 : null, null, null, null, null, null).then((res: any) => {
      console.log('res ', res);
      this.showData = res;
      // this.showData = res;
      for (let z = 0; this.showData.length > 0; z++) {
        this.showData[z].useprofilephoto = this.showData[z]?.useprofilephoto.split("\"")[1];
        console.log(this.showData[z].useprofilephoto);
      }
      this.showData = res;
    });
    this.getidd1 = e
    if (this.getidd1 == "262") {
      this.showinput2 = true
    } else {
      this.showinput2 = false
    }
    // setTimeout(() => {
    debugger
    //New Code
    this.mstapplicantskilldetail_service.getMultipleChecksubcategoryID(this.skillcategory2).then((res: any) => {
      this.subcategoryid_List = res as DropDownValues[]
    });
    // });
  }
  subcategoryid_onChange(evt: any) {
    debugger
    let e = evt.subcategoryid;
    this.skillcategory2arry.push({ subcate: e })
    this.skillcategory3 = 0;
    for (let i = 0; i < this.skillcategory2arry.length; i++) {
      this.skillcategory3 = this.skillcategory3 + ',' + this.skillcategory2arry[i].subcate;
    }
    this.mstapplicantskilldetail_service.getMultipleSkillSearch(this.skillcategory1 ? this.skillcategory1 : null, this.skillcategory2 ? this.skillcategory2 : null, this.skillcategory3 ? this.skillcategory3 : null, null, null, null, null).then((res: any) => {
      console.log('res ', res);
      this.showData = res;
      for (let z = 0; this.showData.length > 0; z++) {
        this.showData[z].useprofilephoto = this.showData[z]?.useprofilephoto.split("\"")[1];
        console.log(this.showData[z].useprofilephoto);
      }
      this.showData = res;
    });
    console.log('eeeeee', e);

    this.getdata2 = e
    if (this.getdata2 == "411") {
      this.showinput3 = true
    } else {
      this.showinput3 = false
    }
  }

  onSelected_country(countryDetail: any) {
    debugger
    if (countryDetail.value && countryDetail) {
      this.mstapplicantgeographypreference_Form.patchValue({
        country: countryDetail.value,
        countrydesc: countryDetail.label,

      });
      this.mstapplicantgeographypreference_service.getList_city(countryDetail.value).then(res => {
        this.city_List = res as DropDownValues[];
      }).catch((err) => { });
    }
  }
  valueChanged(e) {
    console.log('e', e);
    this.rangevalue = e.target.value;
    this.mstapplicantskilldetail_service.getMultipleSkillSearch(this.skillcategory1 ? this.skillcategory1 : null, this.skillcategory2 ? this.skillcategory2 : null, this.skillcategory3 ? this.skillcategory3 : null, this.rangevalue ? this.rangevalue : null, null, null, null).then((res: any) => {
      console.log('res ', res);
      this.showData = res;

      for (let z = 0; this.showData.length > 0; z++) {
        this.showData[z].useprofilephoto = this.showData[z]?.useprofilephoto.split("\"")[1];
        console.log(this.showData[z].useprofilephoto);
      }
      this.showData = res;
    });
  }
  location_onChange(e: any) {
    debugger;
    console.log('e', e);
    this.locationValue = e.label;
    this.location_arry.push({ loca: this.locationValue })
    // console.log('substring', this.locationValue.substring(0, this.locationValue.length - 1));

    this.location_field = "";
    for (let i = 0; i < this.location_arry.length; i++) {
      this.showData = [];
      this.location_field = this.location_field + this.location_arry[i].loca + ',';
    }
    this.location_field = this.location_field.slice(0, -1);

    this.mstapplicantskilldetail_service.getMultipleSkillSearch(this.skillcategory1 ? this.skillcategory1 : null, this.skillcategory2 ? this.skillcategory2 : null, this.skillcategory3 ? this.skillcategory3 : null, this.rangevalue ? this.rangevalue : null, this.location_field ? this.location_field : null, null, null).then((res: any) => {
      console.log('res ', res);
      this.showData = res;
      for (let z = 0; this.showData.length > 0; z++) {
        this.showData[z].useprofilephoto = this.showData[z]?.useprofilephoto.split("\"")[1];
        console.log(this.showData[z].useprofilephoto);
      }
      this.showData = res;
    });
  }

  opendialog1(applicantid: any, pkcol: any) {
    console.log('applicantid', applicantid);
    console.log('pkcol', pkcol);
    let stredit = 'view';
    let url = "#/workflow/" + "mstapplicantmasters" + "/" + "mstapplicantmasters" + "/" + stredit + "/" + encodeURIComponent(pkcol);
    this.dialog.open(dataComponent,
      {
        "height": "85%",
        data: { modulename: "mstapplicantmasters", pkvalue: pkcol, url: url, ScreenType: 2 }
      }
    );
  }

  category_DeSelect(item:any){
    debugger;
    console.log("category",item.value);
      // this.skillcategory_List = [];
      // this.subcategoryid_List = [];
  }
  subcategory_DeSelect(item:any){

    console.log("subcategory",item.value);

  }
  onItemDeSelect(item: any) {
    debugger;
    this.segmentcategory_onChange('');
    console.log(item);
    if (item == "") {
      this.skillcategory_List = [];
      this.subcategoryid_List = [];
    }

    // console.log(this.AdminDropdown_Form.getRawValue());
    const index: number = this.skillcategoryarry.indexOf(item.value);
    console.log(index);
    if (index !== -1) {
      this.skillcategoryarry.splice(index, 1);
    }

  }
  checktest() {
    const slideValue = document.querySelector("span");
    const inputSlider = document.querySelector("input");
    inputSlider.oninput = (() => {
      let value = inputSlider.value;
      slideValue.textContent = value;
      slideValue.style.left = (value) + "%";
      slideValue.classList.add("show");
    });
    inputSlider.onblur = (() => {
      slideValue.classList.remove("show");
    });
  }


}
