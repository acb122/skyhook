import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilityModule } from 'app/utility.module';
import { SkyhookDndModule } from '@rednax-skyhook/core';
import { RouterModule } from '@angular/router';
import { SkyhookMultiBackendModule } from '@rednax-skyhook/multi-backend';

import { ContainerComponent } from './container.component';
import { TargetBox } from './target.component';
import { BlueOrYellowComponent } from './blue-or-yellow.component';

@NgModule({
    declarations: [ContainerComponent, TargetBox, BlueOrYellowComponent],
    imports: [
        CommonModule,
        UtilityModule,
        SkyhookDndModule,
        SkyhookMultiBackendModule,
        RouterModule.forChild([{ path: '', component: ContainerComponent }]),
    ],
})
export class NestedSourcesModule {}
