import { Observable, from} from 'rxjs';
import {filter, map} from 'rxjs/operators';

let nums$ = from([-2, -1, 0, 1, 2]);

let observer = {
  next: value => console.log('value ' +value),
  error: err => console.log('ERROR: ${err}'),
  complete: () => console.log('All done.')
};

nums$.pipe(
  filter(num => num >0),
  map(positiveNum => positiveNum * 3)
).subscribe(observer);