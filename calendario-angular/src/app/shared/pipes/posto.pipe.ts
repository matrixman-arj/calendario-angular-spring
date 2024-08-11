import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'posto'
})
export class PostoPipe implements PipeTransform {

  transform(value: string): string {
    switch(value) {
      case 'Gen Ex': return 'assets/images/gen_ex.png';
      case 'Gen Div': return 'assets/images/gen_div.png';
      case 'Gen Bda': return 'assets/images/gen_bda.png';
      case 'Cel': return 'assets/images/cel.png';
      case 'Ten Cel': return 'assets/images/ten_cel.png';
      case 'Maj': return 'assets/images/maj.png';
      case 'Cap': return 'assets/images/cap.png';
      case '1º Ten': return 'assets/images/1_ten.png';
      case '2º Ten': return 'assets/images/2_ten.png';
      case 'Asp': return 'assets/images/asp.png';
      case 'ST': return 'assets/images/st.png';
      case '1º SGT': return 'assets/images/1_sgt.png';
      case '2º SGT': return 'assets/images/2_sgt.png';
      case '3º SGT': return 'assets/images/3_sgt.png';
      case 'Cabo': return 'assets/images/cabo.png';
      case 'Soldado': return 'assets/images/soldado.png';
      case 'Funcionário Civíl': return 'assets/images/func_civ.png';
    }
    return 'code';
  }

}
