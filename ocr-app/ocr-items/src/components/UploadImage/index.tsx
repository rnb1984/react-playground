import React from 'react';

interface IProps {
    title: string;
    updated?: boolean;
    onSelectHandle: (event: React.FormEvent<HTMLInputElement | HTMLFormElement>) => any;
}

export default React.memo<IProps>((props: IProps) => {
    const {
        title,
        updated,
        onSelectHandle
    } = props

    return (
        <div>
            <h3>{title} is {updated ? "Update" : "Not Updated"}</h3>
                <h3>File Upload</h3>
                <input type="file" name="image" placeholder="Upload image" onInput={onSelectHandle}/>
        </div>
    )
});
