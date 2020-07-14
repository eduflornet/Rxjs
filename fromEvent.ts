import { Observable, from, fromEvent } from 'rxjs';
import { pluck, timeInterval, map } from 'rxjs/operators';

let clicks$ = fromEvent(document, 'click');

clicks$.pipe(
  pluck('clientX'),
  timeInterval(),
  map(clickInfo => `${clickInfo.interval / 1000} seconds (${clickInfo.value})`)
)
.subscribe(
  (value) => console.log(value),
  (err) => console.log(`ERROR: ${err}`),
  () => console.log('All done.')
);