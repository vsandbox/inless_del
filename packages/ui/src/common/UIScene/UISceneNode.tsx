import * as React from 'react';
import { IUIRenderer } from '../../interfaces/IUIRenderer';

export interface IUISceneNodeProps {
    renderer: IUIRenderer<any>;
    data: any;
    className?: string;
}

export class UISceneNode extends React.PureComponent<IUISceneNodeProps> {
    public render() {
        const { data, className, renderer: Renderer } = this.props;

        return <Renderer className={className} data={data} />;
    }
}
