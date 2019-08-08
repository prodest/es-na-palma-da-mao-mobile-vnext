import { NgModule } from "@angular/core";
import { ModuleIndexComponent } from "./module-index.component";
import { IonicModule } from "ionic-angular";

import { NavHeaderComponentModule, MainFooterBarComponentModule } from '@espm/shared/components';

@NgModule({
    declarations: [ModuleIndexComponent],
    imports: [
        IonicModule,
        NavHeaderComponentModule,
        MainFooterBarComponentModule
    ],
    exports: [ModuleIndexComponent]
})
export class ModuleIndexComponentModule {}
