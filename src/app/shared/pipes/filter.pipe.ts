import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], filter: any): any {
    if (!filter.name) {
      return items;
    }

    if (!items || !filter) {
      return items;
    }
    return items.filter(item => this.visible(item, filter.name));
  }

  /**
    * 不斷的往下找是否有符合名稱的階層
    * @param { 樹截點 } item
    * @param { 搜尋條件 } searchText
    * @returns { 回傳自己所在的截點以及子截點 是否有包含搜尋名稱}
    */
  private visible(item, searchText) {

    const query = searchText && searchText.length > 0;
    const search = this.searchDep(item, searchText);

    return !(query && !search);

  }

  /**
   * 往下找的遞迴方法
   * @param {} item
   * @param {} searchText
   * @returns {}
   */
  private searchDep(item, searchText) {

    if (item.name.indexOf(searchText) !== -1) {
      return true;
    }

    if (item.children != null) {
      for (let i = 0; i < item.children.length; i++) {
        if (item.children[i].name.indexOf(searchText) !== -1) {
          return true;
        }
        if (this.searchDep(item.children[i], searchText)) {
          return true;
        }
      }
    }
    return false;
  }

}
