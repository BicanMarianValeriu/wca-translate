/**
 * WordPress dependencies
 */
const {
    i18n: { __ },
    data: { useSelect },
    blockEditor: {
        useBlockProps,
        InspectorControls,
        store: blockEditorStore
    },
    components: {
        ToggleControl,
        SelectControl,
        PanelBody,
        FormTokenField
    },
} = wp;

function edit({ attributes, setAttributes, clientId }) {
    const { language = 'code', translations = '', display = 'select', label = true, flag = false } = attributes;

    const blockProps = useBlockProps({
        className: 'wp-translate'
    });

    const { suggestions } = useSelect((select) => {
        const selectedBlock = select(blockEditorStore).getSelectedBlock();

        let suggestions = [{
            value: 'en',
            title: 'English'
        }];

        if (selectedBlock && clientId === selectedBlock.clientId) {
            const settings = select('core/editor').getEditorSettings();
            const translations = settings?.wecodeart?.translations ?? [];

            suggestions = Object.entries(translations).map(([key, { english, native }]) => ({
                value: key,
                title: language === 'native' ? native : english
            }));
        }

        return {
            suggestions,
        };
    });

    const romanian = {
        code: 'RO',
        native: 'Română',
        english: 'Romanian'
    };

    // const titleToValue = (title) => title ? suggestions.find(lang => lang.title === title)?.value || '' : '';
    const tokenIsValid = (value) => suggestions.some(lang => lang.value === value);
    const valueToTitle = (value) => {
        const valuesArray = value.split(' ').filter(Boolean);

        const titlesArray = valuesArray.map(code => {
            const suggestion = suggestions.find(lang => lang.value === code);

            return suggestion ? suggestion.title : '';
        });

        return titlesArray.join(', ');
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Settings')}>
                    <FormTokenField
                        label={__('Translations')}
                        placeholder={__('Use language code, eg: ro, en, fr.')}
                        value={translations.split(' ').filter(Boolean)}
                        suggestions={suggestions.map(({ value }) => value)}
                        maxSuggestions={20}
                        displayTransform={valueToTitle}
                        /* saveTransform={titleToValue} */
                        __experimentalValidateInput={tokenIsValid}
                        __experimentalExpandOnFocus={true}
                        onChange={(translations) => setAttributes({ translations: translations.join(' ') })}
                    />
                    <SelectControl
                        label={__('Language')}
                        value={language}
                        onChange={(language) => setAttributes({ language })}
                        options={[
                            { value: 'code', label: __('Language code') },
                            { value: 'native', label: __('Native name') },
                            { value: 'english', label: __('English name') },
                        ]}
                    />
                    <SelectControl
                        label={__('Display')}
                        value={display}
                        onChange={(display) => setAttributes({ display })}
                        disabled={true}
                        options={[
                            { value: 'select', label: __('Select') },
                            { value: 'list', label: __('List'), disabled: true },
                        ]}
                    />
                    <ToggleControl
                        label={__('Label')}
                        checked={label}
                        onChange={(label) => setAttributes({ label })}
                    />
                    <ToggleControl
                        label={__('Flag')}
                        checked={flag}
                        onChange={(flag) => setAttributes({ flag })}
                    />
                </PanelBody>
            </InspectorControls>
            <div {...blockProps}>
                <SelectControl
                    label={label && __('Language')}
                    className="form-select"
                    style={{ pointerEvents: 'none' }}
                    options={[{ value: '', label: romanian[language] }]}
                />
            </div>
        </>
    );
}

export default edit;