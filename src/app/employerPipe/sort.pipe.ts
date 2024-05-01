import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(userArray: any[], sortData: string): any {
    if (!userArray || !sortData) {
      console.error('User array or sort data is missing');
      return userArray;
    } else {
      console.log('Sorting pipe called with userArray:', userArray);
      console.log('Sorting pipe called with sortData:', sortData);
      return userArray.sort((a: any, b: any) =>
        a.appliedJob.applied_date.localeCompare(b.appliedJob.applied_date)
      );
    }
  }


}
