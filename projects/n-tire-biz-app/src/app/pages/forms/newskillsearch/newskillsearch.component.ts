import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { mstapplicantskilldetail } from '../../../model/mstapplicantskilldetail.model';
import { mstapplicantskilldetailService } from '../../../service/mstapplicantskilldetail.service';
import { AppConstants, DropDownValues } from '../../../shared/helper';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { mstapplicantgeographypreferenceService } from './../../../service/mstapplicantgeographypreference.service';
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
  selectOptions: DropDownValues[];
  selectedOptions: any;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings;
  categorySettings: IDropdownSettings;
  subCategorySettings: IDropdownSettings;
  mstapplicantgeographypreference_Form: FormGroup;
  country_List: DropDownValues[];
  country_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
  city_List: DropDownValues[];
  city_optionsEvent: EventEmitter<any> = new EventEmitter<any>();
  rangevalue = 0;
  skillcategory: any;
  label: any;
  skillcategoryarry: any[] = []
  skillcategory1: any;
  skillsegment1: any;
  getdata2: any;
  skillsegment2: any;
  skillcategory3: any;
  rangevalue1: any;
  skillcategory4: any;
  constructor(private http: HttpClient, private mstapplicantskilldetail_service: mstapplicantskilldetailService, private mstapplicantgeographypreference_service: mstapplicantgeographypreferenceService, private fb: FormBuilder) {
    this.mstapplicantgeographypreference_Form = this.fb.group({
      country: [null],
      countrydesc: [null],
      city: [null],
      citydesc: [null],
    });
  }

  ngOnInit() {
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
  valueChanged(e) {
    console.log('e', e);
    this.rangevalue = e.target.value;
  }
  get f() { return this.mstapplicantskilldetail_Form.controls; }
  segmentcategory_onChange(evt: any) {
    debugger
    let e = evt.value;
    this.skillcategoryarry.push({ segment: evt.label })
    for (let i = 0; i < this.skillcategoryarry.length; i++) {
      this.skillcategory1 = this.skillcategoryarry[i].segment
      this.skillcategory = this.skillcategory1
    }
    this.skillcategory = evt.label
    this.getidd = e

    if (this.getidd == "166") {
      this.showinput1 = true
    } else {
      this.showinput2 = false
      this.showinput3 = false
      this.showinput1 = false
    }
    // this.mstapplicantskilldetail_Form.patchValue({ segmentcategorydesc: evt.options[evt.options.selectedIndex].text, segmentid: e });
    setTimeout(() => {
      // if (this.f.segmentid.value && this.f.segmentid.value != "" && this.f.segmentid.value != null)
      this.mstapplicantskilldetail_service.getList_skillcategory2(e).then((res: any) => {
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
    this.skillcategoryarry.push({ category: evt.code })
    for (let i = 0; i < this.skillcategoryarry.length; i++) {
      this.skillsegment1 = this.skillcategoryarry[i].category
      this.skillcategory = this.skillcategory1 + ',' + this.skillsegment1
    }
    // console.log('eeeeee',e);

    this.getidd1 = e
    if (this.getidd1 == "262") {
      this.showinput2 = true
    } else {
      this.showinput2 = false
    }
    // setTimeout(() => {
    debugger
    this.mstapplicantskilldetail_service.getList_subcategoryid2(this.getidd1).then((res: any) => {
      this.subcategoryid_List = res as DropDownValues[]
    });
    // });
  }
  subcategoryid_onChange(evt: any) {
    debugger
    let e = evt.subcategoryid;
    this.skillcategoryarry.push({ subcate: evt.code })

    for (let i = 0; i < this.skillcategoryarry.length; i++) {
      this.skillsegment2 = this.skillcategoryarry[i].subcate
      this.skillcategory = this.skillcategory1 + ',' + this.skillsegment1 + ',' + this.skillsegment2
    }
    console.log('eeeeee', e);

    this.getdata2 = e
    if (this.getdata2 == "411") {
      this.showinput3 = true
    } else {
      this.showinput3 = false
    }
    // this.mstapplicantskilldetail_Form.patchValue({ subcategoryiddesc: evt.options[evt.options.selectedIndex].text, categoryid: this.getdata2 });
  }
  onSelected_country(countryDetail: any) {
    debugger
    if (countryDetail.value && countryDetail) {
      this.mstapplicantgeographypreference_Form.patchValue({
        country: countryDetail.value,
        countrydesc: countryDetail.label,

      });
      this.mstapplicantgeographypreference_service.getList_city(countryDetail.value).then(res => {

        // this.country_List = res as DropDownValues[]
        this.city_List = res as DropDownValues[]

      }).catch((err) => { });

    }
  }
  onSelected_city(cityDetail: any) {

    if (cityDetail.cityid && cityDetail) {
      this.mstapplicantgeographypreference_Form.patchValue({
        city: cityDetail.cityid,
        citydesc: cityDetail.name,

      });

      this.mstapplicantgeographypreference_service.getList(cityDetail.cityid).then(res => {
        console.log(res)

        this.city_List = res as DropDownValues[]
      }).catch((err) => {
      });
    }
  }
}
