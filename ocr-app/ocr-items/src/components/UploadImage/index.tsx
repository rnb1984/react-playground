import React, { CSSProperties, useState } from 'react';
import { Button, Grid, IconButton } from '@material-ui/core';
import TakePhoto from '../TakePhoto';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

interface IProps {
    onSelectHandle: (event: React.FormEvent<HTMLInputElement | HTMLFormElement>) => any;
}

export default React.memo<IProps>((props: IProps) => {
    const {
        onSelectHandle
    } = props
    const css: CSSProperties = { display: 'none' };

    const [showCam, setShowCam] = useState(1);
    return (
        <>
            <Grid
                container
                direction={"row"}
                spacing={2}>
                <Grid item xs={2}>
                    <IconButton color={isOpen(showCam) ? "secondary" : "primary"} component="span" onClick={() => setShowCam(showCam + 1)} >
                        <PhotoCamera />
                    </IconButton>
                </Grid>
                <Grid item xs={6}>
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
                </Grid>
                <Grid item xs={12}>
                    <TakePhoto
                        showCamera={isOpen(showCam)}
                    />
                </Grid>
            </Grid>

        </>
    )
});

const isOpen = (x: number): boolean => (x % 2 === 0);