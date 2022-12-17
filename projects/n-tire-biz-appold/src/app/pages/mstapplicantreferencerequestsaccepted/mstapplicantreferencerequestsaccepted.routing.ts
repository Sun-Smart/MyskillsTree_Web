import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { CanDeactivateGuard } from '../../common/unsaved-changes';
import { mstapplicantreferencerequestsacceptedComponent } from './mstapplicantreferencerequestsaccepted.component';
const routes: Routes = [
    {
        path: 'mstapplicantreferencerequestsaccepted', children: [
            { path: '', component: mstapplicantreferencerequestsacceptedComponent },
            { path: 'edit/:id/menu/:menuhide', pathMatch: 'prefix', component: mstapplicantreferencerequestsacceptedComponent },
            { path: 'view/:viewid', pathMatch: 'prefix', component: mstapplicantreferencerequestsacceptedComponent },
            { path: 'view/:viewid/menu/:menuhide', pathMatch: 'prefix', component: mstapplicantreferencerequestsacceptedComponent },
            { path: 'edit/:id', component: mstapplicantreferencerequestsacceptedComponent},
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: mstapplicantreferencerequestsacceptedComponent }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
