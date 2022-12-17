import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { legalmatterresponseComponent } from './legalmatterresponse.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'legalmatterresponses',children: [
{ path: '', component: legalmatterresponseComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: legalmatterresponseComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: legalmatterresponseComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
