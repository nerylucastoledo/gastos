import { createContext, useContext, useState } from "react";
import { useFecth } from "../hooks/useFecth"
import { DEFAULT_URL, monthsAndYears } from "../utils/utils";
import { IBill } from "../components/InputSelect/Select";

export interface CardList {
  id: number;
  name: string;
  username: string;
  color: string;
}

export interface PeopleList {
  id: number;
  name: string;
  username: string;
}

export interface CategoryList {
  id: number;
  name: string;
  username: string;
}

export interface IDataByFilter {
  salary: number;
  name: string;
  content: IBill[];
  cardList: CardList[];
  peopleList: PeopleList[];
  categoryList: CategoryList[];
}

interface IDataByFilterContext {
  data: IDataByFilter | null;
  loading: boolean;
  error: string | null;
  month: string;
  setMonth: React.Dispatch<React.SetStateAction<string>>;
  year: string;
  setYear: React.Dispatch<React.SetStateAction<string>>;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const DataContext = createContext<IDataByFilterContext | null>(null)

export const useDataByFilter = () => {
  const context = useContext(DataContext)
  if (!context) throw new Error("useDataByFilter deve estar em DataContextProvider")
  return context
}

export const DataByFilterContextProvider = ({ children }: React.PropsWithChildren) => {
  const username = window.localStorage.getItem('username')

  const { currentYear, currentMonth } = monthsAndYears()
  const [month, setMonth] = useState(currentMonth)
  const [year, setYear] = useState(currentYear)

  const { data, loading, error, setUpdate } = useFecth<IDataByFilter>(
    `${DEFAULT_URL}bill?username=${username}&date=${month+year}`
  )

  return <DataContext.Provider value={{ 
    data, 
    loading, 
    error, 
    month, 
    setMonth, 
    year, 
    setYear,
    setUpdate
  }}
  >
    {children}
  </DataContext.Provider>
}