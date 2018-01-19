import * as React from 'react';
import { UISceneNode, IUISceneNodeProps } from './UISceneNode';
import { UISceneNodeError, IUISceneNodeErrorProps } from './UISceneNodeError';
import { IUIRenderer } from '../../interfaces/IUIRenderer';
import { EUISceneError } from '../../interfaces/EUISceneError';

export interface IUISceneNode {
    // You could use other way if you pass getId method to UIScene props
    id?: string;
    data: any;
    renderer: string;
    className?: string;
}

export interface IUISceneRendererProps {
    data: any;
    className: string;
}

export interface IUISceneProps {
    nodes: IUISceneNode[];
    renderers: { [id: string]: IUIRenderer<IUISceneRendererProps>; };
    getId?: (node: IUISceneNode) => string;
    ErrorRenderer?: IUIRenderer<IUISceneNodeErrorProps>;
    NodeContainerRenderer?: IUIRenderer<IUISceneNodeProps>;
}

export class UIScene extends React.Component<IUISceneProps> {
    public render() {
        const { nodes, renderers, getId, NodeContainerRenderer } = this.props;
        const nodeElements = nodes.map((node, index) => {
            const { id, renderer, data, className } = node;
            const nodeId = (getId ? getId(node) : id) || `index_${index}`;
            const nodeRenderer = renderers[renderer];

            if (!nodeRenderer) {
                const ErrorRenderer = this.props.ErrorRenderer || UISceneNodeError;
                return <ErrorRenderer
                    key={nodeId}
                    code={EUISceneError.RENDERER_NOT_FOUND}
                    message={`Error: renderer for node "${nodeId}" not found`}
                />;
            }

            const NodeRenderer = NodeContainerRenderer || UISceneNode;
            return <NodeRenderer key={nodeId} className={className} data={data} renderer={renderers[renderer]} />;
        });
        return <div>{nodeElements}</div>;
    }
}
