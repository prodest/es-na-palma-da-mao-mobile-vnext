import { NgModule } from "@angular/core";
import { ModuleIndexComponent } from "./module-index.component";
import { IonicModule } from "ionic-angular";

import { ModulePageComponentModule } from '../module-page';

@NgModule({
    declarations: [ModuleIndexComponent],
    imports: [
        IonicModule,
        ModulePageComponentModule
    ],
    exports: [ModuleIndexComponent]
})
export class ModuleIndexComponentModule {}
