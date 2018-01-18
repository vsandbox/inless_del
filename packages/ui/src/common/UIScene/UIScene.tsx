import * as React from 'react';

export interface IUIRendererProps {
    data: any;
    x?: number;
    y?: number;
    isSelected?: boolean;
    className?: string;
    onSelect?: (id: string) => void;
    [others: string]: any;
}

export declare type IUIRenderer<T> = React.StatelessComponent<T> | (new(...args: any[]) => React.Component<T | any>);

export interface IUISceneItem {
    id: string;
    renderer: string;
    data: any;
    x?: number;
    y?: number;
    isSelected?: boolean;
    className?: string;
}

export interface IUISceneProps {
    // only god knows what is it. I mean, types are up to you
    items: IUISceneItem[];
    // set of any valid react element
    renderers: { [key: string]: IUIRenderer<IUIRendererProps>; };
    // optional handler when item is selected (if renderer supports)
    onSelect?: (id: string) => void;
    // top-level class name
    className?: string;
    // override default container
    // by default all nodes wil be rendered in simple div element
    Container?: IUIRenderer<{ className?: string }>;
}

export class UIScene extends React.PureComponent<IUISceneProps> {
    public render() {
        const { items, renderers, className, onSelect, Container } = this.props;

        const itemElements = items.map(item => {
            const {
                id,
                renderer,
                data,
                x,
                y,
                isSelected,
                className: itemClassName,
            } = item;
            const Renderer = renderers[renderer];

            const props: IUIRendererProps = {
                data,
                onSelect,
                x: x || 0,
                y: y || 0,
                isSelected: !!isSelected,
                className: itemClassName,
            };

            return <Renderer key={id} {...props} />;
        });

        if (Container) return <Container className={className}>{ itemElements }</Container>;
        return <div className={className}>{ itemElements }</div>;
    }
}
