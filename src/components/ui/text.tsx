import { cn } from "@/lib/utils";
import type React from "react";

const TEXT_STYLES: Record<TextType, string> = {
    h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
    h2: 'scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0',
    h3: 'scroll-m-20 text-2xl font-medium',
    h4: 'scroll-m-20 text-xl font-medium tracking-tight',
    h5: 'scroll-m-20 text-lg font-semibold tracking-tight',
    h6: 'scroll-m-20 text-lg tracking-tight',
    p: 'leading-7 [&:not(:first-child)]:mt-6',
};

type TextType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';

type TextProps = {
    type: TextType;
    children: React.ReactNode | string;
    className?: string;
};

const Text: React.FC<TextProps> = ({ type = 'p', children, className }) => {
    const Comp = type;

    return (
        <Comp data-slot={type} className={cn(TEXT_STYLES[type], className)}>
            {children}
        </Comp>
    );
};

export default Text;