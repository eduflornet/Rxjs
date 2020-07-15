import { Observable, from, concat, fromEvent, of } from "rxjs";
import { allBooks, allReaders } from "./data";
import { pluck, timeInterval, map } from 'rxjs/operators';



let allBooksObservable$ = Observable.create((subscriber) => {
  
    if (document.title !== "RxBookTracker") {
      subscriber.error("Incorrect page title.");
    }
  
    for (let book of allBooks) {
      subscriber.next(book);
    }
  
    setTimeout(() => {
      subscriber.complete();
    }, 2000);
  
    return () => console.log("Executing teardown code.");
  });
  
  allBooksObservable$.subscribe((book) => console.log(book.title));
  
  let source1$ = of("hello", 10, true, allReaders[0].name);
  
  source1$.subscribe((value) => console.log('source1$ -> value '+value));
  
  let source2$ = from(allBooks);
  
  source2$.subscribe((book) => console.log('source2$ - book - '+book.title));
  
  concat(source1$, source2$).subscribe((value) => console.log('concat source1$ source2$ - value '+value));

  let clicks$ = fromEvent(document, 'click');

  clicks$.pipe(
    pluck('clientX'),
    timeInterval(),
    map(clickInfo => `${clickInfo.interval / 1000} seconds (${clickInfo.value})`)
  )
  .subscribe(
    (value) => console.log('clicks$ - value'+value),
    (err) => console.log(`ERROR: ${err}`),
    () => console.log('All done.')
  );

  let button = document.getElementById("readersButton");

  fromEvent(button, "click").subscribe((event) => {

    console.log('readersButton - event -> '+event);
  
    let readersDiv = document.getElementById("readers");
  
    for (let reader of allReaders) {

      readersDiv.innerHTML += reader.name + "<br>";

    }
  });

allBooksObservable$.subscribe(book => console.log("book" + book));


const source$ = from([
    { name: 'Joe', age: 30, job: { title: 'Developer', language: 'JavaScript' } },
    //will return undefined when no job is found
    { name: 'Sarah', age: 35 }
  ]);
  //grab title property under job
  const example = source$.pipe(pluck('job', 'title'));
  //output: "Developer" , undefined
  const subscribe = example.subscribe(val => console.log('val -> '+val));


