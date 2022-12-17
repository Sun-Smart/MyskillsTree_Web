
import { Component, forwardRef, HostListener, ViewChild, Input, EventEmitter } from '@angular/core';
import { FormBuilder, ControlValueAccessor, FormGroup, FormControl, NG_VALUE_ACCESSOR, Validators } from "@angular/forms";

import { switchMap, map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { bousermaster } from './../model/bousermaster.model';
import { bousermasterService } from './../service/bousermaster.service';
import { bouserrolemaster } from './../model/bouserrolemaster.model';
import { bouserrolemasterService } from './../service/bouserrolemaster.service';
import { AnyPtrRecord } from 'dns';


@Component({
    selector: 'app-useraccess',
    template: `
    <form [formGroup]="useraccessForm">
    <div class="input-group">
  <div class="col-6 input-group">
  <app-popupselect   [options]="assignuserList"  [optionsEvent]="assignuseroptionsEvent" [form]="useraccessForm" (selectItem)="onSelectedassignuser($event)"  [reportid]= 14 [menuid]=14 formControlName="assignuser" id="userid" desc="username" ></app-popupselect>
    
    <button (click)="addUser()"> + </button>
    <select id="assignrole" (change)="assignroleonChange($event.target)" formControlName="assignrole"
  class="form-control">
  <option value="0">-Select-</option>
  <option *ngFor="let item of assignroleList" value="{{item.userroleid}}">{{item.userrole}}</option>
</select><button  type="button"  (click)="addRole()"> + </button>
    </div>

<div class="row">
<div class="col">
<ng-container *ngFor="let access of useraccesslistdesc">
	{{access.accesstype}} {{access.ID}}<button type="button" icon="fa fa-close"  (click)="remove(event, access)">X</button>,
</ng-container>
<ng-container *ngFor="let access of roleaccesslistdesc">
	{{access.accesstype}} {{access.ID}}<button type="button" icon="fa fa-close"  (click)="remove(event, access)">X</button>,
</ng-container>
</div>
</div>
</div>
</form>
  `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => useraccessComponent),
        multi: true
    }]
})
export class useraccessComponent implements ControlValueAccessor {

    onChange: Function;

    onTouched: Function;

    useraccessForm: FormGroup;

    assignuserList: bousermaster[];
    assignuser_bousermastersForm: FormGroup;
    assignuser_bousermastersoptions: any;
    assignuser_bousermastersformatter: any;
    assignroleList: bouserrolemaster[];

    useraccesslist: any[] = [];
    roleaccesslist: any[] = [];
    accesslist: any[] = [];
    useraccesslistdesc: any[] = [];
    roleaccesslistdesc: any[] = [];
    assignuseroptionsEvent: EventEmitter<any> = new EventEmitter<any>();
    private _value: any;


    constructor(
        private fb: FormBuilder,
        private bousermasterservice: bousermasterService,
        private bouserrolemasterservice: bouserrolemasterService
    ) {
        this.useraccessForm = this.fb.group({
            assignuser: [null],
            assignuserdesc: [null],
            assignrole: [null],
            assignroledesc: [null]
        });
        this.PopulateData();
    }
    async PopulateData() {
        await this.Populate();
    }
    Populate() {
        this.bousermasterservice.getbousermastersList().then((res:any) => {
           // debugger;
            this.assignuserList = res as bousermaster[];
            this.assignuseroptionsEvent.emit(this.assignuserList);
            this.SetUserData();
        }
        );

        this.assignuser_bousermastersoptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.assignuserList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.assignuser_bousermastersformatter = (result: any) => result.username;
        this.bouserrolemasterservice.getbouserrolemastersList().then((res:any) => {
            this.assignroleList = res as bouserrolemaster[];
            this.SetRoleData();
        }
        );
    }

    async ngOnInit() {
    }
    onSelectedassignuser(assignuserDetail: any) {
        debugger;
        if (assignuserDetail) {
            this.useraccessForm.patchValue({ assignuser: assignuserDetail.userid });
            this.useraccessForm.patchValue({ assignuserdesc: assignuserDetail.username });
            assignuserDetail.preventDefault();

        }
    }

    addUser() {
        debugger;
        if (this.useraccesslist == null) this.useraccesslist = [];
        if (this.useraccesslistdesc == null) this.useraccesslistdesc = [];
        if (this.roleaccesslist == null) this.roleaccesslist = [];
        if (this.roleaccesslistdesc == null) this.roleaccesslistdesc = [];

        //let objaccess={accesstype:"U",userid:this.useraccessForm.get('assignuser').value,username:this.useraccessForm.get('assignuserdesc').value,role:0, rolename:""}
        //this.useraccesslist.push(objaccess);
        this.useraccesslist.push(+ this.useraccessForm.get('assignuser').value);
        let objaccessdesc = { accesstype: "User", key: this.useraccessForm.get('assignuser').value, ID: this.useraccessForm.get('assignuserdesc').value, role: 0 }
        this.useraccesslistdesc.push(objaccessdesc);

        //let value=JSON.stringify(this.useraccesslist);
        //let value={access:this.useraccesslist};
        //let value={user:this.useraccesslist,role:this.roleaccesslist};

        this.accesslist = [];
        this.accesslist.push(this.useraccesslist);
        this.accesslist.push(this.roleaccesslist);
        let value = { "user": this.useraccesslist, "role": this.roleaccesslist };

        this._value = value;
        if (this.onChange) {
            this.onChange(value);
        }
    }
    remove(event, obj) {
        if(obj.accesstype=="User")
        {
            let i=this.useraccesslist.findIndex(x => x.key ===obj.key);
            this.useraccesslist.splice(i, 1);
            this.useraccesslistdesc.splice(i, 1);
        }
        if(obj.accesstype=="Role")
        {
            let i=this.roleaccesslist.findIndex(x => x.key ===obj.key);
            this.roleaccesslist.splice(i, 1);
            this.roleaccesslistdesc.splice(i, 1);
        }        
    }
    addRole() {
        //debugger;
        if (this.useraccesslist == null) this.useraccesslist = [];
        if (this.useraccesslistdesc == null) this.useraccesslistdesc = [];
        if (this.roleaccesslist == null) this.roleaccesslist = [];
        if (this.roleaccesslistdesc == null) this.roleaccesslistdesc = [];


        //let objaccess={accesstype:"R",userid:0,username:"", roleid:this.useraccessForm.get('assignrole').value, rolename:this.useraccessForm.get('assignroledesc').value}
        //this.useraccesslist.push(objaccess);
        this.roleaccesslist.push(+ this.useraccessForm.get('assignrole').value);
        let objaccessdesc = { accesstype: "Role", key: this.useraccessForm.get('assignrole').value , ID: this.useraccessForm.get('assignroledesc').value }
        this.roleaccesslistdesc.push(objaccessdesc);

        //let value=JSON.stringify(this.useraccesslist);
        //let value=JSON.stringify({access:this.useraccesslist});
        //let value={user:this.useraccesslist,role:this.roleaccesslist};

        this.accesslist = [];
        this.accesslist.push(this.useraccesslist);
        this.accesslist.push(this.roleaccesslist);
        let value = { "user": this.useraccesslist, "role": this.roleaccesslist };

        this._value = value;
        if (this.onChange) {
            this.onChange(value);
        }

    }
    assignroleonChange(evt:any) {
        let e = evt.value;
        this.useraccessForm.patchValue({ assignroledesc: evt.options[evt.options.selectedIndex].text });
    }
    get value() {
        debugger;
        return this._value;
    }

    getusers() {

    }
    getroles() {

    }
    set value(value: any) {
       // debugger;
        let value1;
        if(value!=null)
        {
        
        
        try {
            value = JSON.parse(value);
          } catch (e:any) {
          }

          value1=value;
          try {
            value=JSON.parse(value1);
          } catch (e:any) {
            value=value1;
          }
          this._value = value1;
        this.useraccesslist = [];
        if (value != null && value != "") {
            this.useraccesslist = value.user;
            this.roleaccesslist = value.role;
        }
        

        this.SetUserData();
        this.SetRoleData();



        if (this.onChange) {
            this.onChange(value);
        }
    }
    }

    SetUserData() {
        debugger;
        if (this.useraccesslist != null && this.useraccesslist != undefined && this.assignuserList != null && this.assignuserList != undefined) {
            this.useraccesslistdesc = [];
            for (let i = 0; i < this.useraccesslist.length; i++) {
                let obj = this.useraccesslist[i];
                let objuser = this.assignuserList.find(c => c.userid === obj);
                let username = objuser.username;
                let objaccessdesc = { accesstype: "User", ID: username };
                this.useraccesslistdesc.push(objaccessdesc);
            }
        }
    }


    SetRoleData() {
        if (this.roleaccesslist != null && this.roleaccesslist != undefined && this.assignroleList != null && this.assignroleList != undefined) {
            this.roleaccesslistdesc = [];
            for (let i = 0; i < this.roleaccesslist.length; i++) {
                let obj = this.roleaccesslist[i];
                let objrole = this.assignroleList.find(c => c.userroleid === obj);
                let rolename = objrole.userrole;
                let objaccessdesc = { accesstype: "Role", ID: rolename };
                this.roleaccesslistdesc.push(objaccessdesc);
            }
        }
    }


    writeValue(obj: any): void {
        this.value = obj;
    }

    registerOnChange(fn: any): void {
        //debugger;
        this.onChange = fn;
    }


    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
}