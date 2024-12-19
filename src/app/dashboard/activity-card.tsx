interface ActivityCardProps {
    title: string
    description: string
    image: string
    className?: string
}

export function ActivityCard({ title, description, image, className }: ActivityCardProps) {
    return (
        <div className={`rounded-2xl p-1 md:p-1  ${className}`}>
            <h3 className="text-lg px-3 md:px-4 pt-2 md:text-lg font-semibold mb-1 ">{title}</h3>
            <p className="text-xs px-3 md:px-4 md:text-base !leading-1 text-gray-900 mb-3 md:mb-4">{description}</p>
            <img
                src={image}
                alt={title}
                className="w-full h-32 md:h-40  rounded-2xl"
            />
        </div>
    )
}

