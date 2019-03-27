import {
  Component,
  OnInit,
  OnDestroy,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef,
  ComponentRef
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable, Observer } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';

import { widgets } from '../../data/widgets/index';
import { themes } from '../../data/themes/index';

import { DynamicFormsService } from '@docs/app/services/dynamic-forms.service';
import { Widget, Tab } from '@docs/app/models/widget';
import { WidgetHostDirective } from '@docs/app/directive/widget-host.directive';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit, OnDestroy {
  widget: Widget;
  themes: any;
  form: FormGroup;
  id: string;
  @ViewChild(WidgetHostDirective) widgetContainer: WidgetHostDirective;
  private viewContainerRef: ViewContainerRef;
  private componentRef: ComponentRef<any>;
  private routerSubscription: Subscription;
  private subscriptions = new Subscription();
  value$: Observable<number | number[]>;
  private interval: number;

  constructor(
    private route: ActivatedRoute,
    private dynamicForms: DynamicFormsService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private router: Router
  ) {
    this.form = new FormGroup({});
    this.routerSubscription = this.route.params
      .pipe(map(p => p.id))
      .subscribe(id => {
        this.destroySubscriptions();
        this.subscriptions = new Subscription();
        this.form = new FormGroup({});

        this.id = id;
        this.widget = widgets[id];
        if (this.widget) {
          this.themes = themes[id];
          this.form = this.createForm(this.widget.tabs);
          this.form.patchValue(this.themes[0]);
          this.loadComponent();

          const formSubscription = this.form.valueChanges
            .pipe(debounceTime(100))
            .subscribe(() => {
              this.applyStyles();
            });

          this.value$ = this.valueGenerator;
          // this.componentRef.instance.value = this.valueGenerator;

          const valueSubscription = this.value$.subscribe(
            (data: number | number[]) => {
              this.componentRef.instance.value = data;
              if (this.componentRef.instance.ngOnChanges) {
                this.componentRef.instance.ngOnChanges();
              }
              this.componentRef.instance.changeDetectorRef.detectChanges();
            }
          );

          this.subscriptions.add(formSubscription);
          this.subscriptions.add(valueSubscription);
        } else {
          this.router.navigate(['/page-not-found']);
        }
      });
  }

  get valueGenerator(): Observable<number | number[]> {
    return Observable.create((observer: Observer<number | number[]>) => {
      this.interval = window.setInterval(() => {
        observer.next(this.widget.valueGenerator());
      }, 10);
    });
  }

  private createForm(tabs: Tab[]) {
    const flattedFields = tabs.reduce(
      (acc: string[], cur: Tab) => [...acc, ...cur.fields],
      []
    );
    return this.dynamicForms.createFromList(flattedFields);
  }

  /**
   * Resolves the component factory, creates a
   * component reference and stores it in
   * the componentRef member.
   */
  private loadComponent() {
    if (!this.widget) {
      return;
    }

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      this.widget.component
    );
    if (this.viewContainerRef) {
      this.viewContainerRef.clear();
      this.componentRef = this.viewContainerRef.createComponent(
        componentFactory
      );
      this.applyStyles();
      // this.componentRef.instance.value = this.valueGenerator;
    }
  }

  ngOnInit() {
    this.viewContainerRef = this.widgetContainer.viewContainerRef;
    this.loadComponent();
  }

  /**
   * Remove all available subscriptions
   */
  ngOnDestroy() {
    clearInterval(this.interval);
    this.routerSubscription.unsubscribe();
    this.destroySubscriptions();
  }

  destroySubscriptions() {
    this.subscriptions.unsubscribe();
  }

  /**
   * Generates the input binding code which gets displayed in the
   * 'code' section.
   *
   * Example output
   *
   * ```typescript
   * min="0"
   * max="100"
   * color="red"
   * ```
   */
  get codeFromForm() {
    return Object.entries(this.form.getRawValue()).reduce((acc, cur) => {
      return `${acc}
  ${cur[0]}="${cur[1]}"`;
    }, '');
  }

  private applyStyles() {
    for (const entry of Object.entries(this.form.getRawValue())) {
      this.componentRef.instance[entry[0]] = entry[1];
    }

    if (this.componentRef.instance.ngOnChanges) {
      this.componentRef.instance.ngOnChanges();
    }
    this.componentRef.instance.changeDetectorRef.detectChanges();
  }

  usePreset(theme: any) {
    this.form.patchValue(theme);
  }
}
