import { NgModule } from "@angular/core";
import { ModulePageComponent } from "./module-page.component";
import { IonicModule } from "ionic-angular";

import { NavHeaderComponentModule, MainFooterBarComponentModule } from '@espm/shared/components';

@NgModule({
    declarations: [ModulePageComponent],
    imports: [
        IonicModule,
        NavHeaderComponentModule,
        MainFooterBarComponentModule
    ],
    exports: [ModulePageComponent]
})
export class ModulePageComponentModule {}
