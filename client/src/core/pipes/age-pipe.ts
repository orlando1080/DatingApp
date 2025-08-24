import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: string): number {
    const date: Date = new Date(value);
    const today: Date = new Date();
    let age: number = today.getFullYear() - date.getFullYear();

    if (today.getMonth() < date.getMonth() || (today.getMonth() === date.getMonth() && today.getDate() < date.getDate())) {
      age--
    }
    return age;
  }
}
