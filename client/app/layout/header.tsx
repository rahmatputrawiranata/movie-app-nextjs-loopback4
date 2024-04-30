import { HTMLAttributes } from "react";

interface HeaderProps {
    children: React.ReactNode;
    className?: HTMLAttributes<HTMLElement>["className"];
}

export default function Header({children, className}: HeaderProps) {
    return (
        <nav className={`flex px-1 md:px-20 py-1 md:py-3 bg-blue-500 items-center ${className}`}>
            {children}
        </nav>
    )
}