export interface Widgets {
  [id: string]: Widget;
}

export interface Widget {
  name: string;
  component: any;
  module: string;
  valueGenerator: () => number | number[];
  dataFieldName: string;
  tabs: Tab[];
}

export interface Tab {
  label: string;
  fields: string[];
}
