export interface Widgets {
  [id: string]: Widget;
}

export type WidgetData = number | number[] | { [id: string]: number[] };
export interface Widget {
  name: string;
  component: any;
  module: string;
  valueGenerator: () => WidgetData;
  dataFieldName: string;
  tabs: Tab[];
}

export interface Tab {
  label: string;
  fields: string[];
}
