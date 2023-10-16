import React, { ReactElement } from 'react'

interface Props {
    children: React.ReactNode,
    className?: string
}

function Container({children, className}: Props): ReactElement {
    return (
        <section className={`
        "flex flex-col w-full min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        +
        ${className}
        `}>
            {children}
        </section>
    )
}

export default Container
