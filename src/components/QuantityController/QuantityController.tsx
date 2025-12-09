import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import InputNumber, { InputNumberProps } from '../InputNumber'
import { useState } from 'react'

interface Props extends InputNumberProps {
  max?: number
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  onFocusOut?: (value: number) => void
  onType?: (value: number) => void
  classNameWrapper?: string
}

export default function QuantityController({
  max,
  onIncrease,
  onDecrease,
  onType,
  onFocusOut,
  value,
  classNameWrapper = '',
  ...rest
}: Props) {
  const [localValue, setLocalValue] = useState<number | ''>(Number(value || 0))
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueInput = event.target.value
    if (valueInput === '') {
      setLocalValue('')
      return
    }

    let _value = Number(valueInput)
    if (max !== undefined && _value > max) {
      _value = max
    } else if (_value < 1) {
      _value = 1
    }
    onType?.(_value)
    setLocalValue(_value)
  }

  const increase = () => {
    let _value = Number(value || localValue) + 1
    if (max !== undefined && _value > max) {
      _value = max
    }
    onIncrease?.(_value)
    setLocalValue(_value)
  }

  const decrease = () => {
    let _value = Number(value || 0) - 1
    if (_value < 1) {
      _value = 1
    }
    onDecrease?.(_value)
    setLocalValue(_value)
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    const valueInput = event.target.value

    // ✓ Nếu rỗng hoặc <1 → set về 1
    if (valueInput === '' || Number(valueInput) < 1) {
      setLocalValue(1)
      onFocusOut?.(1)
      return
    }
    onFocusOut?.(Number(valueInput))
  }
  return (
    <div className={`flex items-center + ${classNameWrapper}`}>
      <button
        className={`px-3 py-2 border border-gray-300  ${value === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 cursor-pointer'}   }`}
        onClick={decrease}
      >
        <FontAwesomeIcon icon={faMinus} />
      </button>

      <InputNumber
        value={localValue === '' ? '' : value || localValue}
        className=''
        onChange={handleChange}
        onBlur={handleBlur}
        classNameInput=' w-14 border-t border-b border-gray-300 p-2 text-center outline-none'
        classNameError='hidden'
        {...rest}
      />

      <button
        className={`px-3 py-2 border border-gray-300  ${value === max ? 'cursor-not-allowed text-gray-400' : 'text-gray-700 cursor-pointer'}   }`}
        onClick={increase}
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  )
}
