import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appShowIfValue]'
})
export class ShowIfValueDirective {
  private templateRef = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);
  appShowIfValue = input<string | null | undefined>();

  constructor() {
    effect(() => {
      const shouldShow = !!this.appShowIfValue()?.trim();

      if (shouldShow && this.viewContainerRef.length === 0) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
      if (!shouldShow && this.viewContainerRef.length > 0) {
        this.viewContainerRef.clear();
      }
    });
  }
}
