import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FeaturesModulesComponent } from './features-modules.component';

const routes: Routes = [
    { 
        path: '', 
        component: FeaturesModulesComponent,
        children: [
            { path: 'stores', loadChildren: () => import('./stores/stores.module').then(m => m.StoresModule) },
            { path: 'items', loadChildren: () => import('./items/items.module').then(m => m.ItemsModule) }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class FeaturesModulesRoutingModule {
    static components = [ FeaturesModulesComponent ];
}

