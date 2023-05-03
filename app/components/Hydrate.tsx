'use client'

import {ReactNode, useEffect, useState} from "react";
import {useThemeStore} from "@/store";

export default function Hydrate({children}: { children: ReactNode }) {
    const [isHydrated, setIsHydrated] = useState(false)
    const teamStore = useThemeStore()
    //Wait till next js hydration completes

    useEffect(() => {
        setIsHydrated(true)
    }, [])

    return (
        <>
            {isHydrated ? <body className={'px-12 lg:px-48'} data-theme={teamStore.mode}>{children}</body> : <body></body>}
        </>
    )
}