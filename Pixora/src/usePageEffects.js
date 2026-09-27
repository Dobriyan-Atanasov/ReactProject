import { useEffect } from 'react'
import { useLocation } from 'react-router'

export function usePageEffects() {
  const { pathname } = useLocation()

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal')
    const reveal = () => elements.forEach(element => {
      if (element.getBoundingClientRect().top < window.innerHeight - 150) {
        element.classList.add('active')
      }
    })

    reveal()
    window.addEventListener('scroll', reveal, { passive: true })
    return () => window.removeEventListener('scroll', reveal)
  }, [pathname])
}
