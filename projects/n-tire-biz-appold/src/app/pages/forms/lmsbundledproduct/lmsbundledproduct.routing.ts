import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { lmsbundledproductComponent } from './lmsbundledproduct.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: 'lmsbundledproducts', children: [
            { path: '', component: lmsbundledproductComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id', component: lmsbundledproductComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'view/:viewid', component: lmsbundledproductComponent, canDeactivate: [CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: lmsbundledproductComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
