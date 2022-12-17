import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erpmaterialissuingComponent } from './erpmaterialissuing.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erpmaterialissuings',children: [
{ path: '', component: erpmaterialissuingComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erpmaterialissuingComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
