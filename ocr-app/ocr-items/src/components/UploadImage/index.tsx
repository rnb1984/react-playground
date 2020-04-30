import React, { CSSProperties } from 'react';
import { Button } from '@material-ui/core';

interface IProps {
    onSelectHandle: (event: React.FormEvent<HTMLInputElement | HTMLFormElement>) => any;
}

export default React.memo<IProps>((props: IProps) => {
    const {
        onSelectHandle
    } = props
    const css: CSSProperties = {display: 'none'};
    return (
        <div>
            <input
                accept="image/*"
                id="contained-button-file"
                style={css}
                multiple
                type="file"
                name="image"
                onInput={onSelectHandle}
            />
            <label htmlFor="contained-button-file">
                <Button component="span">
                    Upload</Button>
            </label>
        </div>
    )
});
