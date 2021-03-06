import { Observable, from, concat, fromEvent } from "rxjs";
import { allBooks, allReaders } from "./data";

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
  
  source1$.subscribe((value) => console.log(value));
  
  let source2$ = from(allBooks);
  
  source2$.subscribe((book) => console.log(book.title));
  
  concat(source1$, source2$).subscribe((value) => console.log(value));
  
  let button = document.getElementById("readersButton");
  
  fromEvent(button, "click").subscribe((event) => {
    console.log(event);
  
    let readersDiv = document.getElementById("readers");
  
    for (let reader of allReaders) {
      readersDiv.innerHTML += reader.name + "<br>";
    }
  });
  