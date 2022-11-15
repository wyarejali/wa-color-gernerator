import { useState, useEffect } from 'react'
import audio from './assets/click.wav'

const ColorBox = ({ color, index }) => {
  const [copied, setCopied] = useState(false)
  const hexCode = `#${color.hex}`

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setCopied(false)
    }, 1000)

    return () => clearTimeout(timeOut)
  }, [copied])
  return (
    <div style={{ backgroundColor: `rgb(${color.rgb})` }} className='colorbox'>
      <button
        onClick={() => {
          setCopied(true)
          navigator.clipboard.writeText(hexCode)
          new Audio(audio).play()
        }}
        className={`copybtn ${index > 10 && 'light'}`}
      >
        {copied ? (
          <span style={{ color: '#01A38B' }}>Copied</span>
        ) : (
          <span>Copy</span>
        )}
      </button>
    </div>
  )
}

export default ColorBox
