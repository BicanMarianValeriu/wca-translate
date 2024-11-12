/**
 * WordPress dependencies
 */
const { useBlockProps } = wp.blockEditor;

export default function save() {
    const blockProps = useBlockProps.save({
        className: 'wp-translate'
    });

    return (
        <div {...blockProps}></div>
    );
}