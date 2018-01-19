import * as React from 'react';
import { render } from 'react-dom';
import { UIScene, IUISceneProps } from './common/UIScene/UIScene';

const sceneProps: IUISceneProps = {
    nodes: [
        {
            id: 'test',
            renderer: 'test',
            className: 'helloWorld',
            data: {
                name: 'John',
            },
        },
        {
            id: 'test2',
            renderer: 'test2',
            className: 'helloWorld',
            data: {
                name: 'John',
            },
        },
    ],
    renderers: {
        test: ({ className, data }) => <div className={className}>Hi, {data.name}</div>,
    },
    NodeContainerRenderer: () => <div>There is something</div>,
};

render(<UIScene {...sceneProps} />, document.getElementById('app'));
