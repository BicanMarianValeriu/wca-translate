const {
    blocks: {
        registerBlockType
    },
    domReady
} = wp;

/**
 * Internal dependencies
 */
import metadata from './../../translate-block.json';
import edit from './edit';

import './../scss/index.scss';

const { name } = metadata;
const settings = {
    example: {},
    save: () => null,
    edit,
};

function initBlock(block) {
    const { metadata, settings, name } = block;

    return registerBlockType({ name, ...metadata }, settings);
}

const init = () => {
    const translateBlock = { name, metadata, settings };
    
    initBlock(translateBlock);
};

domReady(() => init());