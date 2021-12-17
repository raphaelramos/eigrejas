import { NgModule }       from '@angular/core';
import { ToDateObjPipe  } from './date-pipe.pipe';
@NgModule({
    exports: [
        ToDateObjPipe
    ],
    declarations: [
        ToDateObjPipe
    ]
})
export class DateModule {}