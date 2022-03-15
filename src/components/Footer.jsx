import React from 'react'

export default function Footer() {
  const date = new Date
  const year = date.getFullYear()

  return (
    <footer>
      <span className='footer__copyright'>Copyright &copy; {year} Tahseen Islam</span> 
    </footer>
  )
}
