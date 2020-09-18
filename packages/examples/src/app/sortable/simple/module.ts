import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilityModule } from 'app/utility.module';
import { SkyhookDndModule } from '@rednax-skyhook/core';
import { RouterModule } from '@angular/router';
import { SkyhookMultiBackendModule } from '@rednax-skyhook/multi-backend';
import { SkyhookSortableModule } from '@rednax-skyhook/sortable';

import { SimpleComponent } from './simple.component';
import { ContainerComponent } from './container.component';

@NgModule({
    declarations: [ContainerComponent, SimpleComponent],
    imports: [
        CommonModule,
        UtilityModule,
        SkyhookDndModule,
        SkyhookMultiBackendModule,
        SkyhookSortableModule,
        RouterModule.forChild([{ path: '', component: ContainerComponent }]),
    ],
})
export class SimpleModule {}
