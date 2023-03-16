interface IconProps {
    size?: number;
    color?: string;
    fontSize?: number
    className?: string
    width?: string
    height?: string 
}

export const BiArrowUpRightCircle = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" {...props}>
        <path fill={props.color || 'currentColor'} fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.854 10.803a.5.5 0 1 1-.708-.707L9.243 6H6.475a.5.5 0 1 1 0-1h3.975a.5.5 0 0 1 .5.5v3.975a.5.5 0 1 1-1 0V6.707l-4.096 4.096z" />
    </svg>
);

export const CarbonCloudUpload = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" {...props}>
        <path fill={props.color || 'currentColor'} d="m11 18l1.41 1.41L15 16.83V29h2V16.83l2.59 2.58L21 18l-5-5l-5 5z" />
        <path fill={props.color || 'currentColor'} d="M23.5 22H23v-2h.5a4.5 4.5 0 0 0 .36-9H23l-.1-.82a7 7 0 0 0-13.88 0L9 11h-.86a4.5 4.5 0 0 0 .36 9H9v2h-.5A6.5 6.5 0 0 1 7.2 9.14a9 9 0 0 1 17.6 0A6.5 6.5 0 0 1 23.5 22Z" />
    </svg>
);

export const IoAdd = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"  {...props}>
        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M256 112v288m144-144H112" />
    </svg>
);

export const IoMdSearch = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512" {...props}>
        <path d="M337.509 305.372h-17.501l-6.571-5.486c20.791-25.232 33.922-57.054 33.922-93.257C347.358 127.632 283.896 64 205.135 64 127.452 64 64 127.632 64 206.629s63.452 142.628 142.225 142.628c35.011 0 67.831-13.167 92.991-34.008l6.561 5.487v17.551L415.18 448 448 415.086 337.509 305.372zm-131.284 0c-54.702 0-98.463-43.887-98.463-98.743 0-54.858 43.761-98.742 98.463-98.742 54.7 0 98.462 43.884 98.462 98.742 0 54.856-43.762 98.743-98.462 98.743z" fill={props.color || 'currentColor'} />
    </svg>
);
export const IoMdCloseCircle = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512" {...props}>
        <path d="M256 48C140.559 48 48 140.559 48 256c0 115.436 92.559 208 208 208 115.435 0 208-92.564 208-208 0-115.441-92.564-208-208-208zm104.002 282.881l-29.12 29.117L256 285.117l-74.881 74.881-29.121-29.117L226.881 256l-74.883-74.881 29.121-29.116L256 226.881l74.881-74.878 29.12 29.116L285.119 256l74.883 74.881z" fill={props.color || 'currentColor'} />
    </svg>
);
export const MdiHamburgerMenu = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" {...props}>
        <path fill={props.color || 'currentColor'} d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z" />
    </svg>
);
export const MdiDelete = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" {...props}>
        <path fill={props.color || 'currentColor'} d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12Z" />
    </svg>
);

export const MdiDownloadCircle = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  {...props}>
        <path fill={props.color || 'currentColor'} d="M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12S6.5 2 12 2M8 17h8v-2H8v2m8-7h-2.5V6h-3v4H8l4 4l4-4Z" />
    </svg>
);

export const MdiBookmarkOff = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" {...props}>
        <path fill={props.color || 'currentColor'} d="m17 18l-5-2.18L7 18V5h10m0-2H7a2 2 0 0 0-2 2v16l7-3l7 3V5a2 2 0 0 0-2-2Z" />
    </svg>
);

export const MdiBookmark = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" {...props}>
        <path fill={props.color || 'currentColor'} d="M17 3H7a2 2 0 0 0-2 2v16l7-3l7 3V5a2 2 0 0 0-2-2Z" />
    </svg>
);

export const MaterialSymbolsLogout = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" {...props}>
        <path fill={props.color || 'currentColor'} d="M5 21q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h7v2H5v14h7v2Zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5Z" />
    </svg>
);

export const MsSun = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" {...props}>
        <path fill={props.color || 'currentColor'} d="M11 5V1h2v4Zm6.65 2.75l-1.375-1.375l2.8-2.875l1.4 1.425ZM19 13v-2h4v2Zm-8 10v-4h2v4ZM6.35 7.7L3.5 4.925l1.425-1.4L7.75 6.35Zm12.7 12.8l-2.775-2.875l1.35-1.35l2.85 2.75ZM1 13v-2h4v2Zm3.925 7.5l-1.4-1.425l2.8-2.8l.725.675l.725.7ZM12 18q-2.5 0-4.25-1.75T6 12q0-2.5 1.75-4.25T12 6q2.5 0 4.25 1.75T18 12q0 2.5-1.75 4.25T12 18Z" />
    </svg>
);

export const MsMoon = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" {...props}>
        <path fill={props.color || 'currentColor'} d="M12 21q-3.775 0-6.388-2.613Q3 15.775 3 12q0-3.45 2.25-5.988Q7.5 3.475 11 3.05q.625-.075.975.45t-.025 1.1q-.425.65-.638 1.375Q11.1 6.7 11.1 7.5q0 2.25 1.575 3.825Q14.25 12.9 16.5 12.9q.775 0 1.538-.225q.762-.225 1.362-.625q.525-.35 1.075-.038q.55.313.475.988q-.35 3.45-2.937 5.725Q15.425 21 12 21Z" />
    </svg>
);

export const ArrowLeft = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" {...props}>
        <path fill={props.color || 'currentColor'} d="m14 18l-6-6l6-6l1.4 1.4l-4.6 4.6l4.6 4.6Z" />
    </svg>
);
export const ArrowRight = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" {...props}>
        <path fill={props.color || 'currentColor'} d="M9.4 18L8 16.6l4.6-4.6L8 7.4L9.4 6l6 6Z" />
    </svg>
);

export const IonInfiniteOutline = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512" {...props}>
        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M256 256s-48-96-126-96c-54.12 0-98 43-98 96s43.88 96 98 96c37.51 0 71-22.41 94-48m32-48s48 96 126 96c54.12 0 98-43 98-96s-43.88-96-98-96c-37.51 0-71 22.41-94 48" />
    </svg>
);

export const MsStarSearch = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" {...props}>
        <path fill={props.color || 'currentColor'} d="m19.6 21l-6.3-6.3q-.75.6-1.725.95Q10.6 16 9.5 16q-2.725 0-4.612-1.887Q3 12.225 3 9.5q0-2.725 1.888-4.613Q6.775 3 9.5 3t4.613 1.887Q16 6.775 16 9.5q0 1.1-.35 2.075q-.35.975-.95 1.725l6.3 6.3ZM9.5 14q1.875 0 3.188-1.312Q14 11.375 14 9.5q0-1.875-1.312-3.188Q11.375 5 9.5 5Q7.625 5 6.312 6.312Q5 7.625 5 9.5q0 1.875 1.312 3.188Q7.625 14 9.5 14Zm-2-1.5l.75-2.45l-2-1.6H8.7L9.5 6l.8 2.45h2.45l-2 1.6l.75 2.45l-2-1.55Z" />
    </svg>
);