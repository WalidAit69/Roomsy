export default function UserImage({ src, ...rest }) {
    src = src && src.includes('https://') ? src
        : "http://localhost:3001/" + src;

    return (
        <img {...rest} src={src} alt={''} />
    )
}