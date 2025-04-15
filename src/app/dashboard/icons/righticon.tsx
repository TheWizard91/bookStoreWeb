export const RightIcon = ({
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
            viewBox="0 0 20 24" 
            fill={filled ? fill : "white"}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
            >
                <g>
                    <path d="M0,0h24v24H0V0z" fill="none"/>
                </g>
                <g>
                    <polygon points="6.23,20.23 8,22 18,12 8,2 6.23,3.77 14.46,12"/>
                </g>
        </svg>
    );
};

// export default LeftIcon;