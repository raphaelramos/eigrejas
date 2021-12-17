import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toDateObj'
})

export class ToDateObjPipe implements PipeTransform {

    transform(value: any): any {
      if (value) {
          if (value.toString().indexOf(' ') === -1) {
            value = value + ' 00:00:00';
          }
          const temp = value.toString().replace(' ', 'T');
          return new Date(temp);
      } else {
        return null;
      }
    }

}