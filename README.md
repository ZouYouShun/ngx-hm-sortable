# ngx-hm-sortable

Angular `ngFor` 拖拉排序功能

## 安裝

1. 安裝 NPM 包

```bash
npm install ngx-hm-sortable
```

## 使用範例

1. 本套件使用 Angular 的 Directive 進行實作，使用前需先在 Module 中 Import

```ts
import { SortableModule } from './sortable/sortable.module';

@NgModule({
  declarations: [ ...something... ],
  imports: [ ...something... , SortableModule],
  providers: [ ...something... ],
  bootstrap: [ ...something... ]
})
export class YourModule {
  ...something...
}
```

2. 準備用以`ngFor`以及排序功能的列舉項目

```typescript
import { Component } from '@angular/core';

@Component({
  ... something ...
})
export class YourComponent {
  /**
   * 用以排序的列舉項目
   */
  items = [1, 2, 3, 4];
}
```

3. 在樣板中需使用到拖拉排序功能的`Element`使用`SortableDirective`的
   Selector`hm-sortable`使用 Directive

```html
<!--
  hm-sortable:   必要項，屬性必須綁定ngFor項目變數，即要排序的項目
  elms-selector: 必要項，使用Selector語法表示哪些Element為排序的項目Element
  move-selector: 必要項，使用Selector語法表示排序項目的Element"中"哪個Element為拖拉移動的物件
-->
<ul [hm-sortable]="items" elms-selector="li" move-selector="span">
  <!--排序項目的Element必須有"index"屬性，並且設為該Element在排序項目中的索引-->
  <li *ngFor="let item of items;let i = index;" [attr.index]="i">
    <span>
      {{item}}
    </span>
  </li>
</ul>
```

## 屬性列表

| 屬性名稱           | 必要與預設值   | 類型            | 位置 | 說明                                                                                                                                        |
| ------------------ | -------------- | --------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| ngx-hm-sortable        | 是             | Array           | 列表 | 調用 SortableDirective 的 Selector，且必須有輸入值為排序項目陣列                                                                            |
| elms-selector      | 是             | String          | 列表 | 表示排序項目的 HTML Element 的 Selector                                                                                                     |
| move-selector      | 是             | String          | 列表 | 表示排序項目的 HTML Element 中拖曳時的拖拉物件 Selector                                                                                     |
| sort-complete      | 否             | (Array)=>void   | 列表 | 當排序完成 ( 拖拉放開 ) 時，觸發的回呼函數，包含一個 Array 類型的參數表示排序後的陣列結果，`(sort-complete)="callback($event)"`             |
| hm-sortable-id     | 否，預設為亂數 | String          | 列表 | 用以設定排序列表唯一識別號                                                                                                                  |
| hm-sortable-enable | 否，true       | Boolean         | 列表 | 是否啟用排序                                                                                                                                |
| moving-class      | 否      | Object          | 列表 | add class with selected new element.                                                                           |
| selected-class     | 否      | Object          | 列表 | add class with selected origin element.                                                                                                     |
| [attr.index]       | 是             | Number(Integer) | 項目 | 表示該項目在列表的索引值                                                                                                                    |
