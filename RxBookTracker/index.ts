import { Observable, of, from, fromEvent, concat, interval, throwError, Subject } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { mergeMap, filter, tap, catchError, take, takeUntil,
         multicast, refCount, publish, share, publishLast, publishBehavior, publishReplay } from 'rxjs/operators';
import { allBooks, allReaders } from './data';

////#region Multicast part one
/*
let subject$ = new Subject();


subject$.subscribe(
  value => console.log(`Observer 1: ${value}`)
);

subject$.subscribe(
  value => console.log(`Observer 2: ${value}`)
);

subject$.next('Hello');

let source2$ = new Observable(subscriber =>{
  subscriber.next('Greetings!');
});

source2$.subscribe(subject$);
*/
//#endregion


////#region Multicast part two

let source$ = interval(1000).pipe(
  take(4),
  //multicast(new Subject()),
  //publish(),
  //publishLast(),
  //publishBehavior(42),
  publishReplay(),
  refCount()
  //share()
);

setTimeout(() => {
  source$.subscribe(
    value => console.log(`Observer 2: ${value}`)
  );
}, 1000);

setTimeout(() => {
  source$.subscribe(
    value => console.log(`Observer 3: ${value}`)
  );
}, 2000);

setTimeout(() => {
  source$.subscribe(
    value => console.log(`Observer 4: ${value}`),
    () => console.log('Observer 4 complete.')
  );
}, 4500);

//#endregion