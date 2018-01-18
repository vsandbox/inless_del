import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { interval } from 'rxjs/observable/interval';
import { run } from '@inless/cycler';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';

interface IModule {
    test: Observable<string>;
}

interface IDriver {
    name: Observable<string>;
}

const moduleFn = ({ test }: IModule) => {
    return {
        name: test.map(value => `From module ${value}`),
    };
};

const driver = ({ name }: IDriver) => {
    name.subscribe(value => console.log(`module said ${value}`));
    return {
        test: interval(500).map(v => `Hi Module${v}`),
    };
};

const mock = () => ({ name: new Subject<string>() });

run<IModule, IDriver>(moduleFn, driver, mock);
