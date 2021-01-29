import React from 'react';
import { IUIButtonProps } from '../../../interfaces';
import classes from './Button.module.scss'

const Button: React.FC<IUIButtonProps> = (props): JSX.Element => {
    const { onClick, classType = 'primary', disabled = false } = props;

    const cls = [
        classes.Button,
        classes[classType]
    ];

    return(
        <button
            className={cls.join(' ')}
            onClick={onClick}
            disabled={disabled}
        >
            {props.children}
        </button>
    );
};

export default Button;