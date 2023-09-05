export function transformValueInReal(value: number) {
  return value.toLocaleString('pt-BR', { 
    style: 'currency',
    currency: 'BRL'
  })
}

export function monthsAndYears() {
  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ]
  const years = []
  
  const currentYearMoreNine = new Date().getFullYear() + 9
  const currentMonth = (months[new Date().getMonth()]).toString()
  const currentYear = (currentYearMoreNine - 9).toString()

  for (let i = 1; i <= 11; i++) {
    years.push((currentYearMoreNine - i).toString())
  }

  return { currentYear, currentMonth, years, months  }
}

export interface ShowPopup {
  message: string
  background: string;
}