export declare type IUIFunctionalRenderer<T> = (new(...args: any[]) => React.Component<T | any>);
export declare type IUIRenderer<T> = React.StatelessComponent<T> | IUIFunctionalRenderer<T>;
