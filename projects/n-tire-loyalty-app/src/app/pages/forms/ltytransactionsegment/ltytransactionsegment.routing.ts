import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ltytransactionsegmentComponent } from './ltytransactionsegment.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'ltytransactionsegments',children: [
{ path: '', component: ltytransactionsegmentComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: ltytransactionsegmentComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
