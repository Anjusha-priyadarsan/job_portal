import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'savedjobsearch'
})
export class SavedjobsearchPipe implements PipeTransform {

  transform(dataArray: any[], searchString: string, searchKey: string): any {
    if (!dataArray || !searchString || !searchKey) {
      return dataArray;
    } else {
      return dataArray.filter(item => {
        // Access the title property within the job object
        return item.savedjob[searchKey].trim().toLowerCase().includes(searchString.trim().toLowerCase());
      });
    }
  }

}
