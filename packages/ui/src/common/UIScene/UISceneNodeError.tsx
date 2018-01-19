import * as React from 'react';
import { EUISceneError } from '../../interfaces/EUISceneError';

export interface IUISceneNodeErrorProps {
    code: EUISceneError;
    message: string;
}

export class UISceneNodeError extends React.PureComponent<IUISceneNodeErrorProps> {
    public render() {
        const { message } = this.props;
        return <div>{message}</div>;
    }
}
