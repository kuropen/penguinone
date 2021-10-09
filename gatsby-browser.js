import React from 'react'
import SimpleReactLightbox from 'simple-react-lightbox'

export const wrapRootElement = ({element}) => {
    return (
        <SimpleReactLightbox>
            {element}
        </SimpleReactLightbox>
    );
};
