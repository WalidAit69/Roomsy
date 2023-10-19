export default function Image({ src, ...rest }) {
    src = src && src.includes('https://') ? src
        : "https://roomsy-v3-server.vercel.app/server/routes/uploads/" + src;

    return (
        <img {...rest} src={src} alt={''} />
    )
}