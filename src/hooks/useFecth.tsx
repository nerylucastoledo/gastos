import React from 'react'

export function useFecth<T>(url: RequestInfo, config?: RequestInit) {
  const [data, setData] = React.useState<T | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  const configRef = React.useRef(config)
  configRef.current = config

  React.useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller
    
    const fetchData = async () => {
      setLoading(true)
      setData(null)

      try {
        const response = await fetch(url, {
          signal,
          ...config,
        })

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`)
        }
        
        const data = (await response.json()) as T

        if (!signal.aborted) {
          setData(data)
        }
      } catch (error) {
        if (!signal.aborted && error instanceof Error) setError(error.message)
      } finally {
        if (!signal.aborted) {
          setTimeout(() => {
            setLoading(false)
          }, 1000);
        }
      }
    }
    fetchData()

    return () => controller.abort()
  }, [url, config])

  return { data, loading, error }
}
