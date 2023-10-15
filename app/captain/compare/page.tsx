'use client'
import React, { ReactElement } from 'react'
import { useSearchParams } from 'next/navigation'

interface Props {
    
}

function ComparePerformance({}: Props): ReactElement {
    const searchParams = useSearchParams()
    const captainOneId = searchParams.get('captain_one_id')
    const captainTwoId = searchParams.get('captain_two_id')

    
    return (
        <div>
            
        </div>
    )
}

export default ComparePerformance
