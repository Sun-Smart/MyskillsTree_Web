import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MstapplicantreferenceacceptedComponent } from './mstapplicantreferenceaccepted.component';
const routes: Routes = [
    {
        path: 'mstapplicantreferencerequestsaccepted', children: [
            { path: '', component: MstapplicantreferenceacceptedComponent},
            { path: 'edit/:id/menu/:menuhide', pathMatch: 'prefix', component: MstapplicantreferenceacceptedComponent},
            { path: 'view/:viewid', pathMatch: 'prefix', component: MstapplicantreferenceacceptedComponent},
            { path: 'view/:viewid/menu/:menuhide', pathMatch: 'prefix', component: MstapplicantreferenceacceptedComponent},
            { path: 'edit/:id', component: MstapplicantreferenceacceptedComponent},
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: MstapplicantreferenceacceptedComponent}
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
