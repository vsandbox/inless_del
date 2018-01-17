# @inless/cycler

Cycle input from one module to another and wise versa.
It was designed for reactive observables so it could not fit other designs.

Inspired by [Cycle.js](https://cycle.js.org/). The idea is the same.

# Getting Started
```javascript
import { run } from '@inless/cycler';

// Module input is driver output
interface IModuleInput {
    response: Observable<string>;
}

// Driver input is module output
interface IDriverInput {
    request: Observable<string>;
}

run<IModuleInput, IDriverInput>(
    ({ response }) => {
        // do something with response
        return {
            request: makeRequestObservableSomehow(),
        };
    },
    ({ request }) => {
        // do something with request
        return {
            response: makeResponseObservableSomehow(),
        };
    }
);
```
