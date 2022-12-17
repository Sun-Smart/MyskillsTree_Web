import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erpfajournalComponent } from './erpfajournal.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erpfajournals',children: [
{ path: '', component: erpfajournalComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erpfajournalComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
