import { DynamicFormsService } from './dynamic-forms.service';
import { FormGroup, FormControl } from '@angular/forms';

describe('DynamicFormsService', () => {
  let service: DynamicFormsService;

  beforeEach(() => {
    service = new DynamicFormsService();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should build a form from an array or strings', () => {
    const list = ['test0', 'test1', 'test2'];

    const form = service.createFromList(list);

    const testForm = new FormGroup({
      test0: new FormControl(),
      test1: new FormControl(),
      test2: new FormControl()
    });

    expect(form.value).toEqual(testForm.value);
  });

  it('should throw an error if input is not an array', () => {
    expect(() => {
      service.createFromList('hello world' as any);
    }).toThrowError(new RegExp('DynamicFormsService: create form from list requires an array of strings'));
  });
});
