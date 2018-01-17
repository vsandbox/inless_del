import { cycle as defaulCycle } from './cycle';
import { mapper as defaultMapper } from './mapper';

export function run<T, U>(
    module: (input: T) => U,
    driver: (input: U) => T,
    mock: () => U,
    cycle: (input: T, output: U, outputMock: U) => void = defaulCycle,
    mapper: (input: U) => U = defaultMapper
) {
    const outputMock = mock();
    const input = driver(mapper(outputMock));
    const output = module(input);

    cycle(input, output, outputMock);

    return { input, output };
}
