import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { camsworktimelogComponent } from './camsworktimelog.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'camsworktimelogs',children: [
{ path: '', component: camsworktimelogComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: camsworktimelogComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
