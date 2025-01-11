"use strict";/**
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
export default function e(e,p=300,t){let i;return(...s)=>new Promise(((u,l)=>{clearTimeout(i),"number"==typeof t&&s[t]?("number"==typeof t&&(s=[...s.splice(0,t),...s.splice(t+1)]),s.push(u,l),e.apply(this,s)):("number"==typeof t&&(s=[...s.splice(0,t),...s.splice(t+1)]),s.push(u,l),i=setTimeout((()=>e.apply(this,s)),p))}))}