import { hrmsadvertisementmasterService } from './../../../service/hrmsadvertisementmaster.service';
import { hrmsadvertisementmaster } from './../../../model/hrmsadvertisementmaster.model';
import { ElementRef,Component, OnInit,Inject,Optional,ViewChild,EventEmitter  } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu
import { boconfigvalue } from '../../../../../../n-tire-bo-app/src/app/model/boconfigvalue.model';
import { boconfigvalueService } from '../../../../../../n-tire-bo-app/src/app/service/boconfigvalue.service';

//Custom error functions
import { KeyValuePair,MustMatch, DateCompare,MustEnable,MustDisable,Time } from '../../../../../../n-tire-bo-app/src/app/shared/general.validator';

//child table
import {SmartTableDatepickerComponent,SmartTableDatepickerRenderComponent} from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-datepicker.component';
import {SmartTablepopupselectComponent,SmartTablepopupselectRenderComponent} from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-popupselect.component';
import {SmartTableFileRenderComponent} from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-filerender.component';

//Custom control
import { durationComponent } from '../../../../../../n-tire-bo-app/src/app/custom/duration.component';
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
import { hrmsadvertisementdetail } from './../../../model/hrmsadvertisementdetail.model';
import { hrmsadvertisementdetailComponent } from './../../../pages/forms/hrmsadvertisementdetail/hrmsadvertisementdetail.component';
//FK services
import { bouserrolemaster,IbouserrolemasterResponse } from '../../../../../../n-tire-bo-app/src/app/model/bouserrolemaster.model';
import { bouserrolemasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bouserrolemaster/bouserrolemaster.component';
import { bouserrolemasterService } from '../../../../../../n-tire-bo-app/src/app/service/bouserrolemaster.service';
import { hrmsmanpowerrequest,IhrmsmanpowerrequestResponse } from './../../../model/hrmsmanpowerrequest.model';
import { hrmsmanpowerrequestComponent } from './../../../pages/forms/hrmsmanpowerrequest/hrmsmanpowerrequest.component';
import { hrmsmanpowerrequestService } from './../../../service/hrmsmanpowerrequest.service';
import { switchMap,map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator,ValidationErrors } from '@angular/forms';
//primeng services
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import {DialogService} from 'primeng/dynamicDialog';
//session,application constants
import { SharedService } from '../../../../../../n-tire-bo-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
//custom fields & attachments

@Component({
selector: 'app-hrmsadvertisementmaster',
templateUrl: './hrmsadvertisementmaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class hrmsadvertisementmasterComponent implements OnInit {
hidelist:any=[];
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
bfilterPopulatehrmsadvertisementmasters:boolean=false;
datahrmsadvertisementdetailsroleid3:any=[];
datahrmsadvertisementdetailsmprid3:any=[];
datahrmsadvertisementdetailsmediatype3:any=[];
bfilterPopulatehrmsadvertisementdetails:boolean=false;
@ViewChild('tblhrmsadvertisementdetailssource',{static:false}) tblhrmsadvertisementdetailssource: Ng2SmartTableComponent;
 hrmsadvertisementmasterForm: FormGroup;
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
hrmsadvertisementmastershowOption:boolean;
hrmsadvertisementdetailshowOption:boolean;
sessiondata:any;
sourcekey:any;



hrmsadvertisementdetailsvisiblelist:any;
hrmsadvertisementdetailshidelist:any;

DeletedhrmsadvertisementdetailIDs: string="";
hrmsadvertisementdetailsID: string = "1";
hrmsadvertisementdetailsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private hrmsadvertisementmasterservice: hrmsadvertisementmasterService,
private bouserrolemasterservice: bouserrolemasterService,
private hrmsmanpowerrequestservice: hrmsmanpowerrequestService,
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
this.hrmsadvertisementmasterForm  = this.fb.group({
pk:[null],
advertisementid: [null],
advertisementcode: [null],
releasedate: [null],
remarks: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.hrmsadvertisementmasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.hrmsadvertisementmasterForm.dirty && this.hrmsadvertisementmasterForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.advertisementid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.advertisementid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.advertisementid && pkDetail) {
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
this.viewhtml=this.sessionService.getViewHtml();

debugger;
//getting data - from list page, from other screen through dialog
if(this.data!=null && this.data.data!=null)
 {
this.data=this.data.data;
this.maindata = this.data;
}
if(this.maindata!=null && this.maindata.showview!=undefined  && this.maindata.showview!=null)this.showview=this.maindata.showview;
if (this.data != null &&  this.data.event != null && this.data.event.data != null) this.data = this.data.event.data;
 if (this.currentRoute.snapshot.paramMap.get('sourcekey') != null) {
    this.sourcekey= this.currentRoute.snapshot.paramMap.get('sourcekey');
}
let hrmsadvertisementmasterid = null;

//if view button(eye) is clicked
if ( this.currentRoute.snapshot.paramMap.get('viewid') != null) 
{
this.pkcol=this.currentRoute.snapshot.paramMap.get('viewid');
this.showview=true;
//this.viewhtml=this.sessionService.getViewHtml();
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
this.formid=hrmsadvertisementmasterid;
//this.sharedService.alert(hrmsadvertisementmasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SethrmsadvertisementdetailsTableConfig();
  setTimeout(() => {
  this.SethrmsadvertisementdetailsTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}

//autocomplete
    this.hrmsadvertisementmasterservice.gethrmsadvertisementmastersList().then(res => {
      this.pkList = res as hrmsadvertisementmaster[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.advertisementcode.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.advertisementcode;

//setting the flag that the screen is not touched 
this.hrmsadvertisementmasterForm.markAsUntouched();
this.hrmsadvertisementmasterForm.markAsPristine();
}



resetForm() {
if (this.hrmsadvertisementmasterForm != null)
this.hrmsadvertisementmasterForm.reset();
this.hrmsadvertisementmasterForm.patchValue({
});
setTimeout(() => {
this.hrmsadvertisementmasterservice.hrmsadvertisementdetails=[];
this.hrmsadvertisementdetailsLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let advertisementid = this.hrmsadvertisementmasterForm.get('advertisementid').value;
        if(advertisementid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.hrmsadvertisementmasterservice.deletehrmsadvertisementmaster(advertisementid).then(res =>
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
    this.hrmsadvertisementmasterForm.patchValue({
        advertisementid: null
    });
    if(this.hrmsadvertisementmasterservice.formData.advertisementid!=null)this.hrmsadvertisementmasterservice.formData.advertisementid=null;
for (let i=0;i<this.hrmsadvertisementmasterservice.hrmsadvertisementdetails.length;i++) {
this.hrmsadvertisementmasterservice.hrmsadvertisementdetails[i].detailid=null;
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
        else if(key=="releasedate")
this.hrmsadvertisementmasterForm.patchValue({"releasedate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.hrmsadvertisementmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.hrmsadvertisementmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.hrmsadvertisementmasterForm.controls[key]!=undefined)
{
this.hrmsadvertisementmasterForm.controls[key].disable({onlySelf: true});
this.hidelist.push(key);
}
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
if(this.maindata==undefined || this.maindata.save==true  || this.hrmsadvertisementmasterservice.formData.advertisementcode!=null )
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
if(this.pkcol == null || (this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2)))
{
this.onSubmitDataDlg(true);
}
else
{
this.onSubmitData(true);
}
}

edithrmsadvertisementmasters() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.hrmsadvertisementmasterservice.gethrmsadvertisementmastersByEID(pkcol).then(res => {

this.hrmsadvertisementmasterservice.formData=res.hrmsadvertisementmaster;
let formproperty=res.hrmsadvertisementmaster.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.hrmsadvertisementmaster.pkcol;
this.formid=res.hrmsadvertisementmaster.advertisementid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.hrmsadvertisementmaster.advertisementid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.hrmsadvertisementmasterForm.patchValue({
advertisementid: res.hrmsadvertisementmaster.advertisementid,
advertisementcode: res.hrmsadvertisementmaster.advertisementcode,
releasedate: this.ngbDateParserFormatter.parse(res.hrmsadvertisementmaster.releasedate),
remarks: res.hrmsadvertisementmaster.remarks,
status: res.hrmsadvertisementmaster.status,
statusdesc: res.hrmsadvertisementmaster.statusdesc,
});
this.hrmsadvertisementdetailsvisiblelist=res.hrmsadvertisementdetailsvisiblelist;
//Child Tables if any
this.hrmsadvertisementmasterservice.hrmsadvertisementdetails = res.hrmsadvertisementdetails;
this.SethrmsadvertisementdetailsTableConfig();
this.hrmsadvertisementdetailsLoadTable();
  setTimeout(() => {
  this.SethrmsadvertisementdetailsTableddConfig();
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
  for (let key in this.hrmsadvertisementmasterForm.controls) {
    if (this.hrmsadvertisementmasterForm.controls[key] != null) {
if(false)
{
if(this.hrmsadvertisementmasterservice.formData!=null && this.hrmsadvertisementmasterservice.formData[key]!=null  && this.hrmsadvertisementmasterservice.formData[key]!='[]' && this.hrmsadvertisementmasterservice.formData[key]!=undefined && this.hrmsadvertisementmasterservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.hrmsadvertisementmasterservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.hrmsadvertisementmasterservice.formData!=null && this.hrmsadvertisementmasterservice.formData[key]!=null   && this.hrmsadvertisementmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.hrmsadvertisementmasterservice.formData[key]+"></div>");
}
else if(false)
{
if(this.hrmsadvertisementmasterservice.formData!=null && this.hrmsadvertisementmasterservice.formData[key]!=null   && this.hrmsadvertisementmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.hrmsadvertisementmasterservice.formData[key]+"'><div class='progress__number'>"+this.hrmsadvertisementmasterservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hrmsadvertisementmasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.hrmsadvertisementmasterForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.hrmsadvertisementmasterForm.value;
obj.releasedate=new Date(this.hrmsadvertisementmasterForm.get('releasedate').value ? this.ngbDateParserFormatter.format(this.hrmsadvertisementmasterForm.get('releasedate').value)+'  UTC' :null);
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

private hrmsadvertisementmastertoggleOption(){
this.hrmsadvertisementmastershowOption = this.hrmsadvertisementmastershowOption === true ? false : true;
}

private hrmsadvertisementdetailtoggleOption(){
this.hrmsadvertisementdetailshowOption = this.hrmsadvertisementdetailshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.hrmsadvertisementmasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.hrmsadvertisementmasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.hrmsadvertisementmasterForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.hrmsadvertisementmasterservice.formData=this.hrmsadvertisementmasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.hrmsadvertisementmasterForm.controls[key] != null)
    {
        this.hrmsadvertisementmasterservice.formData[key] = this.hrmsadvertisementmasterForm.controls[key].value;
    }
}
}
}
this.hrmsadvertisementmasterservice.formData.releasedate=new Date(this.hrmsadvertisementmasterForm.get('releasedate').value ? this.ngbDateParserFormatter.format(this.hrmsadvertisementmasterForm.get('releasedate').value)+'  UTC' :null);
this.hrmsadvertisementmasterservice.formData.DeletedhrmsadvertisementdetailIDs = this.DeletedhrmsadvertisementdetailIDs;
console.log(this.hrmsadvertisementmasterservice.formData);
this.hrmsadvertisementmasterservice.formData=this.hrmsadvertisementmasterForm.value;
this.hrmsadvertisementmasterservice.saveOrUpdatehrmsadvertisementmasters().subscribe(
async res => {
if (this.hrmsadvertisementdetailssource.data)
{
    for (let i = 0; i < this.hrmsadvertisementdetailssource.data.length; i++)
    {
        if (this.hrmsadvertisementdetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsadvertisementdetailssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsadvertisementmaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.hrmsadvertisementmasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsadvertisementmaster);
}
else
{
this.FillData(res);
}
}
this.hrmsadvertisementmasterForm.markAsUntouched();
this.hrmsadvertisementmasterForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEdithrmsadvertisementdetail(event:any,detailid:any, advertisementid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsadvertisementdetailComponent, 
{
data:  {  showview:false,save:false,event,detailid, advertisementid,visiblelist:this.hrmsadvertisementdetailsvisiblelist,  hidelist:this.hrmsadvertisementdetailshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmsadvertisementdetailssource.add(res);
this.hrmsadvertisementdetailssource.refresh();
}
else
{
this.hrmsadvertisementdetailssource.update(event.data, res);
}
}
});
}

onDeletehrmsadvertisementdetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsadvertisementdetailIDs += childID + ",";
this.hrmsadvertisementmasterservice.hrmsadvertisementdetails.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes hrmsadvertisementdetails
hrmsadvertisementdetailssettings:any;
hrmsadvertisementdetailssource: any;

showhrmsadvertisementdetailsCheckbox()
{
debugger;
if(this.tblhrmsadvertisementdetailssource.settings['selectMode']== 'multi')this.tblhrmsadvertisementdetailssource.settings['selectMode']= 'single';
else
this.tblhrmsadvertisementdetailssource.settings['selectMode']= 'multi';
this.tblhrmsadvertisementdetailssource.initGrid();
}
deletehrmsadvertisementdetailsAll()
{
this.tblhrmsadvertisementdetailssource.settings['selectMode'] = 'single';
}
showhrmsadvertisementdetailsFilter()
{
  setTimeout(() => {
  this.SethrmsadvertisementdetailsTableddConfig();
  });
      if(this.tblhrmsadvertisementdetailssource.settings!=null)this.tblhrmsadvertisementdetailssource.settings['hideSubHeader'] =!this.tblhrmsadvertisementdetailssource.settings['hideSubHeader'];
this.tblhrmsadvertisementdetailssource.initGrid();
}
showhrmsadvertisementdetailsInActive()
{
}
enablehrmsadvertisementdetailsInActive()
{
}
async SethrmsadvertisementdetailsTableddConfig()
{
if(!this.bfilterPopulatehrmsadvertisementdetails){

this.hrmsmanpowerrequestservice.gethrmsmanpowerrequestsList().then(res=>
{
var datamprid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsadvertisementdetailsmprid3.push(defaultobj);
for(let i=0; i<datamprid2.length; i++){
var obj= { value: datamprid2[i].mprid, title:datamprid2[i].mprreference};
this.datahrmsadvertisementdetailsmprid3.push(obj);
}
if((this.tblhrmsadvertisementdetailssource.settings as any).columns['mprid'])
{
(this.tblhrmsadvertisementdetailssource.settings as any).columns['mprid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsadvertisementdetailsmprid3));
this.tblhrmsadvertisementdetailssource.initGrid();
}
});

this.bouserrolemasterservice.getbouserrolemastersList().then(res=>
{
var dataroleid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsadvertisementdetailsroleid3.push(defaultobj);
for(let i=0; i<dataroleid2.length; i++){
var obj= { value: dataroleid2[i].userroleid, title:dataroleid2[i].userrole};
this.datahrmsadvertisementdetailsroleid3.push(obj);
}
if((this.tblhrmsadvertisementdetailssource.settings as any).columns['roleid'])
{
(this.tblhrmsadvertisementdetailssource.settings as any).columns['roleid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsadvertisementdetailsroleid3));
this.tblhrmsadvertisementdetailssource.initGrid();
}
});

this.configservice.getList("mediatype").then(res=>
{
var datamediatype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsadvertisementdetailsmediatype3.push(defaultobj);
for(let i=0; i<datamediatype2.length; i++){
var obj= { value: datamediatype2[i].configkey, title: datamediatype2[i].configtext};
this.datahrmsadvertisementdetailsmediatype3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmsadvertisementdetailssource.settings);
if(clone.columns['mediatype']!=undefined)clone.columns['mediatype'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsadvertisementdetailsmediatype3)), }, };
if(clone.columns['mediatype']!=undefined)clone.columns['mediatype'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsadvertisementdetailsmediatype3)), }, };
this.tblhrmsadvertisementdetailssource.settings =  clone;
this.tblhrmsadvertisementdetailssource.initGrid();
});
}
this.bfilterPopulatehrmsadvertisementdetails=true;
}
async hrmsadvertisementdetailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsadvertisementdetailsTableConfig()
{
this.hrmsadvertisementdetailssettings = {
hideSubHeader: true,
mode: 'external',
selectMode: 'single',
actions: {
columnTitle:'',
width:'300px',
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
mprid: {
title: 'M P R',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'gjoeq',reportcode:'gjoeq',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsadvertisementdetailsmprid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
roleid: {
title: 'Role',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'tnf39',reportcode:'tnf39',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsadvertisementdetailsroleid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
quantity: {
title: 'Quantity',
type: 'number',
filter:true,
},
media: {
title: 'Media',
type: '',
filter:true,
},
mediatype: {
title: 'Media Type',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsadvertisementdetailsmediatype3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
fromdate: {
title: 'From Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
todate: {
title: 'To Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
details: {
title: 'Details',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
attachment: {
title: 'Attachment',
type: '',
filter:true,
valuePrepareFunction: (cell,row) => {
let ret= this.sharedService.getAttachmentValue(cell);
return ret;
},
},
},
};
}
hrmsadvertisementdetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsadvertisementdetailsID)>=0)
{
this.hrmsadvertisementdetailssource=new LocalDataSource();
this.hrmsadvertisementdetailssource.load(this.hrmsadvertisementmasterservice.hrmsadvertisementdetails as  any as LocalDataSource);
this.hrmsadvertisementdetailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsadvertisementdetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsadvertisementmasterservice.hrmsadvertisementdetails.length == 0)
{
    this.tblhrmsadvertisementdetailssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsadvertisementdetail();
    this.hrmsadvertisementmasterservice.hrmsadvertisementdetails.push(obj);
    this.hrmsadvertisementdetailssource.refresh();
    if ((this.hrmsadvertisementmasterservice.hrmsadvertisementdetails.length / this.hrmsadvertisementdetailssource.getPaging().perPage).toFixed(0) + 1 != this.hrmsadvertisementdetailssource.getPaging().page)
    {
        this.hrmsadvertisementdetailssource.setPage((this.hrmsadvertisementmasterservice.hrmsadvertisementdetails.length / this.hrmsadvertisementdetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsadvertisementdetailssource.grid.edit(this.tblhrmsadvertisementdetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmsadvertisementdetailssource.data.indexOf(event.data);
this.onDeletehrmsadvertisementdetail(event,event.data.detailid,((this.hrmsadvertisementdetailssource.getPaging().page-1) *this.hrmsadvertisementdetailssource.getPaging().perPage)+index);
this.hrmsadvertisementdetailssource.refresh();
break;
}
}

*/
hrmsadvertisementdetailsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmsadvertisementdetail(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmsadvertisementdetail(event,event.data.detailid,this.formid);
break;
case 'delete':
this.onDeletehrmsadvertisementdetail(event,event.data.detailid,((this.hrmsadvertisementdetailssource.getPaging().page-1) *this.hrmsadvertisementdetailssource.getPaging().perPage)+event.index);
this.hrmsadvertisementdetailssource.refresh();
break;
}
}
hrmsadvertisementdetailsonDelete(obj) {
let detailid=obj.data.detailid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsadvertisementmasterservice.deletehrmsadvertisementmaster(detailid).then(res=>
this.hrmsadvertisementdetailsLoadTable()
);
}
}
hrmsadvertisementdetailsPaging(val)
{
debugger;
this.hrmsadvertisementdetailssource.setPaging(1, val, true);
}

handlehrmsadvertisementdetailsGridSelected(event:any) {
this.hrmsadvertisementdetailsselectedindex=this.hrmsadvertisementmasterservice.hrmsadvertisementdetails.findIndex(i => i.detailid === event.data.detailid);
}
IshrmsadvertisementdetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsadvertisementdetailsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsadvertisementdetails

}



