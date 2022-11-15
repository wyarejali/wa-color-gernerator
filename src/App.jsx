import { useEffect } from 'react'
import { useState } from 'react'
import Values from 'values.js'
import ColorBox from './ColorBox'
import { isHexColor } from './utils/helpers'

// color
// #FF5A38
// #01A38B

function App() {
  const [code, setCode] = useState('')
  const [error, setError] = useState({ enable: false, message: '' })
  const [list, setList] = useState(new Values('#FF5A38').all(10))

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setError({})
    }, 2000)

    return () => clearTimeout(timeOut)
  }, [error.enable])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (code !== '') {
      // check the code is valid or not
      const isValid = isHexColor(code)
      if (isValid) {
        setError(false)
        try {
          setList(new Values(`#${code}`).all(10))
        } catch (error) {
          setError({ enable: true, message: 'Something went worng!' })
        }
      } else {
        setError({ enable: true, message: 'Envalid Code!' })
      }
    } else {
      setError({ enable: true, message: 'Field is required!' })
    }
  }
  return (
    <>
      <section className='header'>
        <h1>Color Generator</h1>
        <p>{error.enable && error.message}</p>
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => {
              setCode(e.target.value)
            }}
            className={`${error.enable ? 'error' : ''}`}
            type='text'
            spellCheck='false'
            placeholder='ff4948 - without "#"'
          />
          <button type='submit'>Generate</button>
        </form>
      </section>
      <section className='colors'>
        {list.map((color, index) => {
          return <ColorBox key={index} color={color} index={index} />
        })}
      </section>
    </>
  )
}

export default App
