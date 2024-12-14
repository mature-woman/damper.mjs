"use strict";

/**
 * @name Damper
 *
 * @description
 * Execute multiple `function` calls in a `timeout` amount of time just once
 * 
 * You may also know this technology as a "debouncer" (you are free to use any name)
 * I prefer "damper", from the word "демпфер"
 *
 * @param {function} function Function to execute after damping
 * @param {number} timeout Timer in milliseconds (ms)
 * @param {number} force Argument number storing the status of enforcement execution (see @example)
 *
 * @return {Promise}
 *
 * @example <caption>Forced execution</caption>
 *  const dampered = damper(
 *      (
 *          a,              // 0
 *          b,              // 1
 *          c,              // 2
 *          force = false,  // 3
 *          d,              // 4
 *          resolve,
 *          reject
 *      ) => {},
 *      500,
 *      3,                  // 3 -> the "force" argument
 *  );
 *
 * dampered('for a', 'for b', 'for c', true, 'for d'); // Enabled forced execution 
 *
 * @license http://www.wtfpl.net/ Do What The Fuck You Want To Public License
 * @author Arsen Mirzaev Tatyano-Muradovich <arsen@mirzaev.sexy>
 */
export default function damper(func, timeout = 300, force) {
    // Declaring the timer for executing the function
    let timer;

    return ((...args) => {
        return new Promise((resolve, reject) => {
            // Deinitializing the timer
            clearTimeout(timer);

            if (typeof force === "number" && args[force]) {
                // Forced execution (ignoring the timer)

                // Deleting the force argument
                if (typeof force === "number") args = [
                    ...args.splice(0, force),
                    ...args.splice(force + 1)
                ];

                // Writing promise handlers into the arguments variable
                args.push(resolve, reject);

                // Executing the function
                func.apply(this, args);
            } else {
                // Normal execution

                // Deleting the force argument
                if (typeof force === "number") args = [
                    ...args.splice(0, force),
                    ...args.splice(force + 1)
                ];

                // Writing promise handlers into the arguments variable
                args.push(resolve, reject);

                // Reinitializing the timer and executing the function when the timer expires
                timer = setTimeout(() => func.apply(this, args), timeout);
            }
        }); 
    });
}