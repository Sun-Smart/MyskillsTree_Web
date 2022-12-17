import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hlpcapacityplanComponent } from './hlpcapacityplan.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'hlpcapacityplans',children: [
{ path: '', component: hlpcapacityplanComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: hlpcapacityplanComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
