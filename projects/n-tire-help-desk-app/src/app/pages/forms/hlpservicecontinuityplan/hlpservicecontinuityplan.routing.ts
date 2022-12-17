import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hlpservicecontinuityplanComponent } from './hlpservicecontinuityplan.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'hlpservicecontinuityplans',children: [
{ path: '', component: hlpservicecontinuityplanComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: hlpservicecontinuityplanComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
