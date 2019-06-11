import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, Inject, Input, Renderer2, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';

import { NgxHmSortableData, NgxHmSortableService, sortableKey } from './ngx-hm-sortable.service';
import { elementsFromPoint, insertAfter } from './ts/element';

import * as propagating from 'propagating-hammerjs';

const enum MOVE_TYPE {
  UP,
  DOWN
}

const indexId = 'ngx-hm-sortable-index';
const rootId = 'ngx-hm-root';

@Directive({
  selector: '[ngx-hm-sortable]'
})
export class NgxHmSortableDirective implements AfterViewInit, OnDestroy {
  @Input('ngx-hm-sortable') NgxHmSortable: string;
  @Input() sourceData: any[];
  @Input() selectedNodeClass: string;
  @Input() movingNodeClass: string;
  @Input() overNodeClass: string;

  @Input() elmsSelector: string;
  @Input() moveSelector: string;

  private selectedIndex: number;
  private currentIndex: number;

  // use to check hammer state
  private isStop = false;
  private stopSubscription: Subscription;

  private data: NgxHmSortableData;
  // save stop hammer elm

  private currentValue;

  private hms: HammerManager[];

  public constructor(
    private el: ElementRef,
    private _dnd: NgxHmSortableService,
    private _renderer: Renderer2,
    @Inject(DOCUMENT) private document) {

  }

  ngAfterViewInit(): void {

    this.data = this._dnd.save({
      group: this.NgxHmSortable,
      container: this.el.nativeElement,
      data: this.sourceData,
      directive: this,
    });

    this._renderer.setAttribute(this.data.container, 'id', `dnd${this.data.id}`);

    this.data.elms = this.setSelectorElm(this.el.nativeElement);

    this.hms = Array.from(this.data.elms).map((el: HTMLElement) => this.bindingHammer(el));
  }

  ngOnDestroy(): void {
    this.destroyHm();
  }

  private destroyHm() {
    this.hms.forEach(h => h.destroy());
  }

  public bindingHammer(el: HTMLElement) {
    // console.log('bind hm');
    const hm = propagating(new Hammer(this.getMoveSelector(el))) as HammerManager;
    // let the pan gesture support all directions.
    hm.get('pan').set({ direction: Hammer.DIRECTION_ALL, pointers: 1 });

    hm.on('panstart panmove panend', (e: HammerInput) => {
      e.preventDefault();
      e.srcEvent.stopPropagation();
      switch (e.type) {
        case 'panstart': {

          // // 剛開始設定為自己
          this._dnd.distinationData = this.data;

          const currentElm = this.findItemNode(e.target);

          const nowAttribute = currentElm.attributes[indexId];

          if (!nowAttribute) {
            hm.stop(true);
            return;
          }
          this.currentValue = this.data.data[nowAttribute.value];
          if (!this.currentValue) {
            // tslint:disable-next-line:no-debugger
            debugger;
          }

          this.stopSubscription = this.startListen(currentElm, hm, nowAttribute);

        } break;
        case 'panmove': {
          // if (this._dnd.movingNode) {
          //   this._renderer.setStyle(this._dnd.movingNode, 'transform', `translate(${e.deltaX}px, ${e.deltaY}px`);
          // }
          let key;
          // 找出範圍內的li
          elementsFromPoint(this.document, e.center.x, e.center.y, (elm: HTMLElement) => {
            key = elm.attributes[sortableKey];
            if (key !== undefined) {
              key = +key.value;

              this._dnd.distinationData = this._dnd.dnds[key];
              // if this container is in this container, it is child node of itself
              if (this._dnd.selectedNode.contains(this._dnd.distinationData.container)) {
                return false;
              }
              return true;
            }
            return false;
          }).then((currentElm: HTMLElement) => {
            // it means switch countainer
            const itemElm = this.findItemNode(currentElm);

            const indexAttr = itemElm.attributes[indexId];
            if (indexAttr === undefined) {
              console.log(undefined);
              return;
            }

            // this._dnd.mask(itemElm, key);

            const toIndex = +indexAttr.value;
            if (currentElm.id === 'top' || currentElm.id === 'bottom') {
              this._dnd.mark(currentElm, currentElm.id === 'top' ? -1 : 1, this.overNodeClass);
            }

            this.currentIndex = toIndex;
          });
        } break;
        case 'panend': {
          this.stopListen();
          const itemElm = this.findItemNode(this._dnd.prevSelector);
          if (itemElm) {
            const indexAttr = itemElm.attributes[indexId];

            const containerKey = itemElm.attributes[sortableKey];
            const distinationData = this._dnd.dnds[containerKey.value];

            let toIndex = +indexAttr.value +
              (this._dnd.prevSelector.id === 'bottom' ? 1 : 0);

            if (this._dnd.distinationData.id === this.data.id) {
              if (toIndex > this.selectedIndex) { toIndex--; }
            }

            this.sourceData.splice(this.selectedIndex, 1);
            distinationData.data.splice(toIndex, 0, this.currentValue);

            if (this._dnd.distinationData === this.data) {
              this.reGetContainerElms();
            } else {
              distinationData.directive.reGetContainerElms(toIndex);
            }
          }
          this._dnd.clear(this.selectedNodeClass);
          // console.log('end');
          this.selectedIndex = undefined;
          this.currentIndex = undefined;
        } break;
      }
    });
    return hm;
  }


  private startListen(currentElm: any, hm: HammerManager, indexAttr: any) {
    return this._dnd.checkElm(currentElm, hm).pipe(
      takeWhile(d => {
        if (d !== currentElm) {
          this.stopListen();
          this._dnd.removeSelectStyle(currentElm, this.selectedNodeClass);
          this._dnd.pushStop(hm);
          return false;
        }
        return true;
      }),
      tap(() => {
        this.selectedIndex = this.currentIndex = +indexAttr.value;
        // set choiceNode to this start tag
        this._dnd.selectedNode = this.data.elms[this.selectedIndex];
        // set this elem style
        this._renderer.setStyle(this._dnd.selectedNode, 'pointerEvents', 'none');
        // clone a new tag call sort_clone_obj and hidden it
        // this.createMovingElm(e);
        this._dnd.setSelectStyle(this.selectedNodeClass);
      })
    ).subscribe();
  }

  private stopListen() {
    if (this.stopSubscription) {
      this.stopSubscription.unsubscribe();
    }
  }

  // private createMovingElm(e: HammerInput) {
  //   this._dnd.movingNode = this._dnd.createMovingTag(
  //     e.center,
  //     Math.abs(this._dnd.selectedNode.getBoundingClientRect().top - e.center.y), this.movingNodeClass
  //   );
  //   this._renderer.appendChild(this.data.container, this._dnd.movingNode);
  //   this._renderer.setStyle(this._dnd.movingNode, 'width', `${this._dnd.selectedNode.offsetWidth}px`);
  // }


  // private moveIndex(from, to, elm) {
  //   if (from !== to) {
  //     if (from > to) {
  //       this.insertBefore(elm);
  //     } else {
  //       this.insertAfter(elm);
  //     }
  //   } else {
  //     switch (this.prevAction) {
  //       case MOVE_TYPE.UP:
  //         this.insertAfter(elm);
  //         break;
  //       case MOVE_TYPE.DOWN:
  //         this.insertBefore(elm);
  //         break;
  //     }
  //   }
  // }

  // private insertBefore(getElm: number) {

  //   this._renderer.insertBefore(
  //     this._dnd.distinationData.container,
  //     this._dnd.selectedNode,
  //     getElm
  //   );
  // }

  // private insertAfter(getElm: any) {
  //   this.prevAction = MOVE_TYPE.DOWN;
  //   insertAfter(this._renderer, this._dnd.selectedNode, getElm);
  // }

  private setSelectorElm(container: HTMLElement): HTMLElement[] {
    const elms: any[]
      = Array.from(container.querySelectorAll(`#dnd${this.data.id}>${this.elmsSelector}`));
    elms.forEach((elm: HTMLElement, index: number) => {
      this._renderer.setStyle(elm, 'pointer-events', 'auto');
      this._renderer.setAttribute(elm, indexId, `${index}`);
      this._renderer.setAttribute(elm, sortableKey, `${this.data.id}`);
      this._dnd.mask(elm, `${this.data.id}`);
    });
    return elms;
  }

  private getMoveSelector(elm: HTMLElement): any {
    if (this.moveSelector) {
      return elm.querySelector(`${this.moveSelector}`);
    }
    return elm;
  }

  private findItemNode(elm: HTMLElement): HTMLElement {
    if (!elm) {
      return undefined;
    }
    while (elm.parentElement &&
      elm.parentElement.id !== this.data.container.id &&
      elm.parentElement.id !== this._dnd.distinationData.container.id) {
      elm = elm.parentElement;
    }
    return elm;
  }

  public reGetContainerElms(toIndex?) {
    setTimeout(() => {
      this.data.elms = this.setSelectorElm(this.data.container);
      if (toIndex !== undefined) {
        // console.log(toIndex);
        this.bindingHammer(this.data.elms[toIndex]);
      }
    }, 100);
  }
}
