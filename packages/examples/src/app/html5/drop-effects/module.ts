import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilityModule } from 'app/utility.module';
import { SkyhookDndModule } from '@rednax-skyhook/core';
import { RouterModule } from '@angular/router';
import { SkyhookMultiBackendModule } from '@rednax-skyhook/multi-backend';

import { ContainerComponent } from './container.component';
import { CopyTargetComponent } from './copy-target.component';
import { BoxComponent } from './box.component';

@NgModule({
    declarations: [ContainerComponent, CopyTargetComponent, BoxComponent],
    imports: [
        CommonModule,
        UtilityModule,
        SkyhookDndModule,
        SkyhookMultiBackendModule,
        RouterModule.forChild([{ path: '', component: ContainerComponent }]),
    ],
})
export class DropEffectsModule {}
