export const LeftIcon = ({
    fill = "currentColor",
    filled,
    size,
    height,
    width,
    label,
    ...props
}) => {
    return (
        <svg 
            width={size || width || 40}
            height={size || height || 40}
            viewBox="0 0 16 24" 
            fill={filled ? fill : "white"}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
            >
            <path 
                d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"/>
        </svg>
    );
};
