'use client'

import { useEffect, useRef, useState } from 'react'

interface CustomWheelProps {
    type: 'day' | 'month' | 'year'
    data: (string | number)[]
    selected: number
    onDateChange: (type: string, value: number) => void
}

export function CustomWheel({ type, data, selected, onDateChange }: CustomWheelProps) {
    const [position, setPosition] = useState(-(selected - 1) * 50)
    const [isDragging, setIsDragging] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const previousYRef = useRef<number>(0)
    const offsetRef = useRef<number>(0)

    useEffect(() => {
        const selectedPosition = -(selected - 1) * 50
        if (!isDragging && position !== selectedPosition) {
            setPosition(selectedPosition)
        }
    }, [selected, isDragging, position])

    const onStart = (clientY: number) => {
        previousYRef.current = clientY
        setIsDragging(true)
    }

    const onMove = (clientY: number) => {
        if (!isDragging) return

        offsetRef.current = clientY - previousYRef.current

        const maxPosition = -(data.length - 1) * 50
        const newPosition = position + offsetRef.current

        setPosition(Math.max(maxPosition, Math.min(0, newPosition)))
        previousYRef.current = clientY
    }

    const onEnd = () => {
        if (!isDragging) return

        const maxPosition = -(data.length - 1) * 50
        const roundedPosition = Math.round(position / 50) * 50
        const finalPosition = Math.max(maxPosition, Math.min(0, roundedPosition))

        setIsDragging(false)
        setPosition(finalPosition)
        onDateChange(type, -finalPosition / 50 + 1)
    }

    const onMouseDown = (event: React.MouseEvent) => {
        onStart(event.clientY)
        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)
    }

    const onMouseMove = (event: MouseEvent) => {
        onMove(event.clientY)
    }

    const onMouseUp = () => {
        onEnd()
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
    }

    const onTouchStart = (event: React.TouchEvent) => {
        onStart(event.touches[0].clientY)
    }

    const onTouchMove = (event: React.TouchEvent) => {
        onMove(event.touches[0].clientY)
    }

    const onTouchEnd = () => {
        onEnd()
    }

    return (
        <div
            ref={containerRef}
            className="relative h-[150px] w-20 overflow-hidden"
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[50px] bg-gradient-to-b from-white to-transparent z-10" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[50px] bg-gradient-to-t from-white to-transparent z-10" />
            <div className="absolute inset-x-0 top-[50px] h-[50px] border-y border-blue-600" />
            <ul
                className="absolute w-full transition-transform will-change-transform"
                style={{
                    transform: `translateY(${position}px)`,
                    transition: isDragging ? 'none' : `transform 0.3s`,
                }}
            >
                {data.map((item, index) => (
                    <li
                        key={index}
                        className="flex h-[50px] w-full select-none items-center justify-center text-lg"
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    )
}

