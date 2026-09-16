import { cn } from '../../utils/cn'

export default function Container({ as: Tag = 'div', narrow = false, className = '', children }) {
  return (
    <Tag
      className={cn(
        'mx-auto w-full px-gutter md:px-gutter-md lg:px-gutter-lg',
        narrow ? 'max-w-container-narrow' : 'max-w-container',
        className
      )}
    >
      {children}
    </Tag>
  )
}
