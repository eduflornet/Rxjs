import { Observable, fromEvent } from "rxjs";

let timesDiv = document.getElementById("times");
let button = document.getElementById("timerButton");

let timer$ = new Observable((subscriber) => {
  let i = 0;
  let intervalID = setInterval(() => {
    subscriber.next(i++);
  }, 1000);

  return () => {
    console.log("Executing teardown code.");
    clearInterval(intervalID);
  };
});

let timerSubscription = timer$.subscribe(
  (value) =>
    (timesDiv.innerHTML += `${new Date().toLocaleTimeString()} (${value}) <br>`),
  null,
  () => console.log("All done!")
);

let timerConsoleSubscription = timer$.subscribe((value) =>
  console.log(`${new Date().toLocaleTimeString()} (${value})`)
);

timerSubscription.add(timerConsoleSubscription);

fromEvent(button, "click").subscribe((event) =>
  timerSubscription.unsubscribe()
);
