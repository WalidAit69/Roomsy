export default function UserImage({ src, ...rest }) {
    src = src && src.includes('https://') ? src
        : "https://roomsy-v3-server.vercel.app/" + src;

    return (
        <img {...rest} src={src} alt={''} />
    )
}