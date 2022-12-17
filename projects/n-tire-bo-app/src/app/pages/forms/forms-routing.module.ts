import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { BOReportViewerComponent } from './boreportviewer/boreportviewer.component';
//import { bokbmasterComponent } from './bokbmaster/bokbmaster.component';
import { FormsComponent } from './forms.component'

const routes: Routes = [{
    path: '',
    component: FormsComponent,
    children: [


    ],
}];

/*
for(let i=1;i<50;i++)
{
  let children= [{ path: ':id', component: BOReportViewerComponent }];
routes[0].children.push({path: 'boreportviewer'+i, children:children});
}
*/

@NgModule({
    imports: [
        RouterModule.forChild(routes),

    ],
    exports: [
        RouterModule,
    ],
})
export class FormsRoutingModule {

}
export const ENTRY_COMPONENTS = [
];


export const routedComponents = [

    FormsComponent,
    //  BOReportViewerComponent,
    //  bokbmasterComponent,
    // bomenumasterComponent,
    // bocountryComponent
];
