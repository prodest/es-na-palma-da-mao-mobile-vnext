import { NgModule } from "@angular/core";
import { NavHeaderComponent } from "./nav-header.component";
import { IonicModule } from "ionic-angular";

import { NavTitleComponentModule } from '@espm/shared/components';

@NgModule({
    declarations: [NavHeaderComponent],
    imports: [
        IonicModule,
        NavTitleComponentModule
    ],
    exports: [NavHeaderComponent]
})
export class NavHeaderComponentModule {}
