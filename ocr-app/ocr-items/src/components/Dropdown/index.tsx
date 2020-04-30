import React, { ChangeEvent } from 'react';
import ReactSelect, { components } from "react-select";
import { Props as ReactSelectProps } from "react-select/lib/styles";
import { find } from 'lodash';
import { ActionMeta, ValueType } from "react-select/lib/types";
import { ControlProps } from "react-select/lib/components/Control";
import { DeepPartial } from "redux";

type Props = ReactSelectProps & {
    tooltip?: {
        title: string,
        body: string[],
        placement: any,
        enterDelay: number,
        toolTipId?: string
    },
    onChange?: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
    warningMessage?: any
}

export interface IDropDownValue {
    value: string | number,
    label: string
}

export default React.memo<Props>((props: Props) =>  {

    const ddValue: IDropDownValue = find(props.options, c => c.value === props.value) || { value: '', label: '' }

    return (<ReactSelect
        {...props}
        onChange={handleOnChange(props.onChange)}
        placeholder={props.placeholder}
        menuPortalTarget={document.querySelector('body')}
        styles={{
            container: (provided, state) => {
                return {
                    ...provided,
                    marginTop: 10,
                    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                }
            },
            placeholder: (provided, state) => {
                const labelIsMinified: boolean = ddValue.value || ddValue.value === undefined || state.selectProps.inputValue || state.isFocused
                provided = props.warningMessage ? { ...provided, color: 'orange' } : provided;
                return {
                    ...provided,
                    position: "absolute",
                    top: labelIsMinified ? -12 : "25%",
                    transform: labelIsMinified ? 'scale(0.75)' : undefined,
                    transformOrigin: labelIsMinified ? 'top left' : undefined,
                    transition: "top 0.2s, transform 0.2s",
                    marginLeft: 0,
                    minWidth: 160,
                    color: 'rgba(0,0,0,0.55)'
                }
            },
            control: (provided, state) => {
                const borderColor = props.warningMessage ? 'rgba(255, 165, 0, 0.5)' : 'rgb(0, 0, 0, 0.5)';
                const hoverBorderColor = props.warningMessage ? 'rgba(255, 165, 0, 0.75)' : 'rgb(0, 0, 0, 0.75)';
                return {
                    ...provided,
                    borderTop: 0,
                    borderLeft: 0,
                    borderRight: 0,
                    borderBottomWidth: 1,
                    borderColor,
                    borderRadius: 0,
                    paddingBottom: 1,
                    boxShadow: '0, 0, 0, 0',
                    '&:hover': {
                        borderBottomWidth: 2,
                        paddingBottom: 0,
                        borderColor: hoverBorderColor,
                    }
                }
            },
            valueContainer: (provided, state) => ({
                ...provided,
                overflow: "visible",
                paddingLeft: 0,
                paddingRight: 0,
                paddingTop: 5,
            }),
            indicatorSeparator: (provided, state) => ({
                display: "none"
            }),
            dropdownIndicator: (provided, state) => {
                const hasTooltip: boolean = !!state.selectProps.tooltip
                return {
                    ...provided,
                    paddingLeft: hasTooltip ? 2 : 8,
                    paddingRight: hasTooltip ? 2 : 8,
                    color: 'rgb(0, 0, 0, 0.75)',
                    '&:hover': {
                        color: 'rgb(0, 0, 0, 0.75)',
                    }
                }
            },
            singleValue: (provided, state) => ({
                marginLeft: 0,
                maxWidth: '95%',
                maxHeight: '40px',
                overflow: 'hidden',
            }),
            menuPortal: (provided, state) => ({
                ...provided,
                zIndex: 2000,
            }),
        }}
        components={props.warningMessage ? {
            Control: CustomControl,
            ValueContainer: CustomValueContainer,
            Input: CustomInput,
            SelectContainer: props.warningMessage
        } : {
                Control: CustomControl,
                ValueContainer: CustomValueContainer,
                Input: CustomInput,
            }}
    />)
});


/**
 * Select Component overrides
 */
const { Control, ValueContainer, Placeholder, Input } = components;

function CustomControl(props: ControlProps<any>) {

    const { tooltip } = props.selectProps

    return (
        <Control {...props}>

            {
                React.Children.map(props.children, (child: any) => {
                    return child && React.cloneElement(child, { isFocused: props.isFocused })
                })
            }

        </Control>
    )

}

function CustomValueContainer({ children, ...props }: any): JSX.Element {

    return (
        <ValueContainer {...props}>

            <Placeholder {...props}>
                {props.selectProps.placeholder}
            </Placeholder>
            {
                React.Children.map(children, child => {
                    return child && child.type !== Placeholder ? child : null;
                })
            }

        </ValueContainer>
    )
}

function CustomInput({ children, ...props }: any): JSX.Element {
    const { ariaLabel } = props.selectProps
    ariaLabel && (props['aria-label'] = ariaLabel)
    return <Input {...props} />
}


/**
 * Returns event object as React Select dosen't
 */
function handleOnChange(onChange?: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void) {

    // Catch unpassed function
    if (!onChange) {
        return
    }

    return (selected: ValueType<IDropDownValue>, meta: ActionMeta) => {
        const event: DeepPartial<ChangeEvent<HTMLInputElement | HTMLSelectElement>> = {
            target: {
                name: (meta as any).name,
                value: (selected as any).value,
            }
        }

        onChange(event as ChangeEvent<HTMLInputElement | HTMLSelectElement>)
    }
}

