import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilityModule } from 'app/utility.module';
import { SkyhookDndModule } from '@rednax-skyhook/core';
import { RouterModule } from '@angular/router';
import { SkyhookMultiBackendModule } from '@rednax-skyhook/multi-backend';

import { ContainerComponent } from './container.component';
import { ItemComponent, DraggableItemComponent } from './item.component';

@NgModule({
    declarations: [ContainerComponent, ItemComponent, DraggableItemComponent],
    imports: [
        CommonModule,
        UtilityModule,
        SkyhookDndModule,
        SkyhookMultiBackendModule,
        RouterModule.forChild([{ path: '', component: ContainerComponent }]),
    ],
})
export class TouchModule {}
