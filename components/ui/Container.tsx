import React, { ReactElement } from 'react'

interface Props {
    children: React.ReactNode
}

function Container({children}: Props): ReactElement {
    return (
        <section className="
        flex flex-col
        w-full h-full
        max-w-7xl mx-auto
        px-4 sm:px-6 lg:px-8
        
        ">
            {children}
        </section>
    )
}

export default Container
