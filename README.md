# Damper (debouncer, демпфер)

Execute multiple `function` calls in a `timeout` amount of time just once<br>
<br>
You may also know this technology as a "debouncer" (you are free to use any name)<br>
I prefer "damper", from the word "демпфер"

## Example
```js
const dampered = damper(
    (
        a,              // 0
        b,              // 1
        c,              // 2
        force = false,  // 3
        d,              // 4
        resolve,
        reject
    ) => {},
    500,
    3,                  // 3 -> the "force" argument
);
 
dampered('for a', 'for b', 'for c', true, 'for d'); // Enabled forced execution 
 ```