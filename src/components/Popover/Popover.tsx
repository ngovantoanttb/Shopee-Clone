import React, { ElementType, useId, useRef, useState } from 'react'
import {
  arrow,
  FloatingPortal,
  offset,
  Placement,
  safePolygon,
  shift,
  useFloating,
  useFocus,
  useHover,
  useInteractions
} from '@floating-ui/react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  as?: ElementType
    initalOpen?: boolean
    plascement?: Placement
}
export default function Popover({ children, className, renderPopover, as: Element = 'div', initalOpen, plascement }: Props) {
  const [isOpen, setIsOpen] = useState(initalOpen || false)
  const arrowRef = useRef(null)

  const { x, y, strategy, refs, context, middlewareData } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: plascement || 'bottom-end',
    middleware: [
      offset(8),
      shift(),
      arrow({
        element: arrowRef
      })
    ]
  })

  const id = useId()
  const hover = useHover(context, {
    move: false,
    handleClose: safePolygon()
  })
  const focus = useFocus(context)

  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus])

  return (
    <Element className={className} ref={refs.setReference} {...getReferenceProps()}>
      {children}
      {/* DROPDOWN */}
      <FloatingPortal id={id}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={refs.setFloating}
              {...getFloatingProps()}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                transformOrigin: middlewareData.arrow ? `${middlewareData.arrow.x}px top` : 'center top'
              }}
              initial={{ opacity: 0, transform: 'scale(0)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
              transition={{ duration: 0.2 }}
              className='bg-white shadow-lg z-50 text-black rounded-sm'
            >
              {/* ARROW */}
              <div
                ref={arrowRef}
                className='absolute w-4 h-4 bg-white rotate-45 -top-1'
                style={{
                  left: middlewareData?.arrow?.x,
                  top: middlewareData?.arrow?.y
                }}
              />

              {/* dropdown content trực tiếp trong floating element */}
              {renderPopover}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </Element>
  )
}
