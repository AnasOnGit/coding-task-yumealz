"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { ReactElement, useEffect, useState } from 'react'
// icons
import { BsFillSunFill, BsFillMoonStarsFill } from "react-icons/bs"
// Theme
import { useTheme } from "next-themes"
import { FiPackage } from 'react-icons/fi';
import { CiDeliveryTruck } from 'react-icons/ci';
import { Button } from './ui/button'

interface Props {

}

function Header({ }: Props): ReactElement {
    const { setTheme, theme, } = useTheme();
    /** 
     * Because of Hydration mismatch error, 
     * we need to use this to prevent it from happening, 
     * as UI on the client is different from the server
    */
    const [mounted, setMounted] = useState(false)
    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true)
    }, [])


    return (
        <header className="flex flex-row p-5 items-center justify-between ">
            <Link href="/">
                <Image className="cursor-pointer"  quality={100} priority={true} placeholder={"blur"}
                    blurDataURL={"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzIiIGhlaWdodD0iNzIiIHZpZXdCb3g9IjAgMCA3MiA3MiIgZmlsbD0iY3VycmVudENvbG9yIiBzdHJva2U9IiMwMDAwMDAiPjxwYXRoIGQ9Ik0zMiAzMmMwLTUuNzUgNC4yNS0xMC4wNSA4LjU1LTEwLjA1IDQuMjUtNS43NSA4LjU1LTEwLjA1IDguNTUtMTAuMDUgMC00LjI1IDUuNzUtNC4yNSA4LjU1LTEwLjA1IDguNTUtMTAuMDUgMC00LjI1LTUuNzUtNC4yNS04LjU1LTEwLjA1LTguNTUtMTAuMDV6bTAgMGMtNS43NSAwLTEwLjA1IDQuMjUtMTAuMDUgOC41NS0xMC4wNSA0LjI1IDUuNzUgMTAuMDUgOC41NSAxMC4wNSA0LjI1IDAgNS43NSA0LjI1IDEwLjA1IDguNTUgMTAuMDV6bTAgMGMtNS43NSAwLTEwLjA1IDQuMjUtMTAuMDUgOC41NS0xMC4wNSA0LjI1IDUuNzUgMTAuMDUgOC41NSAxMC4wNSA0LjI1IDAgNS43NSA0LjI1IDEwLjA1IDguNTUgMTAuMDV6Ii8+PC9zdmc+"}
                    src="/logo.png" alt="logo" width="100" height="100" />
            </Link>
            <nav className="hidden md:flex" >
                <ul className="flex flex-row gap-3">
                    <li><Link href={"/captain"} className="flex flex-row gap-2 justify-center items-center hover:dark:bg-zinc-800 hover:bg-slate-50 p-2 rounded"><CiDeliveryTruck size={18} /> Captains</Link></li>
                    <li ><Link className="flex flex-row gap-2 justify-center items-center hover:dark:bg-zinc-800 hover:bg-slate-50 p-2 rounded" href={"/order"}><FiPackage size={18} />Orders</Link></li>

                </ul>
            </nav>
{
    mounted ? 

            <Button variant="outline" size="icon" onClick={() => {
                setTheme(theme === "light" ? "dark" : "light")
            }}>
                {
                    theme === "dark" ?
                        <BsFillSunFill size={18} />
                        :
                        <BsFillMoonStarsFill size={18} />
                }
            </Button>
            :
            <Button variant="outline" size="icon" onClick={() => {
                // setTheme(theme === "light" ? "dark" : "light")
            }}>
                
            </Button>
            }
        </header>
    )
}

export default Header
