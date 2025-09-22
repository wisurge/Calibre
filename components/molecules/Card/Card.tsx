import React from 'react'
import { Card as BaseCard } from '@/components/atoms/Card'
import { cn } from '@/lib/utils'

export interface ContentCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  icon?: string
}

const ContentCard = React.forwardRef<HTMLDivElement, ContentCardProps>(
  ({ className, title, description, icon, ...props }, ref) => {
    return (
      <BaseCard
        ref={ref}
        className={cn('p-6', className)}
        {...props}
      >
        {icon && (
          <div className="text-4xl mb-4 text-center">
            {icon}
          </div>
        )}
        <h3 className="text-xl font-semibold mb-2 text-center">
          {title}
        </h3>
        <p className="text-muted-foreground text-center">
          {description}
        </p>
      </BaseCard>
    )
  }
)
ContentCard.displayName = 'ContentCard'

export { ContentCard as Card }
