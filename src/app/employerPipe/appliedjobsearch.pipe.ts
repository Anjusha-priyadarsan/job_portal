import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appliedjobsearch'
})
export class AppliedjobsearchPipe implements PipeTransform {

  transform(dataArray: any[], searchString: string, searchKey: string): any {
    if (!dataArray || !searchString || !searchKey) {
      return dataArray;
    } else {
      return dataArray.filter(item => {
        // Access the title property within the job object
        return item.appliedjob[searchKey].trim().toLowerCase().includes(searchString.trim().toLowerCase());
      });
    }
  }

}
