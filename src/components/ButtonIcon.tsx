import type { ButtonHTMLAttributes, ComponentType } from 'react';

type IconProps = {
    width: number;
    height: number;
};

type ButtonPropsType = {
    Icon: ComponentType<IconProps>;
    width: number;
    height: number;
    className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;

export default function ButtonIcon({
    Icon,
    width,
    height,
    className = '',
    ...buttonProps
}: ButtonPropsType) {
    return (
        <button
            className={`!p-0 !border-none !bg-transparent ${className}`}
            {...buttonProps}
        >
            <Icon width={width} height={height} />
        </button>
    );
}
