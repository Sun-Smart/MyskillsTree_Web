import { bouserrolemasterService } from './../../../service/bouserrolemaster.service';
import { bouserrolemaster } from './../../../model/bouserrolemaster.model';
import { ElementRef,Component, OnInit,Inject,Optional,ViewChild,EventEmitter  } from '@angular/core';
import { ToastService } from '../../core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu
import { boconfigvalue } from './../../../model/boconfigvalue.model';
import { boconfigvalueService } from './../../../service/boconfigvalue.service';

//Custom error functions
import { KeyValuePair,MustMatch, DateCompare,MustEnable,MustDisable,Time } from '../../../shared/general.validator';

//child table
import {SmartTableDatepickerComponent,SmartTableDatepickerRenderComponent} from '../../../custom/smart-table-datepicker.component';
import {SmartTablepopupselectComponent,SmartTablepopupselectRenderComponent} from '../../../custom/smart-table-popupselect.component';
import {SmartTableFileRenderComponent} from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-filerender.component';

//Custom control
import { durationComponent } from '../../../custom/duration.component';
import { LocalDataSource } from 'ng2-smart-table';
import {Ng2SmartTableComponent} from 'ng2-smart-table';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput, ShortcutEventOutput  } from "ng-keyboard-shortcuts";
//Shortcuts
import { KeyboardShortcutsService } from "ng-keyboard-shortcuts";
//translator
import { TranslateService } from "@ngx-translate/core";
//FK field services
//detail table services
import { bousertypemenuaccess } from './../../../model/bousertypemenuaccess.model';
//FK services
import { bomenumasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bomenumaster/bomenumaster.component';
import { bomenumasterService } from './../../../service/bomenumaster.service';
import { bouserrolemaster } from './../../../model/bouserrolemaster.model';
//FK services
import { bouserrolemasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bouserrolemaster/bouserrolemaster.component';
import { hrmsinterviewrolescoring } from '../../../../../../n-tire-hrms-app/src/app/model/hrmsinterviewrolescoring.model';
//FK services
import { switchMap,map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator,ValidationErrors } from '@angular/forms';
//primeng services
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import {DialogService} from 'primeng/dynamicDialog';
//session,application constants
import { SharedService } from '../../../service/shared.service';
import { SessionService } from '../../core/services/session.service';
//custom fields & attachments

@Component({
selector: 'app-bouserrolemaster',
templateUrl: './bouserrolemaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class bouserrolemasterComponent implements OnInit {
viewhtml:any='';//stores html view of the screen
showview:boolean=false;//view or edit mode
theme:string="";//current theme
//formdata: any;//current form data
shortcuts: ShortcutInput[] = [];//keyboard keys
showsubmit: boolean = true;//button to show
showGoWorkFlow: boolean = false;
pkList:any;//stores values - used in search, prev, next
pkoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete of pk
pk_tblForm: FormGroup;//pk - autocomplete
pk_tbloptions: any;//pk - autocomplete
pk_tblformatter: any;//pk - autocomplete
toolbarvisible:boolean=true;
customfieldservicelist:any;
CustomFormName:string="";
CustomFormField:string="";
CustomFormFieldValue:string="";
pmenuid:any;
pcurrenturl:any;
isSubmitted:boolean=false;
ShowTableslist:string[]=[];
data:any;
maindata:any;
data3:any=[];
bfilterPopulatebouserrolemasters:boolean=false;
bfilterPopulatebousertypemenuaccesses:boolean=false;
bfilterPopulatebouserrolemasters:boolean=false;
bfilterPopulatehrmsinterviewrolescorings:boolean=false;
@ViewChild('tblbousertypemenuaccessessource',{static:false}) tblbousertypemenuaccessessource: Ng2SmartTableComponent;
@ViewChild('tblbouserrolemasterssource',{static:false}) tblbouserrolemasterssource: Ng2SmartTableComponent;
@ViewChild('tblhrmsinterviewrolescoringssource',{static:false}) tblhrmsinterviewrolescoringssource: Ng2SmartTableComponent;
 bouserrolemasterForm: FormGroup;
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
sessiondata:any;



bousertypemenuaccessesvisiblelist:any;
bousertypemenuaccesseshidelist:any;
bouserrolemastersvisiblelist:any;
bouserrolemastershidelist:any;
hrmsinterviewrolescoringsvisiblelist:any;
hrmsinterviewrolescoringshidelist:any;

DeletedbousertypemenuaccessIDs: string="";
bousertypemenuaccessesID: string = "1";
bousertypemenuaccessesselectedindex:any;
DeletedbouserrolemasterIDs: string="";
bouserrolemastersID: string = "2";
bouserrolemastersselectedindex:any;
DeletedhrmsinterviewrolescoringIDs: string="";
hrmsinterviewrolescoringsID: string = "3";
hrmsinterviewrolescoringsselectedindex:any;


constructor(
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private bouserrolemasterservice: bouserrolemasterService,
private bomenumasterservice: bomenumasterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private currentRoute: ActivatedRoute) { 
this.translate=this.sharedService.translate;
this.data = dynamicconfig;
this.pmenuid=sharedService.menuid;
this.pcurrenturl=sharedService.currenturl;
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
this.bouserrolemasterForm  = this.fb.group({pk:[null],userroleid: [null],
userrole: [null, Validators.required],
thumbnail: [null],
musthaveskills: [null],
preferredskills: [null],
keywords: [null],
dealbreakers: [null],
softskills: [null],
additionalnotes: [null],
salary: [null],
screeningprocess: [null],
phoneinterviewers: [null],
onsiteinterviewprocess: [null],
points: [null],
advertisementtitle1: [null],
advertisementdetails1: [null],
advertisementtitle2: [null],
advertisementdetails2: [null],
advertisementtitle3: [null],
advertisementdetails3: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.bouserrolemasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.bouserrolemasterForm.dirty && this.bouserrolemasterForm.touched ) {
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
first()
{
  if(this.pkList.length>0) this.PopulateScreen(this.pkList[0].pkcol);
}

last()
{
 if(this.pkList.length>0) this.PopulateScreen(this.pkList[this.pkList.length-1].pkcol);
}

prev()
{
  debugger;
  let pos = this.pkList.map(function(e:any) { return e.userroleid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.userroleid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.userroleid && pkDetail) {
        this.PopulateScreen(pkDetail.pkcol);
    }
  }

// initialize
async ngOnInit() {
//session & theme
this.sessiondata = this.sessionService.getSession();
if (this.sessiondata != null) {
    this.SESSIONUSERID=this.sessiondata.userid;
}

this.theme=this.sessionService.getItem('selected-theme');

debugger;
let bouserrolemasterid = null;

//getting data - from list page, from other screen through dialog
if(this.data!=null && this.data.data!=null)
 {
this.data=this.data.data;
this.maindata = this.data;
}
if(this.maindata!=null && this.maindata.showview!=undefined  && this.maindata.showview!=null)this.showview=this.maindata.showview;
if (this.data != null &&  this.data.event != null && this.data.event.data != null) this.data = this.data.event.data;
 //if view button(eye) is clicked
if ( this.currentRoute.snapshot.paramMap.get('viewid') != null) 
{
this.pkcol=this.currentRoute.snapshot.paramMap.get('viewid');
this.showview=true;
this.viewhtml=this.sessionService.getViewHtml();
}
else if(this.data!=null && this.data.pkcol!=null)
{
this.pkcol=this.data.pkcol;
}
else
{
this.pkcol=this.currentRoute.snapshot.paramMap.get('id');
this.showformtype  = this.currentRoute.snapshot.paramMap.get('showformtype');
}
//copy the data from previous dialog 
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
{
this.ShowTableslist=this.currentRoute.snapshot.paramMap.get('tableid').split(',');
}
this.formid=bouserrolemasterid;
//this.sharedService.alert(bouserrolemasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetbousertypemenuaccessesTableConfig();
  setTimeout(() => {
  this.SetbousertypemenuaccessesTableddConfig();
  });

this.SetbouserrolemastersTableConfig();
  setTimeout(() => {
  this.SetbouserrolemastersTableddConfig();
  });

this.SethrmsinterviewrolescoringsTableConfig();
  setTimeout(() => {
  this.SethrmsinterviewrolescoringsTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}

//autocomplete
    this.bouserrolemasterservice.getbouserrolemastersList().then(res => {
      this.pkList = res as bouserrolemaster[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.userrole.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.userrole;

//setting the flag that the screen is not touched 
this.bouserrolemasterForm.markAsUntouched();
this.bouserrolemasterForm.markAsPristine();
}



resetForm() {
if (this.bouserrolemasterForm != null)
this.bouserrolemasterForm.reset();
this.bouserrolemasterForm.patchValue({
});
setTimeout(() => {
this.bouserrolemasterservice.bousertypemenuaccesses=[];
this.bouserrolemasterservice.Insertbousertypemenuaccesses=[];
this.bousertypemenuaccessesLoadTable();
this.bouserrolemasterservice.bouserrolemasters=[];
this.bouserrolemastersLoadTable();
this.bouserrolemasterservice.hrmsinterviewrolescorings=[];
this.hrmsinterviewrolescoringsLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let userroleid = this.bouserrolemasterForm.get('userroleid').value;
        if(userroleid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.bouserrolemasterservice.deletebouserrolemaster(userroleid).then(res =>
                {
                this.resetForm();
                }
            ).catch((err) => {console.log(err);});
        }
        }
        else
        {
            this.toastr.addSingle("error","","select a record");
        }
    }
    onCopy(){
    this.bouserrolemasterForm.patchValue({
        userroleid: null
    });
    if(this.bouserrolemasterservice.formData.userroleid!=null)this.bouserrolemasterservice.formData.userroleid=null;
for (let i=0;i<this.bouserrolemasterservice.bousertypemenuaccesses.length;i++) {
this.bouserrolemasterservice.bousertypemenuaccesses[i].rolemenuaccessid=null;
}
for (let i=0;i<this.bouserrolemasterservice.bouserrolemasters.length;i++) {
this.bouserrolemasterservice.bouserrolemasters[i].userroleid=null;
}
for (let i=0;i<this.bouserrolemasterservice.hrmsinterviewrolescorings.length;i++) {
this.bouserrolemasterservice.hrmsinterviewrolescorings[i].userrolescoringid=null;
}
    }
    PopulateFromMainScreen(mainscreendata:any,bdisable:any)
    {
    if(mainscreendata!=null)
    {
      for (let key in mainscreendata) {
if(key!='visiblelist' && key!='hidelist' && key!='event'){
        
        let jsonstring="";
        let json=null;
let ctrltype=typeof (mainscreendata[key]);
if(false)
json="";
        else if(ctrltype=="string")
{
this.bouserrolemasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.bouserrolemasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.bouserrolemasterForm.controls[key]!=undefined)this.bouserrolemasterForm.controls[key].disable({onlySelf: true});
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
if(this.maindata==undefined || this.maindata.save==true)
{
    this.onSubmitData(false);
}
else if(this.maindata!=null  && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.onSubmitDataDlg(false);
}
else
{
this.onSubmitData(false);
}
}
onSubmit() {
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.onSubmitDataDlg(true);
}
else
{
this.onSubmitData(true);
}
}

async PopulateScreen(pkcol:any){
this.bouserrolemasterservice.getbouserrolemastersByEID(pkcol).then(res => {

this.bouserrolemasterservice.formData=res;
let formproperty=res.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pkcol;
this.formid=res.bouserrolemaster.userroleid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.bouserrolemaster.userroleid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.bouserrolemasterForm.patchValue({
userroleid: res.bouserrolemaster.userroleid,
userrole: res.bouserrolemaster.userrole,
thumbnail: res.bouserrolemaster.thumbnail,
musthaveskills: res.bouserrolemaster.musthaveskills,
preferredskills: res.bouserrolemaster.preferredskills,
keywords: res.bouserrolemaster.keywords,
dealbreakers: res.bouserrolemaster.dealbreakers,
softskills: res.bouserrolemaster.softskills,
additionalnotes: res.bouserrolemaster.additionalnotes,
salary: res.bouserrolemaster.salary,
screeningprocess: res.bouserrolemaster.screeningprocess,
phoneinterviewers: res.bouserrolemaster.phoneinterviewers,
onsiteinterviewprocess: res.bouserrolemaster.onsiteinterviewprocess,
points: res.bouserrolemaster.points,
advertisementtitle1: res.bouserrolemaster.advertisementtitle1,
advertisementdetails1: res.bouserrolemaster.advertisementdetails1,
advertisementtitle2: res.bouserrolemaster.advertisementtitle2,
advertisementdetails2: res.bouserrolemaster.advertisementdetails2,
advertisementtitle3: res.bouserrolemaster.advertisementtitle3,
advertisementdetails3: res.bouserrolemaster.advertisementdetails3,
status: res.bouserrolemaster.status,
statusdesc: res.bouserrolemaster.statusdesc,
});
this.bousertypemenuaccessesvisiblelist=res.bousertypemenuaccessesvisiblelist;
this.bouserrolemastersvisiblelist=res.bouserrolemastersvisiblelist;
this.hrmsinterviewrolescoringsvisiblelist=res.hrmsinterviewrolescoringsvisiblelist;
//Child Tables if any
this.bouserrolemasterservice.bousertypemenuaccesses = res.bousertypemenuaccesses;
this.SetbousertypemenuaccessesTableConfig();
this.bousertypemenuaccessesLoadTable();
  setTimeout(() => {
  this.SetbousertypemenuaccessesTableddConfig();
  });
this.bouserrolemasterservice.Insertbousertypemenuaccesses=[];
this.bouserrolemasterservice.bouserrolemasters = res.bouserrolemasters;
this.SetbouserrolemastersTableConfig();
this.bouserrolemastersLoadTable();
  setTimeout(() => {
  this.SetbouserrolemastersTableddConfig();
  });
this.bouserrolemasterservice.hrmsinterviewrolescorings = res.hrmsinterviewrolescorings;
this.SethrmsinterviewrolescoringsTableConfig();
this.hrmsinterviewrolescoringsLoadTable();
  setTimeout(() => {
  this.SethrmsinterviewrolescoringsTableddConfig();
  });
}

validate()
{
let ret=true;
return ret;
}

getHtml(html:any)
{
  let ret = "";
  ret = html;
  for (let key in this.bouserrolemasterForm.controls) {
    if (this.bouserrolemasterForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.bouserrolemasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.bouserrolemasterForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.bouserrolemasterForm.value;
console.log(obj);
if (!confirm('Do you want to want to save?')) {
return;
}
this.dialogRef.close(obj);
setTimeout(() => {
//this.dialogRef.destroy();
},200);
}

//This has to come from bomenuactions & procedures
afteraction(mode:any)
{
    let formname="";
    let query="";
    if(mode=="new")
        this.router.navigate(['/home/' + formname + '/' + formname + query]);
    else if(mode=="refresh")
        this.router.navigate(['/home/' + formname + '/' + formname + '/edit/' + this.formid + query]);
}

async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.bouserrolemasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.bouserrolemasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.bouserrolemasterForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.bouserrolemasterservice.formData=this.bouserrolemasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.bouserrolemasterForm.controls[key] != null)
    {
        this.bouserrolemasterservice.formData[key] = this.bouserrolemasterForm.controls[key].value;
    }
}
}
}
this.bouserrolemasterservice.formData.DeletedbousertypemenuaccessIDs = this.DeletedbousertypemenuaccessIDs;
this.bouserrolemasterservice.formData.DeletedbouserrolemasterIDs = this.DeletedbouserrolemasterIDs;
this.bouserrolemasterservice.formData.DeletedhrmsinterviewrolescoringIDs = this.DeletedhrmsinterviewrolescoringIDs;
console.log(this.bouserrolemasterservice.formData);
this.bouserrolemasterservice.formData=this.bouserrolemasterForm.value;
this.bouserrolemasterservice.saveOrUpdatebouserrolemasters().subscribe(
async res => {
if (this.bousertypemenuaccessessource.data)
{
    for (let i = 0; i < this.bousertypemenuaccessessource.data.length; i++)
    {
        if (this.bousertypemenuaccessessource.data[i].fileattachmentlist)await this.sharedService.upload(this.bousertypemenuaccessessource.data[i].fileattachmentlist);
    }
}
if (this.bouserrolemasterssource.data)
{
    for (let i = 0; i < this.bouserrolemasterssource.data.length; i++)
    {
        if (this.bouserrolemasterssource.data[i].fileattachmentlist)await this.sharedService.upload(this.bouserrolemasterssource.data[i].fileattachmentlist);
    }
}
if (this.hrmsinterviewrolescoringssource.data)
{
    for (let i = 0; i < this.hrmsinterviewrolescoringssource.data.length; i++)
    {
        if (this.hrmsinterviewrolescoringssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsinterviewrolescoringssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.bouserrolemaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.bouserrolemasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.bouserrolemaster);
}
else
{
this.FillData(res);
}
}
this.bouserrolemasterForm.markAsUntouched();
this.bouserrolemasterForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditbouserrolemaster(event:any,userroleid:any, userroleid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(bouserrolemasterComponent, 
{
data:  {  showview:this.showview,save:false,event,userroleid, userroleid,visiblelist:this.bouserrolemastersvisiblelist,  hidelist:this.bouserrolemastershidelist,ScreenType:2  },
header: 'UserRole Masters'
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.bouserrolemasterssource.add(res);
this.bouserrolemasterssource.refresh();
}
else
{
this.bouserrolemasterssource.update(event.data, res);
}
}
});
}

onDeletebouserrolemaster(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedbouserrolemasterIDs += childID + ",";
this.bouserrolemasterservice.bouserrolemasters.splice(i, 1);
//this.updateGrandTotal();
}

onDeletehrmsinterviewrolescoring(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsinterviewrolescoringIDs += childID + ",";
this.bouserrolemasterservice.hrmsinterviewrolescorings.splice(i, 1);
}

PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes bousertypemenuaccesses
onCustombousertypemenuaccessesAction(event:any) {
debugger;
switch ( event.action) {
    case 'viewrecord':
      let val=event.data.pkcol;
      this.dialog.open(bomenumasterComponent,
        {
          data: { showview: false, pkcol:val, ScreenType: 2 },
          header: 'bomenumaster details'
        }
      ).onClose.subscribe(res => {
      });
      break;
    }
  }
bousertypemenuaccessessettings:any;
bousertypemenuaccessessource: any;

showbousertypemenuaccessesCheckbox()
{
debugger;
if(this.tblbousertypemenuaccessessource.settings['selectMode']== 'multi')this.tblbousertypemenuaccessessource.settings['selectMode']= 'single';
else
this.tblbousertypemenuaccessessource.settings['selectMode']= 'multi';
this.tblbousertypemenuaccessessource.initGrid();
}
deletebousertypemenuaccessesAll()
{
this.tblbousertypemenuaccessessource.settings['selectMode'] = 'single';
}
showbousertypemenuaccessesFilter()
{
  setTimeout(() => {
  this.SetbousertypemenuaccessesTableddConfig();
  });
      if(this.tblbousertypemenuaccessessource.settings!=null)this.tblbousertypemenuaccessessource.settings['hideSubHeader'] =!this.tblbousertypemenuaccessessource.settings['hideSubHeader'];
this.tblbousertypemenuaccessessource.initGrid();
}
showbousertypemenuaccessesInActive()
{
}
enablebousertypemenuaccessesInActive()
{
}
async SetbousertypemenuaccessesTableddConfig()
{
if(!this.bfilterPopulatebousertypemenuaccesses){
}
this.bfilterPopulatebousertypemenuaccesses=true;
}
async bousertypemenuaccessesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetbousertypemenuaccessesTableConfig()
{
this.bousertypemenuaccessessettings = {
hideSubHeader: true,
mode: 'external',
selectMode: 'multi',
actions: {
width:'300px',
add: false,
edit: false, 
delete: false,
custom: [
  { name: 'viewrecord', title: '<i class="fa fa-external-link"></i>'}
],
},
columns: {
rolemenuaccessid: {
title: 'Role Menu Access',
type: '',
},
menuid: {
title: 'Menu',
type: '',
},
menudescription: {
title: 'Menudescription',
type: '',
},
menuurl: {
title: 'Menuurl',
type: '',
},
parentid: {
title: 'Parent',
type: '',
},
},
};
}
bousertypemenuaccessesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bousertypemenuaccessesID)>=0)
{
this.bousertypemenuaccessessource=new LocalDataSource();
this.bousertypemenuaccessessource.load(this.bouserrolemasterservice.bousertypemenuaccesses as  any as LocalDataSource);
setTimeout(() => { 
if(this.tblbousertypemenuaccessessource!=null)
{this.tblbousertypemenuaccessessource.grid.getRows().forEach((row:any) => {
if(row.data.rolemenuaccessid!=null && row.data.rolemenuaccessid!="")
{
this.bouserrolemasterservice.Insertbousertypemenuaccesses.push(row.data);
this.tblbousertypemenuaccessessource.grid.multipleSelectRow(row);
}
});
}
});
}
}

//external to inline
/*
bousertypemenuaccessesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.bouserrolemasterservice.bousertypemenuaccesses.length == 0)
{
    this.tblbousertypemenuaccessessource.grid.createFormShown = true;
}
else
{
    let obj = new bousertypemenuaccess();
    this.bouserrolemasterservice.bousertypemenuaccesses.push(obj);
    this.bousertypemenuaccessessource.refresh();
    if ((this.bouserrolemasterservice.bousertypemenuaccesses.length / this.bousertypemenuaccessessource.getPaging().perPage).toFixed(0) + 1 != this.bousertypemenuaccessessource.getPaging().page)
    {
        this.bousertypemenuaccessessource.setPage((this.bouserrolemasterservice.bousertypemenuaccesses.length / this.bousertypemenuaccessessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblbousertypemenuaccessessource.grid.edit(this.tblbousertypemenuaccessessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.bousertypemenuaccessessource.data.indexOf(event.data);
this.onDeletebousertypemenuaccess(event,event.data.rolemenuaccessid,((this.bousertypemenuaccessessource.getPaging().page-1) *this.bousertypemenuaccessessource.getPaging().perPage)+index);
this.bousertypemenuaccessessource.refresh();
break;
}
}

*/
bousertypemenuaccessesPaging(val)
{
debugger;
this.bousertypemenuaccessessource.setPaging(1, val, true);
}

handlebousertypemenuaccessesGridSelected(event:any) {
debugger;

if(event.isSelected)
{
if(event.data.rolemenuaccessid==null || event.data.rolemenuaccessid=="")
{
var obj={roleid:this.formid,menuid:event.data.menuid}
this.bouserrolemasterservice.Insertbousertypemenuaccesses.push(obj as any);
}
else
{
var deletedids=this.DeletedbousertypemenuaccessIDs.split(',');

let i:number=0;
deletedids.forEach(id => {
if(id==event.data.rolemenuaccessid)
{
deletedids.splice(i,1);
}
i++;
});
deletedids.join(",");
}
}
else
{
if(event.data.rolemenuaccessid!=null && event.data.rolemenuaccessid!="")this.DeletedbousertypemenuaccessIDs += event.data.rolemenuaccessid + ","; 
}
}
IsbousertypemenuaccessesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bousertypemenuaccessesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes bousertypemenuaccesses
//start of Grid Codes bouserrolemasters
bouserrolemasterssettings:any;
bouserrolemasterssource: any;

showbouserrolemastersCheckbox()
{
debugger;
if(this.tblbouserrolemasterssource.settings['selectMode']== 'multi')this.tblbouserrolemasterssource.settings['selectMode']= 'single';
else
this.tblbouserrolemasterssource.settings['selectMode']= 'multi';
this.tblbouserrolemasterssource.initGrid();
}
deletebouserrolemastersAll()
{
this.tblbouserrolemasterssource.settings['selectMode'] = 'single';
}
showbouserrolemastersFilter()
{
  setTimeout(() => {
  this.SetbouserrolemastersTableddConfig();
  });
      if(this.tblbouserrolemasterssource.settings!=null)this.tblbouserrolemasterssource.settings['hideSubHeader'] =!this.tblbouserrolemasterssource.settings['hideSubHeader'];
this.tblbouserrolemasterssource.initGrid();
}
showbouserrolemastersInActive()
{
}
enablebouserrolemastersInActive()
{
}
async SetbouserrolemastersTableddConfig()
{
if(!this.bfilterPopulatebouserrolemasters){
}
this.bfilterPopulatebouserrolemasters=true;
}
async bouserrolemastersbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetbouserrolemastersTableConfig()
{
this.bouserrolemasterssettings = {
hideSubHeader: true,
mode: 'external',
selectMode: 'single',
actions: {
width:'300px',
columnTitle: 'Actions',
add: !this.showview,
edit: true, // true,
delete:!this.showview,
custom: [
// { name: 'viewrecord',type:'html', title: '<i style="width:10px" class="fa fa-eye"></i>'},
// { name: 'editrecord',type:'html', title: '<i style="width:10px" class="nb-edit"></i>' }
]
},
add: {
addButtonContent: '<i class="nb-plus"></i>',
createButtonContent: '<i class="nb-checkmark"></i>',
cancelButtonContent: '<i class="nb-close"></i>',
confirmCreate:true,},
edit: {
editButtonContent: '<i class="nb-edit"></i>',
saveButtonContent: '<i class="nb-checkmark"></i>',
cancelButtonContent: '<i class="nb-close"></i>',
confirmSave:true,},
delete: {
deleteButtonContent: '<i class="nb-trash"></i>',
confirmDelete: true,
},
columns: {
userrole: {
title: 'User Role',
type: '',
filter:true,
},
thumbnail: {
title: 'Thumbnail',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
musthaveskills: {
title: 'Must Have Skills',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
preferredskills: {
title: 'Preferred Skills',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
keywords: {
title: 'Keywords',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
dealbreakers: {
title: 'Dealbreakers',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
softskills: {
title: 'Soft Skills',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
additionalnotes: {
title: 'Additional Notes',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
salary: {
title: 'Salary',
type: 'number',
filter:true,
},
screeningprocess: {
title: 'Screening Process',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
phoneinterviewers: {
title: 'Phone Interviewers',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
onsiteinterviewprocess: {
title: 'Onsite Interview Process',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
points: {
title: 'Points',
type: 'number',
filter:true,
},
advertisementtitle1: {
title: 'Advertisement Title1',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
advertisementdetails1: {
title: 'Advertisement Details1',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
advertisementtitle2: {
title: 'Advertisement Title2',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
advertisementdetails2: {
title: 'Advertisement Details2',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
advertisementtitle3: {
title: 'Advertisement Title3',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
advertisementdetails3: {
title: 'Advertisement Details3',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
},
};
}
bouserrolemastersLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bouserrolemastersID)>=0)
{
this.bouserrolemasterssource=new LocalDataSource();
this.bouserrolemasterssource.load(this.bouserrolemasterservice.bouserrolemasters as  any as LocalDataSource);
this.bouserrolemasterssource.setPaging(1, 20, true);
}
}

//external to inline
/*
bouserrolemastersroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.bouserrolemasterservice.bouserrolemasters.length == 0)
{
    this.tblbouserrolemasterssource.grid.createFormShown = true;
}
else
{
    let obj = new bouserrolemaster();
    this.bouserrolemasterservice.bouserrolemasters.push(obj);
    this.bouserrolemasterssource.refresh();
    if ((this.bouserrolemasterservice.bouserrolemasters.length / this.bouserrolemasterssource.getPaging().perPage).toFixed(0) + 1 != this.bouserrolemasterssource.getPaging().page)
    {
        this.bouserrolemasterssource.setPage((this.bouserrolemasterservice.bouserrolemasters.length / this.bouserrolemasterssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblbouserrolemasterssource.grid.edit(this.tblbouserrolemasterssource.grid.getLastRow());
    });
}
break;
case 'delete':
if (confirm('Do you want to want to delete?')) {
let index = this.bouserrolemasterssource.data.indexOf(event.data);
this.onDeletebouserrolemaster(event,event.data.userroleid,((this.bouserrolemasterssource.getPaging().page-1) *this.bouserrolemasterssource.getPaging().perPage)+index);
this.bouserrolemasterssource.refresh();
}
break;
}
}

*/
bouserrolemastersroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditbouserrolemaster(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditbouserrolemaster(event,event.data.userroleid,this.formid);
break;
case 'delete':
if (confirm('Do you want to want to delete?')) {
this.onDeletebouserrolemaster(event,event.data.userroleid,((this.bouserrolemasterssource.getPaging().page-1) *this.bouserrolemasterssource.getPaging().perPage)+event.index);
this.bouserrolemasterssource.refresh();
}
break;
}
}
bouserrolemastersonDelete(obj) {
let userroleid=obj.data.userroleid;
if (confirm('Are you sure to delete this record ?')) {
this.bouserrolemasterservice.deletebouserrolemaster(userroleid).then(res=>
this.bouserrolemastersLoadTable()
);
}
}
bouserrolemastersPaging(val)
{
debugger;
this.bouserrolemasterssource.setPaging(1, val, true);
}

handlebouserrolemastersGridSelected(event:any) {
this.bouserrolemastersselectedindex=this.bouserrolemasterservice.bouserrolemasters.findIndex(i => i.userroleid === event.data.userroleid);
}
IsbouserrolemastersVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bouserrolemastersID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes bouserrolemasters
//start of Grid Codes hrmsinterviewrolescorings
hrmsinterviewrolescoringssettings:any;
hrmsinterviewrolescoringssource: any;

showhrmsinterviewrolescoringsCheckbox()
{
debugger;
if(this.tblhrmsinterviewrolescoringssource.settings['selectMode']== 'multi')this.tblhrmsinterviewrolescoringssource.settings['selectMode']= 'single';
else
this.tblhrmsinterviewrolescoringssource.settings['selectMode']= 'multi';
this.tblhrmsinterviewrolescoringssource.initGrid();
}
deletehrmsinterviewrolescoringsAll()
{
this.tblhrmsinterviewrolescoringssource.settings['selectMode'] = 'single';
}
showhrmsinterviewrolescoringsFilter()
{
  setTimeout(() => {
  this.SethrmsinterviewrolescoringsTableddConfig();
  });
      if(this.tblhrmsinterviewrolescoringssource.settings!=null)this.tblhrmsinterviewrolescoringssource.settings['hideSubHeader'] =!this.tblhrmsinterviewrolescoringssource.settings['hideSubHeader'];
this.tblhrmsinterviewrolescoringssource.initGrid();
}
showhrmsinterviewrolescoringsInActive()
{
}
enablehrmsinterviewrolescoringsInActive()
{
}
async SethrmsinterviewrolescoringsTableddConfig()
{
if(!this.bfilterPopulatehrmsinterviewrolescorings){
}
this.bfilterPopulatehrmsinterviewrolescorings=true;
}
async hrmsinterviewrolescoringsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsinterviewrolescoringsTableConfig()
{
this.hrmsinterviewrolescoringssettings = {
hideSubHeader: true,
mode: 'inline',
selectMode: 'single',
actions: {
width:'300px',
columnTitle: 'Actions',
add: !this.showview,
edit: !this.showview, // true,
delete:!this.showview,
custom: [
// { name: 'viewrecord',type:'html', title: '<i style="width:10px" class="fa fa-eye"></i>'},
// { name: 'editrecord',type:'html', title: '<i style="width:10px" class="nb-edit"></i>' }
]
},
add: {
addButtonContent: '<i class="nb-plus"></i>',
createButtonContent: '<i class="nb-checkmark"></i>',
cancelButtonContent: '<i class="nb-close"></i>',
confirmCreate:true,},
edit: {
editButtonContent: '<i class="nb-edit"></i>',
saveButtonContent: '<i class="nb-checkmark"></i>',
cancelButtonContent: '<i class="nb-close"></i>',
confirmSave:true,},
delete: {
deleteButtonContent: '<i class="nb-trash"></i>',
confirmDelete: true,
},
columns: {
interviewround: {
title: 'Interview Round',
type: '',
filter:true,
},
criteria: {
title: 'Criteria',
type: 'number',
filter:true,
},
weightage: {
title: 'Weightage',
type: 'number',
filter:true,
},
},
};
}
hrmsinterviewrolescoringsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsinterviewrolescoringsID)>=0)
{
this.hrmsinterviewrolescoringssource=new LocalDataSource();
this.hrmsinterviewrolescoringssource.load(this.bouserrolemasterservice.hrmsinterviewrolescorings as  any as LocalDataSource);
this.hrmsinterviewrolescoringssource.setPaging(1, 20, true);
}
}
hrmsinterviewrolescoringsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.bouserrolemasterservice.hrmsinterviewrolescorings.length == 0)
{
    this.tblhrmsinterviewrolescoringssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsinterviewrolescoring();
    this.bouserrolemasterservice.hrmsinterviewrolescorings.push(obj);
    this.hrmsinterviewrolescoringssource.refresh();
    if ((this.bouserrolemasterservice.hrmsinterviewrolescorings.length / this.hrmsinterviewrolescoringssource.getPaging().perPage).toFixed(0) + 1 != this.hrmsinterviewrolescoringssource.getPaging().page)
    {
        this.hrmsinterviewrolescoringssource.setPage((this.bouserrolemasterservice.hrmsinterviewrolescorings.length / this.hrmsinterviewrolescoringssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsinterviewrolescoringssource.grid.edit(this.tblhrmsinterviewrolescoringssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmsinterviewrolescoringssource.data.indexOf(event.data);
this.onDeletehrmsinterviewrolescoring(event,event.data.userrolescoringid,((this.hrmsinterviewrolescoringssource.getPaging().page-1) *this.hrmsinterviewrolescoringssource.getPaging().perPage)+index);
this.hrmsinterviewrolescoringssource.refresh();
break;
}
}
hrmsinterviewrolescoringsPaging(val)
{
debugger;
this.hrmsinterviewrolescoringssource.setPaging(1, val, true);
}

handlehrmsinterviewrolescoringsGridSelected(event:any) {
this.hrmsinterviewrolescoringsselectedindex=this.bouserrolemasterservice.hrmsinterviewrolescorings.findIndex(i => i.userrolescoringid === event.data.userrolescoringid);
}
IshrmsinterviewrolescoringsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsinterviewrolescoringsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsinterviewrolescorings

}



