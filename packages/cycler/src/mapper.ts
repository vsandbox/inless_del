export function mapper<T, U>(driverInput: T): U {
    return Object
        .keys(driverInput)
        .reduce((mapped, key) => {
            (mapped as any)[key] = (driverInput as any)[key].asObservable();
            return mapped;
        }, {} as { [key: string]: object }) as any;
}
