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
    this.http.get(AppConstants.ntirebizURL + '/boreport/reportcode/mstsr').subscribe((res: any) => {
      console.log(res);
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
  valueChanged1(e: any) {
    debugger;
    console.log('e', e);
    this.locationValue = e.target.value;
    this.mstapplicantskilldetail_service.getMultipleSkillSearch(this.skillcategory1 ? this.skillcategory1 : null, this.skillcategory2 ? this.skillcategory2 : null, this.skillcategory3 ? this.skillcategory3 : null, this.rangevalue ? this.rangevalue : null, this.locationValue ? this.locationValue : null, null, null).then((res: any) => {
      console.log('res ', res);
      this.showData = res;
      for (let z = 0; this.showData.length > 0; z++) {
        this.showData[z].useprofilephoto = this.showData[z]?.useprofilephoto.split("\"")[1];
        console.log(this.showData[z].useprofilephoto);
      }
      this.showData = res;
    });
  }

  opendialog1(action, rowData) {
    debugger;
    let stredit = 'edit';
    if (rowData["noneditable"] == '1')
      stredit = 'view';
    stredit = 'view';
    //let url = "/#/workflow/" + rowData["modulename"] + "/" + rowData["modulename"] + "/"+stredit+"/" + encodeURIComponent(rowData["pkvalue"]);
    let url = "#/workflow/" + rowData["modulename"] + "/" + rowData["modulename"] + "/" + stredit + "/" + encodeURIComponent(rowData["pkvalue"]);
    // this.sharedService.alert(url);
    this.dialog.open(dataComponent,
      {
        data: { modulename: rowData["modulename"], pkvalue: rowData["pkvalue"], url: url, ScreenType: 2 }
      }
    );
  }

  buttonactions(action, rowData) {
    debugger;
    //this.sharedService.alert('a');
    if (action.actionid != "-4002" && action.actionid != "-4006") {
      //if (!confirm("Do you want to proceed with " + action.description + "?")) return;
    }

    let actionid = action.actionid;
    this.boreportviewerservice.formid = 0;
    if (this.dialogdata != null && this.dialogdata["formid"] != null) this.boreportviewerservice.formid = this.dialogdata["formid"];
    // console.log(this.selecteddata);
    this.boreportviewerservice.actionids = [];

    this.boreportviewerservice.actionids.push("" + rowData['pkcol']);

    if (this.menuactions != null) {
      for (let i = 0; i < this.menuactions.length; i++) {
        if (this.menuactions[i].actionid == actionid) {
          var objmenuaction = this.menuactions[i];
          if (objmenuaction.actiontype == "F" && objmenuaction.actionname == "opendialog") {
            this.opendialog(action, rowData);
          }
          else if (objmenuaction.actiontype == "F" && objmenuaction.actionname == "opendialog1") {
            this.opendialog1(action, rowData);
          }
          else if (objmenuaction.actiontype == "F" && objmenuaction.actionname == "openreportdialog") {
            this.openreportdialog(action, rowData);
          }
          else if (action.actionid == "-4002") {
            this.selecteddata = rowData;
            this.route('edit');
          }
          else if (action.actionid == "-4006") {
            this.selecteddata = rowData;
            this.route('view');
          }
          else {
            this.boreportviewerservice.action(this.pmenuid, this.menuactions[i], this.pmenucode).then((res: any) => {
              debugger;
              console.log(res);
              //this.Initialize(this.paramid, "");
              // this.toastService.addSingle("", "", (res as any).resultOutput);
              // this.sharedService.alert((res as any).resultOutput);
              this.ReportOutputAction(res);

            });
          }
          break;
        }
      }
    }

  }
  openreportdialog(action, rowData) {
    debugger;
    let stredit = 'edit';
    if (rowData["noneditable"] == '1')
      stredit = 'view';
    //let url = "/#/workflow/" + rowData["modulename"] + "/" + rowData["modulename"] + "/"+stredit+"/" + encodeURIComponent(rowData["pkvalue"]);
    let url = "/#/home/showpopup/mstre/module/" + this.configdata.maintablename + "/" + encodeURIComponent(rowData["pkcol"]) + "/menu/hide";// + encodeURIComponent(rowData["pkvalue"])
    //this.sharedService.alert(url);
    /*
    this.dialog.open(dataComponent,
        {
            data: { url: url, ScreenType: 2 }
        }
    );
    */
    this.dialog.open(ReportViewerCtrlComponent,
      {
        data: { reportid: 'mstre', modulepkcol: rowData["pkcol"], ScreenType: 3 }
      }
    );
  }
  opendialog(action, rowData) {
    this.router.navigate(["/home/" + rowData["modulename"] + "/" + rowData["modulename"] + "/edit/" + rowData["pkvalue"] + "/source/workflow/" + rowData["pk"]]);
    return;
    this.dialog.open(bodlgviewerComponent,
      {
        data: { url: "/modal/" + rowData["modulename"] + "/" + rowData["modulename"] + "/edit/" + rowData["pkvalue"] + "/workflow/" + rowData["pk"] }
      }
    ).onClose.subscribe(res => {
    });
  }
  route(action, recordid = null) {
    debugger;
    //document.getElementById("contentArea1").scrollTop = 0;
    if (this.bsameform) {
      if (action == 'create') {
        this.componentRef.instance.parameterid = null;
      }
      return;
    }
    let formname = "";
    //let recordid = "";


    if (this.configdata.maintablename == "boreports") {
      formname = "boreports";
      //PK
      //if(this.selecteddata!=null && action!="edit" || action!="delete")
      if (this.selecteddata != null) recordid = this.selecteddata["reportid"];
    }
    else {
      formname = (this.configdata.component as string);
      if (formname == null || formname == "") {
        formname = (this.configdata.maintablename as string).toLowerCase();

      }


    }
    if (recordid == null) {
      if (this.selecteddata != null && this.selecteddata != undefined && action != "create") {
        if ((action == "edit" || action == "delete") && (this.selecteddata.length > 1 || this.selecteddata.length < 1)) {
          this.sharedService.alert("Select a record");
          return;
        }
        if (this.selecteddata instanceof Array) {
          let firstrow = this.selecteddata[0];
          recordid = firstrow[((this.configdata.pk == "" || this.configdata.pk == undefined || this.configdata.pk == null) ? this.configdata.maintableidentityfield : "pkcol")]
        }
        else
          recordid = this.selecteddata[((this.configdata.pk == "" || this.configdata.pk == undefined || this.configdata.pk == null) ? this.configdata.maintableidentityfield : "pkcol")];
      }
      else if (action == "edit" || action == "delete" || (this.selecteddata != null && this.selecteddata != undefined && this.selecteddata.length > 1)) {
        this.sharedService.alert("Select a record");
        return;
      }
    }
    let query = "";
    if (this.fkname != null && this.fkname != "" && this.fk != null && this.fk != "") {
      query = "/" + this.fkname + "/" + this.fk;
    }
    if (this.fkname1 != null && this.fkname1 != "" && this.fk1 != null && this.fk1 != "") {
      query = query + "/" + this.fkname1 + "/" + this.fk1;
    }
    let child = false;
    //if(this.menumasterdata!=null && this.menumasterdata!=undefined)child=this.menumasterdata.childparent;

    let url = "";
    switch (action) {
      case 'url':
        query = query + "/menu/hide";
        url = '/#/home/' + formname + '/' + formname + '/edit/' + encodeURIComponent(this.selecteddata['pkcol']) + query;
        this.dialog.open(dataComponent,
          {
            data: { url: url, ScreenType: 2 }
          }
        );
        break
      case 'get':
        if (this.dialogdata.ScreenType == "2") this.dialogRef.close(this.selecteddata);
        break;
      case 'create':
        url = '/home/' + formname + '/' + formname + query
        if (this.dialogdata?.ScreenType == 2) {
          url = '#/workflow/' + formname + '/' + formname + query
          this.dialog.open(dataComponent,
            {
              data: { url: url, Save: true, ScreenType: 2 }
            }
          );
        }
        else
          this.router.navigate([url]);
        break;
      case 'view':
        //this.router.navigate(['/home/boreportviewer/view/' + this.configdata.reportid + '/' + recordid]);
        this.sessionService.setViewHtml(this.configdata.viewhtml);
        this.router.navigate(['/home/' + formname + '/' + formname + '/view/' + this.selecteddata['pkcol'] + query]);
        break;
      case 'edit':
        url = '/home/' + formname + '/' + formname + '/edit/' + this.selecteddata['pkcol'] + query

        if (this.dialogdata?.ScreenType == 2) {
          url = '#/workflow/' + formname + '/' + formname + '/edit/' + encodeURIComponent(this.selecteddata['pkcol']) + query


          this.dialog.open(dataComponent,
            {
              data: { url: url, Save: true, ScreenType: 2 }
            }
          );
        }
        else
          this.router.navigate([url]);


        break;
    }
  }
  ReportOutputAction(res) {
    //this.sharedService.alert('r');
    if ((res as any).gotopage != undefined && (res as any).gotopage != null && (res as any).gotopage != "") {
      let formname = (res as any).gotopage;
      let recordid = (res as any).gotoid;
      if (formname = "REPORT") {
        var reportparameters = recordid.split('#');
        ////debugger;
        this.paramid = reportparameters[0];
        this.updatemenu(this.paramid);



        //
        //this.paramsChange(reportparameters[0]);
      }
      else {
        this.router.navigate(['/home/' + formname + '/' + formname + '/edit/' + recordid]);
      }

    }
    else {
      // this.Initialize(this.paramid, "");
    }
  }
  async updatemenu(reportcode) {
    let res = await this.bomenumasterservice.getListBy_menuurl(reportcode);
    console.log(res);
    //this.sharedService.alert("res ");
    this.sharedService.menuid = (res as any)[0].menuid;
    this.sharedService.menucode = (res as any)[0].menucode;
    this.pmenuid = this.sharedService.menuid;
    this.pmenucode = this.sharedService.menucode;
    this.router.navigate(['/home/boreportviewer/' + reportcode]);
  }
  onItemDeSelect(item: any) {
    debugger;
    console.log(item);
    // this.districtLists = [];
    // this.stateLists = [];

    // // console.log(this.AdminDropdown_Form.getRawValue());
    // const index: number = this.Zone.indexOf(item.ZoneId);
    // console.log(index);
    // if (index !== -1) {
    //   this.Zone.splice(index, 1);
    // }
  }
}
