import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'posto'
})
export class PostoPipe implements PipeTransform {

  transform(value: string): string {
    switch(value) {
      case '2º Sgt': return 'keyboard_capslock';
      case '2º Ten': return 'star_border';
    }
    return 'code';
  }

}
