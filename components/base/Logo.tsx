import { IconInnerShadowTop } from '@tabler/icons-react'
import React, { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

function AppLogo({ iconClassName, ...props }: { iconClassName?: HTMLAttributes<HTMLDivElement>['className'] } & HTMLAttributes<HTMLDivElement>) {
    return (
        <div {...props} className='font-bold flex items-center'>
            <IconInnerShadowTop className={cn('size-5 text-primary', iconClassName)} />
            KKDesireLMS.
        </div>
    )
}

export default AppLogo