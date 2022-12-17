import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { botaskresponseComponent } from './botaskresponse.component';
import { CanDeactivateGuard } from '../../common/unsaved-changes';
const routes: Routes = [
{
                        path: 'botaskresponses',children: [
{ path: '', component: botaskresponseComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: botaskresponseComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
