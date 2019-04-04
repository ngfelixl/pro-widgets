import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Injectable()
export class DynamicFormsService {
  createFromList(list: string[]): FormGroup {
    if (!(list instanceof Array)) {
      throw new Error(
        'DynamicFormsService: create form from list requires an array of strings'
      );
    }

    const form = new FormGroup({});

    for (const field of list) {
      form.addControl(field, new FormControl());
    }

    return form;
  }
}
