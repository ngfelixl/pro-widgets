import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appWidgetHost]'
})
export class WidgetHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
