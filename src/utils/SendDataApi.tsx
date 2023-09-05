export async function sendData(url: string, config: RequestInit) {
  const response = await fetch(url, {
    ...config,
    headers: {
      'Content-Type': 'application/json',
    }
  })

  return response
}