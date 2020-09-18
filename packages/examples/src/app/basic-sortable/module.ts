import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SkyhookDndModule } from '@rednax-skyhook/core';

import { BasicSortableComponent } from './basic-sortable.component';
import { ContainerComponent } from './container.component';
import { CardComponent, CardInnerDirective } from './card.component';

import { UtilityModule } from '../utility.module';
import { SkyhookMultiBackendModule } from '@rednax-skyhook/multi-backend';

@NgModule({
    declarations: [
        ContainerComponent,
        CardComponent,
        CardInnerDirective,
        BasicSortableComponent,
    ],
    imports: [
        CommonModule,
        SkyhookDndModule,
        SkyhookMultiBackendModule,
        RouterModule.forChild([{ path: '', component: ContainerComponent }]),
        UtilityModule,
    ],
})
export class BasicSortableModule {}
