import * as React from 'react';
import { render } from 'react-dom';
import { UIScene, IUISceneProps, IUIRendererProps } from './common/UIScene/UIScene';

const nodes = [
    {
        id: 'ben',
        renderer: 'box',
        className: 'test',
        data: {
            name: 'Beniamin',
        },
    },
];

const renderers = {
    test: ({ data, className }: IUIRendererProps) => {
        return <div className={className}>Node: { data.name }</div>;
    },
    box: (options: IUIRendererProps) => {
        console.log(options);
        return <div className={options.className}>In the box is { options.data.name }</div>;
    },
};

const props: IUISceneProps = {
    items: nodes,
    renderers,
};

render(<UIScene {...props} />, document.getElementById('app'));
