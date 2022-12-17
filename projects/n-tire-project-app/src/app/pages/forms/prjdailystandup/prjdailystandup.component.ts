import { prjdailystandupService } from './../../../service/prjdailystandup.service';
import { prjdailystandup } from './../../../model/prjdailystandup.model';
import { ElementRef, Component, OnInit, Inject, Optional, ViewChild, EventEmitter } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu
import { boconfigvalue } from '../../../../../../n-tire-bo-app/src/app/model/boconfigvalue.model';
import { boconfigvalueService } from '../../../../../../n-tire-bo-app/src/app/service/boconfigvalue.service';

//Custom error functions
import { KeyValuePair, MustMatch, DateCompare, MustEnable, MustDisable, Time } from '../../../../../../n-tire-bo-app/src/app/shared/general.validator';

//child table
import { SmartTableDatepickerComponent, SmartTableDatepickerRenderComponent } from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-datepicker.component';
import { SmartTablepopupselectComponent, SmartTablepopupselectRenderComponent } from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-popupselect.component';

//Custom control
import { durationComponent } from '../../../../../../n-tire-bo-app/src/app/custom/duration.component';
import { LocalDataSource } from 'ng2-smart-table';
import {Ng2SmartTableComponent} from 'ng2-smart-table';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput, ShortcutEventOutput } from "ng-keyboard-shortcuts";
//Shortcuts
import { KeyboardShortcutsService } from "ng-keyboard-shortcuts";
//translator
import { TranslateService } from "@ngx-translate/core";
//FK field services
//detail table services
import { prjdailystandupdetail } from './../../../model/prjdailystandupdetail.model';
//FK services
import { switchMap, map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator, ValidationErrors } from '@angular/forms';
//primeng services
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import { DialogService } from 'primeng/dynamicDialog';
//session,application constants
import { SharedService } from '../../../../../../n-tire-bo-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
//custom fields & attachments

@Component({
  selector: 'app-prjdailystandup',
  templateUrl: './prjdailystandup.component.html',
  styles: [],
  providers: [KeyboardShortcutsService]
})



export class prjdailystandupComponent implements OnInit {
  viewhtml: any = '';//stores html view of the screen
  showview: boolean = false;//view or edit mode
  theme: string = "";//current theme
  formdata: any;//current form data
  shortcuts: ShortcutInput[] = [];//keyboard keys
  showsubmit: boolean = true;//button to show
  showGoWorkFlow: boolean = false;
  pkList: any;//stores values - used in search, prev, next
  pkoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete of pk
  pk_tblForm: FormGroup;//pk - autocomplete
  pk_tbloptions: any;//pk - autocomplete
  pk_tblformatter: any;//pk - autocomplete
  toolbarvisible: boolean = true;
  customfieldservicelist: any;
  CustomFormName: string = "";
  CustomFormField: string = "";
  CustomFormFieldValue: string = "";
  pmenuid: any;
  pcurrenturl: any;
  isSubmitted: boolean = false;
  ShowTableslist: string[] = [];
  data: any;
  data3: any = [];
  bfilterPopulateprjdailystandups: boolean = false;
  dataprjdailystandupdetailsquestion3: any = [];
  dataprjdailystandupdetailsrating3: any = [];
  bfilterPopulateprjdailystandupdetails: boolean = false;
  @ViewChild('tblprjdailystandupdetailssource', { static: false }) tblprjdailystandupdetailssource: Ng2SmartTableComponent;
  prjdailystandupForm: FormGroup;
  private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
  showformtype: any;
  formid: any;
  pkcol: any;
  SESSIONUSERID: any;//current user
  sessiondata: any;



  prjdailystandupdetailsvisiblelist: any;
  prjdailystandupdetailshidelist: any;

  DeletedprjdailystandupdetailIDs: string = "";
  prjdailystandupdetailsID: string = "1";
  prjdailystandupdetailsselectedindex: any;


  constructor(
    private translate: TranslateService,
    private keyboard: KeyboardShortcutsService, private router: Router,
    public ngbDateParserFormatter: NgbDateParserFormatter,
    public dialogRef: DynamicDialogRef,
    public dynamicconfig: DynamicDialogConfig,
    public dialog: DialogService,
    private prjdailystandupservice: prjdailystandupService,
    private fb: FormBuilder,
    private sharedService: SharedService,
    public sessionService: SessionService,
    private toastr: ToastService,
    //private dialog: NbDialogService,
    private configservice: boconfigvalueService,
    private currentRoute: ActivatedRoute) {
    this.translate = this.sharedService.translate;
    this.data = dynamicconfig;
    this.pmenuid = sharedService.menuid;
    this.pcurrenturl = sharedService.currenturl;
    this.keyboard.add([
      {
        key: 'cmd l',
        command: () => this.router.navigate(["/home/" + this.pcurrenturl]),
        preventDefault: true
      },
      {
        key: 'cmd s',
        command: () => this.onSubmitData(false),
        preventDefault: true
      },
      {
        key: 'cmd f',
        command: () => this.resetForm(),
        preventDefault: true
      }
    ]);
    this.prjdailystandupForm = this.fb.group({
      pk: [null], standupid: [null],
      projectid: [null],
      currentdate: [null],
      status: [null],
      statusdesc: [null],
    });
  }

  get f() { return this.prjdailystandupForm.controls; }


  //when child screens are clicked - it will be made invisible
  ToolBar(prop:any) {
    this.toolbarvisible = prop;
  }

  //function called when we navigate to other page.defined in routing
  canDeactivate(): Observable<boolean> | boolean {
    debugger;
    if (this.prjdailystandupForm.dirty && this.prjdailystandupForm.touched) {
      if (confirm('Do you want to exit the page?')) {
        return Observable.of(true).delay(1000);
      } else {
        return Observable.of(false);
      }
    }
    return Observable.of(true);
  }

  //check Unique fields

  //navigation buttons
  first() {
    if (this.pkList.length > 0) this.PopulateScreen(this.pkList[0].pkcol);
  }

  last() {
    if (this.pkList.length > 0) this.PopulateScreen(this.pkList[this.pkList.length - 1].pkcol);
  }

  prev() {
    debugger;
    let pos = this.pkList.map(function (e:any) { return e.standupid.toString(); }).indexOf(this.formid.toString());
    if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
  }

  next() {
    debugger;
    let pos = this.pkList.map(function (e:any) { return e.standupid.toString(); }).indexOf(this.formid.toString());
    if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
  }

  //on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.standupid && pkDetail) {
      this.PopulateScreen(pkDetail.pkcol);
    }
  }

  // initialize
  async ngOnInit() {
    //session & theme
    this.sessiondata = this.sessionService.getSession();
    if (this.sessiondata != null) {
      this.SESSIONUSERID = this.sessiondata.userid;
    }

    this.theme = this.sessionService.getItem('selected-theme');

    debugger;
    let prjdailystandupid = null;

    //getting data - from list page, from other screen through dialog
    if (this.data != null && this.data.data != null) this.data = this.data.data;
    if (this.data != null && this.data.showview != undefined && this.data.showview != null) this.showview = this.data.showview;
    if (this.data != null && this.data.event != null && this.data.event.data != null) this.data = this.data.event.data;
    //if view button(eye) is clicked
    if (this.currentRoute.snapshot.paramMap.get('viewid') != null) {
      this.pkcol = this.currentRoute.snapshot.paramMap.get('viewid');
      this.showview = true;
      this.viewhtml = this.sessionService.getViewHtml();
    }
    else if (this.data != null && this.data.pkcol != null) {
      this.pkcol = this.data.pkcol;
    }
    else {
      this.pkcol = this.currentRoute.snapshot.paramMap.get('id');
      this.showformtype = this.currentRoute.snapshot.paramMap.get('showformtype');
    }
    //copy the data from previous dialog 
    this.PopulateFromMainScreen(this.data, false);
    this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
    }
    this.formid = prjdailystandupid;
    //this.sharedService.alert(prjdailystandupid);

    //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
    if (this.pkcol == null) {
      this.SetprjdailystandupdetailsTableConfig();
      setTimeout(() => {
        this.SetprjdailystandupdetailsTableddConfig();
      });

      this.resetForm();
    }
    else {
      await this.PopulateScreen(this.pkcol);
      //get the record from api
      //foreign keys 
    }

    //autocomplete
    this.prjdailystandupservice.getprjdailystandupsList().then((res:any) => {
      this.pkList = res as prjdailystandup[];
      this.pkoptionsEvent.emit(this.pkList);
    }
    );
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.pkcol.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.pkcol;

    //setting the flag that the screen is not touched 
    this.prjdailystandupForm.markAsUntouched();
    this.prjdailystandupForm.markAsPristine();
  }



  resetForm() {
    if (this.prjdailystandupForm != null)
      this.prjdailystandupForm.reset();
    this.prjdailystandupForm.patchValue({
    });
    setTimeout(() => {
      this.prjdailystandupservice.prjdailystandupdetails = [];
      this.prjdailystandupdetailsLoadTable();
    });
    this.PopulateFromMainScreen(this.data, false);
    this.PopulateFromMainScreen(this.dynamicconfig.data, true);
  }

  onDelete() {
    let standupid = this.prjdailystandupForm.get('standupid')!.value;
    if (standupid != null) {
      if (confirm('Are you sure to delete this record ?')) {
        this.prjdailystandupservice.deleteprjdailystandup(standupid).then((res:any) => {
          this.resetForm();
        }
        );
      }
    }
    else {
      this.toastr.addSingle("error", "", "select a record");
    }
  }
  onCopy() {
    this.prjdailystandupForm.patchValue({
      standupid: null
    });
    if (this.prjdailystandupservice.formData.standupid != null) this.prjdailystandupservice.formData.standupid = null;
    for (let i = 0; i < this.prjdailystandupservice.prjdailystandupdetails.length; i++) {
      this.prjdailystandupservice.prjdailystandupdetails[i].standupdetailid = null;
    }
  }
  PopulateFromMainScreen(mainscreendata:any, bdisable:any) {
    if (mainscreendata != null) {
      for (let key in mainscreendata) {
        if (key != 'visiblelist' && key != 'hidelist' && key != 'event') {

          let jsonstring = "";
          let json = null;
          let ctrltype = typeof (mainscreendata[key]);
          if (false)
            json = "";
          else if (key == "currentdate")
            json = '{"' + key + '": ' + this.ngbDateParserFormatter.parse(mainscreendata[key]) + ' }';
          else if (ctrltype == "string") {
            jsonstring = '{"' + key + '": "' + mainscreendata[key] + '" }';
            json = JSON.parse(jsonstring);
          }
          else {
            jsonstring = '{"' + key + '": ' + mainscreendata[key] + ' }';
            json = JSON.parse(jsonstring);
          }
          {
            if (this.prjdailystandupForm.controls[key] != null) {
              this.prjdailystandupForm.patchValue(json);
              if (bdisable) this.prjdailystandupForm.controls[key].disable({ onlySelf: true });
            }
          }
        }
      }
    }
  }
  onClose() {
    this.dialogRef.close();
  }

  onSubmitAndWait() {
    if (this.data.save == true) {
      this.onSubmitData(false);
    }
    else if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
      this.onSubmitDataDlg(false);
    }
    else {
      this.onSubmitData(false);
    }
  }
  onSubmit() {
    if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
      this.onSubmitDataDlg(true);
    }
    else {
      this.onSubmitData(true);
    }
  }

  async PopulateScreen(pkcol: any) {
    this.prjdailystandupservice.getprjdailystandupsByEID(pkcol).then((res:any) => {

      this.formdata = res;
      let formproperty = res.formproperty;
      if (formproperty && formproperty.edit == false) this.showview = true;
      this.pkcol = res.pkcol;
      this.formid = res.prjdailystandup.standupid;
      this.FillData(res);
    });
  }

  FillData(res: any) {
    this.formid = res.prjdailystandup.standupid;
    console.log(res);
    //console.log(res.order);
    //console.log(res.orderDetails);
    this.prjdailystandupForm.patchValue({
      standupid: res.prjdailystandup.standupid,
      projectid: res.prjdailystandup.projectid,
      currentdate: this.ngbDateParserFormatter.parse(res.prjdailystandup.currentdate),
      status: res.prjdailystandup.status,
      statusdesc: res.prjdailystandup.statusdesc,
    });
    this.prjdailystandupdetailsvisiblelist = res.prjdailystandupdetailsvisiblelist;
    //Child Tables if any
    this.prjdailystandupservice.prjdailystandupdetails = res.prjdailystandupdetail;
    this.SetprjdailystandupdetailsTableConfig();
    this.prjdailystandupdetailsLoadTable();
    setTimeout(() => {
      this.SetprjdailystandupdetailsTableddConfig();
    });
  }

  validate() {
    let ret = true;
    return ret;
  }

  getHtml(html:any) {
    let ret = "";
    ret = html;
    for (let key in this.prjdailystandupForm.controls) {
      if (this.prjdailystandupForm.controls[key] != null) {
        ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.prjdailystandupForm.controls[key]!.value);
      }
    }
    return ret;
  }

  async onSubmitDataDlg(bclear:any) {
    this.isSubmitted = true;
    if (!this.prjdailystandupForm.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    var obj = this.prjdailystandupForm!.value;
    obj.currentdate = this.ngbDateParserFormatter.format(this.prjdailystandupForm.get('currentdate')!.value);
    console.log(obj);
    this.dialogRef.close(obj);
  }

  //This has to come from bomenuactions & procedures
  afteraction(mode: any) {
    let formname = "";
    let query = "";
    if (mode == "new")
      this.router.navigate(['/home/' + formname + '/' + formname + query]);
    else if (mode == "refresh")
      this.router.navigate(['/home/' + formname + '/' + formname + '/edit/' + this.formid + query]);
  }

  async onSubmitData(bclear:any) {
    debugger;
    this.isSubmitted = true;
    let strError = "";
    Object.keys(this.prjdailystandupForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.prjdailystandupForm.get(key)!.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
        });
      }
    });
    if (strError != "") return this.sharedService.alert(strError);


    if (!this.prjdailystandupForm.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    if (!this.validate()) {
      return;
    }
    this.prjdailystandupservice.formData = this.prjdailystandupForm!.value;
    if (this.dynamicconfig.data != null) {
      for (let key in this.dynamicconfig.data) {
        if (key != 'visiblelist' && key != 'hidelist') {
          if (this.prjdailystandupForm.controls[key] != null) {
            this.prjdailystandupservice.formData[key] = this.prjdailystandupForm.controls[key]!.value;
          }
        }
      }
    }
    this.prjdailystandupservice.formData.currentdate = new Date(this.ngbDateParserFormatter.format(this.prjdailystandupForm.get('currentdate')!.value) + '  UTC');
    this.prjdailystandupservice.formData.DeletedprjdailystandupdetailIDs = this.DeletedprjdailystandupdetailIDs;
    console.log(this.prjdailystandupservice.formData);
    this.prjdailystandupservice.saveOrUpdateprjdailystandups().subscribe(
      async (res:any) => {
        if (this.prjdailystandupdetailssource.data) {
          for (let i = 0; i < this.prjdailystandupdetailssource.data.length; i++) {
            if (this.prjdailystandupdetailssource.data[i].fileattachmentlist) await this.sharedService.upload(this.prjdailystandupdetailssource.data[i].fileattachmentlist);
          }
        }
        debugger;
        this.toastr.addSingle("success", "", "Successfully saved");
        document.getElementById("contentArea1").scrollTop = 0;
        if (this.dynamicconfig.data != undefined && this.dynamicconfig.data.save) {
          this.dialogRef.close((res as any).result!.value.prjdailystandup);
          return;
        }
        else {
          document.getElementById("contentArea1").scrollTop = 0;
        }
        this.prjdailystandupservice.clearList();
        if (bclear) {
          this.resetForm();
        }
        else {
          if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
            this.dialogRef.close((res as any).result!.value.prjdailystandup);
          }
          else {
            this.FillData((res as any).result!.value);
          }
        }
        this.prjdailystandupForm.markAsUntouched();
        this.prjdailystandupForm.markAsPristine();
      },
      (err:any) => {
        debugger;
        this.toastr.addSingle("error", "", err.error);
        console.log(err);
      }
    )
  }




  //dropdown edit from the screen itself -> One screen like Reportviewer

  onDeleteprjdailystandupdetail(event: any, childID: number, i: number) {
    if (childID != null)
      this.DeletedprjdailystandupdetailIDs += childID + ",";
    this.prjdailystandupservice.prjdailystandupdetails.splice(i, 1);
  }

  PrevForm() {
    let formid = this.sessionService.getItem("key");
    let prevform = this.sessionService.getItem("prevform");
    this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
  }
  //start of Grid Codes prjdailystandupdetails
  prjdailystandupdetailssettings: any;
  prjdailystandupdetailssource: any;

  showprjdailystandupdetailsCheckbox() {
    debugger;
    if (this.tblprjdailystandupdetailssource.settings['selectMode'] == 'multi') this.tblprjdailystandupdetailssource.settings['selectMode'] = 'single';
    else
      this.tblprjdailystandupdetailssource.settings['selectMode'] = 'multi';
    this.tblprjdailystandupdetailssource.initGrid();
  }
  deleteprjdailystandupdetailsAll() {
    this.tblprjdailystandupdetailssource.settings['selectMode'] = 'single';
  }
  showprjdailystandupdetailsFilter() {
    setTimeout(() => {
      this.SetprjdailystandupdetailsTableddConfig();
    });
    if (this.tblprjdailystandupdetailssource.settings != null) this.tblprjdailystandupdetailssource.settings['hideSubHeader'] = !this.tblprjdailystandupdetailssource.settings['hideSubHeader'];
    this.tblprjdailystandupdetailssource.initGrid();
  }
  showprjdailystandupdetailsInActive() {
  }
  enableprjdailystandupdetailsInActive() {
  }
  async SetprjdailystandupdetailsTableddConfig() {
    if (!this.bfilterPopulateprjdailystandupdetails) {

      this.configservice.getList("question").then((res:any) => {
        var dataquestion2 = res as any;
        var defaultobj = { value: "", title: "Select..." };
        this.dataprjdailystandupdetailsquestion3.push(defaultobj);
        for (let i = 0; i < dataquestion2.length; i++) {
          var obj = { value: dataquestion2[i].configkey, title: dataquestion2[i].configtext };
          this.dataprjdailystandupdetailsquestion3.push(obj);
        }
        var clone = this.sharedService.clone(this.tblprjdailystandupdetailssource.settings);
        if (clone.columns['question'] != undefined) clone.columns['question'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataprjdailystandupdetailsquestion3)), }, };
        if (clone.columns['question'] != undefined) clone.columns['question'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataprjdailystandupdetailsquestion3)), }, };
        this.tblprjdailystandupdetailssource.settings = clone;
        this.tblprjdailystandupdetailssource.initGrid();
      });

      this.configservice.getList("rating").then((res:any) => {
        var datarating2 = res as any;
        var defaultobj = { value: "", title: "Select..." };
        this.dataprjdailystandupdetailsrating3.push(defaultobj);
        for (let i = 0; i < datarating2.length; i++) {
          var obj = { value: datarating2[i].configkey, title: datarating2[i].configtext };
          this.dataprjdailystandupdetailsrating3.push(obj);
        }
        var clone = this.sharedService.clone(this.tblprjdailystandupdetailssource.settings);
        if (clone.columns['rating'] != undefined) clone.columns['rating'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataprjdailystandupdetailsrating3)), }, };
        if (clone.columns['rating'] != undefined) clone.columns['rating'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataprjdailystandupdetailsrating3)), }, };
        this.tblprjdailystandupdetailssource.settings = clone;
        this.tblprjdailystandupdetailssource.initGrid();
      });
    }
    this.bfilterPopulateprjdailystandupdetails = true;
  }
  async prjdailystandupdetailsbeforesave(event) {
    event.confirm.resolve(event.newData);



  }
  SetprjdailystandupdetailsTableConfig() {
    this.prjdailystandupdetailssettings = {
      hideSubHeader: true,
      mode: 'inline',
      selectMode: 'single',
      actions: {
        width: '300px',
        columnTitle: 'Actions',
        add: !this.showview,
        edit: !this.showview, // true,
        delete: !this.showview,
        custom: [
          // { name: 'viewrecord',type:'html', title: '<i style="width:10px" class="fa fa-eye"></i>'},
          // { name: 'editrecord',type:'html', title: '<i style="width:10px" class="nb-edit"></i>' }
        ]
      },
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmCreate: true,
      },
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmSave: true,
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
      columns: {
        projectid: {
          title: 'Project',
          type: 'number',
          filter: true,
        },
        currentdate: {
          title: 'Current Date',
          type: 'custom',
          renderComponent: SmartTableDatepickerRenderComponent,
          editor: {
            type: 'custom',
            component: SmartTableDatepickerComponent,
          },
        },
        userid: {
          title: 'User',
          type: 'number',
          filter: true,
        },
        question: {
          title: 'Question',
          type: '',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.dataprjdailystandupdetailsquestion3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        answer: {
          title: 'Answer',
          type: 'html',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        rating: {
          title: 'Rating',
          type: '',
          filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
          valuePrepareFunction: (cell, row) => {
            var element = this.dataprjdailystandupdetailsrating3.find(c => c!.value == cell);
            if (element != null && element != undefined) {
              return element.title;
            }
            return cell;
          },
        },
        notes: {
          title: 'Notes',
          type: 'html',
          filter: true,
          editor: {
            type: 'textarea',
          },
          valuePrepareFunction: (cell, row) => {
            return this.sharedService.ParseComment(cell);
          },
        },
      },
    };
  }
  prjdailystandupdetailsLoadTable() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.prjdailystandupdetailsID) >= 0) {
      this.prjdailystandupdetailssource = new LocalDataSource();
      this.prjdailystandupdetailssource.load(this.prjdailystandupservice.prjdailystandupdetails as any as LocalDataSource);
      this.prjdailystandupdetailssource.setPaging(1, 20, true);
    }
  }
  prjdailystandupdetailsroute(event, action) {
    switch (action) {
      case 'create':
        if (this.prjdailystandupservice.prjdailystandupdetails.length == 0) {
          this.tblprjdailystandupdetailssource.grid.createFormShown = true;
        }
        else {
          let obj = new prjdailystandupdetail();
          this.prjdailystandupservice.prjdailystandupdetails.push(obj);
          this.prjdailystandupdetailssource.refresh();
          if ((this.prjdailystandupservice.prjdailystandupdetails.length / this.prjdailystandupdetailssource.getPaging().perPage).toFixed(0) + 1 != this.prjdailystandupdetailssource.getPaging().page) {
            this.prjdailystandupdetailssource.setPage((this.prjdailystandupservice.prjdailystandupdetails.length / this.prjdailystandupdetailssource.getPaging().perPage).toFixed(0) + 1);
          }
          setTimeout(() => {
            this.tblprjdailystandupdetailssource.grid.edit(this.tblprjdailystandupdetailssource.grid.getLastRow());
          });
        }
        break;
      case 'delete':
        let index = this.prjdailystandupdetailssource.data.indexOf(event.data);
        this.onDeleteprjdailystandupdetail(event, event.data.standupdetailid, ((this.prjdailystandupdetailssource.getPaging().page - 1) * this.prjdailystandupdetailssource.getPaging().perPage) + index);
        this.prjdailystandupdetailssource.refresh();
        break;
    }
  }
  prjdailystandupdetailsPaging(val) {
    debugger;
    this.prjdailystandupdetailssource.setPaging(1, val, true);
  }

  handleprjdailystandupdetailsGridSelected(event) {
    this.prjdailystandupdetailsselectedindex = this.prjdailystandupservice.prjdailystandupdetails.findIndex(i => i.standupdetailid === event.data.standupdetailid);
  }
  IsprjdailystandupdetailsVisible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.prjdailystandupdetailsID) >= 0) {
      return "tbl";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes prjdailystandupdetails

}



