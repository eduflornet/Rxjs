import { fromEvent } from "rxjs";
import { ajax} from "rxjs/ajax";


let button2 = document.getElementById("readersButton");

fromEvent(button2, "click").subscribe((event) => {
  ajax('/api/readers').subscribe(ajaxResponse=>{
      console.log('ajaxResponse ->'+ajaxResponse);
  });
});