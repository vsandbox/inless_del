import * as React from 'react';

export interface IUICustomListProps {
    renderers: { [key: string]: () => void; };
}

export class UICustomList extends React.PureComponent<IUICustomListProps> {
    public render() {
        return <div>test</div>;
    }
}
