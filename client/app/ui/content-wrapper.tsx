export default function ContentWrapper({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <div className="w-full h-screen bg-black rounded-t-3xl text-white">
            {children}
        </div>
    )
}