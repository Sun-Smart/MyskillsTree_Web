import { bodatamaskingService } from './../../../service/bodatamasking.service';
import { bodatamasking } from './../../../model/bodatamasking.model';
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
import { bosecurityquestion } from './../../../model/bosecurityquestion.model';
//FK services
import { bosecurityquestionComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bosecurityquestion/bosecurityquestion.component';
import { bodatamaskingrolerestrict } from './../../../model/bodatamaskingrolerestrict.model';
//FK services
import { bouserrolemasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bouserrolemaster/bouserrolemaster.component';
import { bouserrolemasterService } from './../../../service/bouserrolemaster.service';
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
selector: 'app-bodatamasking',
templateUrl: './bodatamasking.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class bodatamaskingComponent implements OnInit {
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
bfilterPopulatebodatamaskings:boolean=false;
bfilterPopulatebosecurityquestions:boolean=false;
bfilterPopulatebodatamaskingrolerestricts:boolean=false;
@ViewChild('tblbosecurityquestionssource',{static:false}) tblbosecurityquestionssource: Ng2SmartTableComponent;
@ViewChild('tblbodatamaskingrolerestrictssource',{static:false}) tblbodatamaskingrolerestrictssource: Ng2SmartTableComponent;
 bodatamaskingForm: FormGroup;
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
sessiondata:any;



bosecurityquestionsvisiblelist:any;
bosecurityquestionshidelist:any;
bodatamaskingrolerestrictsvisiblelist:any;
bodatamaskingrolerestrictshidelist:any;

DeletedbosecurityquestionIDs: string="";
bosecurityquestionsID: string = "1";
bosecurityquestionsselectedindex:any;
DeletedbodatamaskingrolerestrictIDs: string="";
bodatamaskingrolerestrictsID: string = "2";
bodatamaskingrolerestrictsselectedindex:any;


constructor(
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private bodatamaskingservice: bodatamaskingService,
private bouserrolemasterservice: bouserrolemasterService,
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
this.bodatamaskingForm  = this.fb.group({pk:[null],datamaskid: [null],
tablename: [null],
fieldname: [null],
masklogic: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.bodatamaskingForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.bodatamaskingForm.dirty && this.bodatamaskingForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.datamaskid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.datamaskid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.datamaskid && pkDetail) {
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
let bodatamaskingid = null;

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
this.formid=bodatamaskingid;
//this.sharedService.alert(bodatamaskingid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetbosecurityquestionsTableConfig();
  setTimeout(() => {
  this.SetbosecurityquestionsTableddConfig();
  });

this.SetbodatamaskingrolerestrictsTableConfig();
  setTimeout(() => {
  this.SetbodatamaskingrolerestrictsTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}

//autocomplete
    this.bodatamaskingservice.getbodatamaskingsList().then(res => {
      this.pkList = res as bodatamasking[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.fieldname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.fieldname;

//setting the flag that the screen is not touched 
this.bodatamaskingForm.markAsUntouched();
this.bodatamaskingForm.markAsPristine();
}



resetForm() {
if (this.bodatamaskingForm != null)
this.bodatamaskingForm.reset();
this.bodatamaskingForm.patchValue({
});
setTimeout(() => {
this.bodatamaskingservice.bosecurityquestions=[];
this.bosecurityquestionsLoadTable();
this.bodatamaskingservice.bodatamaskingrolerestricts=[];
this.bodatamaskingservice.Insertbodatamaskingrolerestricts=[];
this.bodatamaskingrolerestrictsLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let datamaskid = this.bodatamaskingForm.get('datamaskid').value;
        if(datamaskid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.bodatamaskingservice.deletebodatamasking(datamaskid).then(res =>
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
    this.bodatamaskingForm.patchValue({
        datamaskid: null
    });
    if(this.bodatamaskingservice.formData.datamaskid!=null)this.bodatamaskingservice.formData.datamaskid=null;
for (let i=0;i<this.bodatamaskingservice.bosecurityquestions.length;i++) {
this.bodatamaskingservice.bosecurityquestions[i].questionid=null;
}
for (let i=0;i<this.bodatamaskingservice.bodatamaskingrolerestricts.length;i++) {
this.bodatamaskingservice.bodatamaskingrolerestricts[i].restrictid=null;
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
this.bodatamaskingForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.bodatamaskingForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.bodatamaskingForm.controls[key]!=undefined)this.bodatamaskingForm.controls[key].disable({onlySelf: true});
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
this.bodatamaskingservice.getbodatamaskingsByEID(pkcol).then(res => {

this.bodatamaskingservice.formData=res;
let formproperty=res.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pkcol;
this.formid=res.bodatamasking.datamaskid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.bodatamasking.datamaskid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.bodatamaskingForm.patchValue({
datamaskid: res.bodatamasking.datamaskid,
tablename: res.bodatamasking.tablename,
fieldname: res.bodatamasking.fieldname,
masklogic: res.bodatamasking.masklogic,
status: res.bodatamasking.status,
statusdesc: res.bodatamasking.statusdesc,
});
this.bosecurityquestionsvisiblelist=res.bosecurityquestionsvisiblelist;
this.bodatamaskingrolerestrictsvisiblelist=res.bodatamaskingrolerestrictsvisiblelist;
//Child Tables if any
this.bodatamaskingservice.bosecurityquestions = res.bosecurityquestions;
this.SetbosecurityquestionsTableConfig();
this.bosecurityquestionsLoadTable();
  setTimeout(() => {
  this.SetbosecurityquestionsTableddConfig();
  });
this.bodatamaskingservice.bodatamaskingrolerestricts = res.bodatamaskingrolerestricts;
this.SetbodatamaskingrolerestrictsTableConfig();
this.bodatamaskingrolerestrictsLoadTable();
  setTimeout(() => {
  this.SetbodatamaskingrolerestrictsTableddConfig();
  });
this.bodatamaskingservice.Insertbodatamaskingrolerestricts=[];
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
  for (let key in this.bodatamaskingForm.controls) {
    if (this.bodatamaskingForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.bodatamaskingForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.bodatamaskingForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.bodatamaskingForm.value;
console.log(obj);
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
Object.keys(this.bodatamaskingForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.bodatamaskingForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.bodatamaskingForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.bodatamaskingservice.formData=this.bodatamaskingForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.bodatamaskingForm.controls[key] != null)
    {
        this.bodatamaskingservice.formData[key] = this.bodatamaskingForm.controls[key].value;
    }
}
}
}
this.bodatamaskingservice.formData.DeletedbosecurityquestionIDs = this.DeletedbosecurityquestionIDs;
this.bodatamaskingservice.formData.DeletedbodatamaskingrolerestrictIDs = this.DeletedbodatamaskingrolerestrictIDs;
console.log(this.bodatamaskingservice.formData);
this.bodatamaskingservice.formData=this.bodatamaskingForm.value;
this.bodatamaskingservice.saveOrUpdatebodatamaskings().subscribe(
async res => {
if (this.bosecurityquestionssource.data)
{
    for (let i = 0; i < this.bosecurityquestionssource.data.length; i++)
    {
        if (this.bosecurityquestionssource.data[i].fileattachmentlist)await this.sharedService.upload(this.bosecurityquestionssource.data[i].fileattachmentlist);
    }
}
if (this.bodatamaskingrolerestrictssource.data)
{
    for (let i = 0; i < this.bodatamaskingrolerestrictssource.data.length; i++)
    {
        if (this.bodatamaskingrolerestrictssource.data[i].fileattachmentlist)await this.sharedService.upload(this.bodatamaskingrolerestrictssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.bodatamasking);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.bodatamaskingservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.bodatamasking);
}
else
{
this.FillData(res);
}
}
this.bodatamaskingForm.markAsUntouched();
this.bodatamaskingForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditbosecurityquestion(event:any,questionid:any, datamaskid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(bosecurityquestionComponent, 
{
data:  {  showview:this.showview,save:false,event,questionid, datamaskid,visiblelist:this.bosecurityquestionsvisiblelist,  hidelist:this.bosecurityquestionshidelist,ScreenType:2  },
header: 'Security Questions'
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.bosecurityquestionssource.add(res);
this.bosecurityquestionssource.refresh();
}
else
{
this.bosecurityquestionssource.update(event.data, res);
}
}
});
}

onDeletebosecurityquestion(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedbosecurityquestionIDs += childID + ",";
this.bodatamaskingservice.bosecurityquestions.splice(i, 1);
//this.updateGrandTotal();
}

PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes bosecurityquestions
bosecurityquestionssettings:any;
bosecurityquestionssource: any;

showbosecurityquestionsCheckbox()
{
debugger;
if(this.tblbosecurityquestionssource.settings['selectMode']== 'multi')this.tblbosecurityquestionssource.settings['selectMode']= 'single';
else
this.tblbosecurityquestionssource.settings['selectMode']= 'multi';
this.tblbosecurityquestionssource.initGrid();
}
deletebosecurityquestionsAll()
{
this.tblbosecurityquestionssource.settings['selectMode'] = 'single';
}
showbosecurityquestionsFilter()
{
  setTimeout(() => {
  this.SetbosecurityquestionsTableddConfig();
  });
      if(this.tblbosecurityquestionssource.settings!=null)this.tblbosecurityquestionssource.settings['hideSubHeader'] =!this.tblbosecurityquestionssource.settings['hideSubHeader'];
this.tblbosecurityquestionssource.initGrid();
}
showbosecurityquestionsInActive()
{
}
enablebosecurityquestionsInActive()
{
}
async SetbosecurityquestionsTableddConfig()
{
if(!this.bfilterPopulatebosecurityquestions){
}
this.bfilterPopulatebosecurityquestions=true;
}
async bosecurityquestionsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetbosecurityquestionsTableConfig()
{
this.bosecurityquestionssettings = {
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
questionname: {
title: 'Question Name',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
tablename: {
title: 'Table Name',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
fieldname: {
title: 'Field Name',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
mode: {
title: 'Mode',
type: '',
filter:true,
},
},
};
}
bosecurityquestionsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bosecurityquestionsID)>=0)
{
this.bosecurityquestionssource=new LocalDataSource();
this.bosecurityquestionssource.load(this.bodatamaskingservice.bosecurityquestions as  any as LocalDataSource);
this.bosecurityquestionssource.setPaging(1, 20, true);
}
}

//external to inline
/*
bosecurityquestionsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.bodatamaskingservice.bosecurityquestions.length == 0)
{
    this.tblbosecurityquestionssource.grid.createFormShown = true;
}
else
{
    let obj = new bosecurityquestion();
    this.bodatamaskingservice.bosecurityquestions.push(obj);
    this.bosecurityquestionssource.refresh();
    if ((this.bodatamaskingservice.bosecurityquestions.length / this.bosecurityquestionssource.getPaging().perPage).toFixed(0) + 1 != this.bosecurityquestionssource.getPaging().page)
    {
        this.bosecurityquestionssource.setPage((this.bodatamaskingservice.bosecurityquestions.length / this.bosecurityquestionssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblbosecurityquestionssource.grid.edit(this.tblbosecurityquestionssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.bosecurityquestionssource.data.indexOf(event.data);
this.onDeletebosecurityquestion(event,event.data.questionid,((this.bosecurityquestionssource.getPaging().page-1) *this.bosecurityquestionssource.getPaging().perPage)+index);
this.bosecurityquestionssource.refresh();
break;
}
}

*/
bosecurityquestionsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditbosecurityquestion(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditbosecurityquestion(event,event.data.questionid,this.formid);
break;
case 'delete':
this.onDeletebosecurityquestion(event,event.data.questionid,((this.bosecurityquestionssource.getPaging().page-1) *this.bosecurityquestionssource.getPaging().perPage)+event.index);
this.bosecurityquestionssource.refresh();
break;
}
}
bosecurityquestionsonDelete(obj) {
let questionid=obj.data.questionid;
if (confirm('Are you sure to delete this record ?')) {
this.bodatamaskingservice.deletebodatamasking(questionid).then(res=>
this.bosecurityquestionsLoadTable()
);
}
}
bosecurityquestionsPaging(val)
{
debugger;
this.bosecurityquestionssource.setPaging(1, val, true);
}

handlebosecurityquestionsGridSelected(event:any) {
this.bosecurityquestionsselectedindex=this.bodatamaskingservice.bosecurityquestions.findIndex(i => i.questionid === event.data.questionid);
}
IsbosecurityquestionsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bosecurityquestionsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes bosecurityquestions
//start of Grid Codes bodatamaskingrolerestricts
onCustombodatamaskingrolerestrictsAction(event:any) {
debugger;
switch ( event.action) {
    case 'viewrecord':
      let val=event.data.pkcol;
      this.dialog.open(bouserrolemasterComponent,
        {
          data: { showview: false, pkcol:val, ScreenType: 2 },
          header: 'bouserrolemaster details'
        }
      ).onClose.subscribe(res => {
      });
      break;
    }
  }
bodatamaskingrolerestrictssettings:any;
bodatamaskingrolerestrictssource: any;

showbodatamaskingrolerestrictsCheckbox()
{
debugger;
if(this.tblbodatamaskingrolerestrictssource.settings['selectMode']== 'multi')this.tblbodatamaskingrolerestrictssource.settings['selectMode']= 'single';
else
this.tblbodatamaskingrolerestrictssource.settings['selectMode']= 'multi';
this.tblbodatamaskingrolerestrictssource.initGrid();
}
deletebodatamaskingrolerestrictsAll()
{
this.tblbodatamaskingrolerestrictssource.settings['selectMode'] = 'single';
}
showbodatamaskingrolerestrictsFilter()
{
  setTimeout(() => {
  this.SetbodatamaskingrolerestrictsTableddConfig();
  });
      if(this.tblbodatamaskingrolerestrictssource.settings!=null)this.tblbodatamaskingrolerestrictssource.settings['hideSubHeader'] =!this.tblbodatamaskingrolerestrictssource.settings['hideSubHeader'];
this.tblbodatamaskingrolerestrictssource.initGrid();
}
showbodatamaskingrolerestrictsInActive()
{
}
enablebodatamaskingrolerestrictsInActive()
{
}
async SetbodatamaskingrolerestrictsTableddConfig()
{
if(!this.bfilterPopulatebodatamaskingrolerestricts){
}
this.bfilterPopulatebodatamaskingrolerestricts=true;
}
async bodatamaskingrolerestrictsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetbodatamaskingrolerestrictsTableConfig()
{
this.bodatamaskingrolerestrictssettings = {
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
restrictid: {
title: 'Restrict',
type: '',
},
userroleid: {
title: 'Userrole',
type: '',
},
userrole: {
title: 'Userrole',
type: '',
},
},
};
}
bodatamaskingrolerestrictsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bodatamaskingrolerestrictsID)>=0)
{
this.bodatamaskingrolerestrictssource=new LocalDataSource();
this.bodatamaskingrolerestrictssource.load(this.bodatamaskingservice.bodatamaskingrolerestricts as  any as LocalDataSource);
setTimeout(() => { 
if(this.tblbodatamaskingrolerestrictssource!=null)
{this.tblbodatamaskingrolerestrictssource.grid.getRows().forEach((row:any) => {
if(row.data.restrictid!=null && row.data.restrictid!="")
{
this.bodatamaskingservice.Insertbodatamaskingrolerestricts.push(row.data);
this.tblbodatamaskingrolerestrictssource.grid.multipleSelectRow(row);
}
});
}
});
}
}

//external to inline
/*
bodatamaskingrolerestrictsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.bodatamaskingservice.bodatamaskingrolerestricts.length == 0)
{
    this.tblbodatamaskingrolerestrictssource.grid.createFormShown = true;
}
else
{
    let obj = new bodatamaskingrolerestrict();
    this.bodatamaskingservice.bodatamaskingrolerestricts.push(obj);
    this.bodatamaskingrolerestrictssource.refresh();
    if ((this.bodatamaskingservice.bodatamaskingrolerestricts.length / this.bodatamaskingrolerestrictssource.getPaging().perPage).toFixed(0) + 1 != this.bodatamaskingrolerestrictssource.getPaging().page)
    {
        this.bodatamaskingrolerestrictssource.setPage((this.bodatamaskingservice.bodatamaskingrolerestricts.length / this.bodatamaskingrolerestrictssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblbodatamaskingrolerestrictssource.grid.edit(this.tblbodatamaskingrolerestrictssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.bodatamaskingrolerestrictssource.data.indexOf(event.data);
this.onDeletebodatamaskingrolerestrict(event,event.data.restrictid,((this.bodatamaskingrolerestrictssource.getPaging().page-1) *this.bodatamaskingrolerestrictssource.getPaging().perPage)+index);
this.bodatamaskingrolerestrictssource.refresh();
break;
}
}

*/
bodatamaskingrolerestrictsPaging(val)
{
debugger;
this.bodatamaskingrolerestrictssource.setPaging(1, val, true);
}

handlebodatamaskingrolerestrictsGridSelected(event:any) {
debugger;

if(event.isSelected)
{
if(event.data.restrictid==null || event.data.restrictid=="")
{
var obj={datamaskid:this.formid,roleid:event.data.roleid}
this.bodatamaskingservice.Insertbodatamaskingrolerestricts.push(obj as any);
}
else
{
var deletedids=this.DeletedbodatamaskingrolerestrictIDs.split(',');

let i:number=0;
deletedids.forEach(id => {
if(id==event.data.restrictid)
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
if(event.data.restrictid!=null && event.data.restrictid!="")this.DeletedbodatamaskingrolerestrictIDs += event.data.restrictid + ","; 
}
}
IsbodatamaskingrolerestrictsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bodatamaskingrolerestrictsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes bodatamaskingrolerestricts

}



