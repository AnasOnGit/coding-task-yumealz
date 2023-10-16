import Link from 'next/link'
import React, { ReactElement } from 'react'
import Image from "next/image"
interface Props {
    
}

function Footer({}: Props): ReactElement {
    return (
        <footer className="px-8 py-4 dark:bg-neutral-900 bg-gray-100 mt-3">
            {/* link to github, home, order and captain there should be app logo on top left */}
            <div className="flex flex-row ">
            <Image alt="Logo" src="/logo.png" width="50" height="50" />
            <div className="flex flex-row  gap-5 text-center flex-1 justify-center items-center">
         
            <Link href="/" className="text-blue-400 hover:text-blue-600 hover:underline">Home</Link>
            <Link href="/order" className="text-blue-400 hover:text-blue-600 hover:underline">Orders</Link>
           
    
            <Link href="/captain" className="text-blue-400 hover:text-blue-600 hover:underline">Captains</Link>
            <Link href="https://github.com/AnasOnGit/coding-task-yumealz" className="text-blue-400 hover:text-blue-600 hover:underline">GitHub</Link>
           
            </div>
            </div>

        </footer>
    )
}

export default Footer
