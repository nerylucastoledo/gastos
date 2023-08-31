import React from "react";
import { useFecth } from "../hooks/useFecth"

interface ICard {
  name: string;
  username: string;
  color: string;
}

interface ICategory {
  name: string;
  username: string;
}

interface IPeople{
  name: string;
  username: string;
}

export interface IData {
  cardList: ICard[];
  peopleList: IPeople[];
  categoryList: ICategory[];
  salary: number;
  name: string;
}

interface IDataContext {
  data: IData | null;
  loading: boolean;
  error: string | null;
}

const DataContext = React.createContext<IDataContext | null>(null)

export const useData = () => {
  const context = React.useContext(DataContext)
  if (!context) throw new Error("useData deve estar em DataContextProvider")
  return context
}

export const DataContextProvider = ({ children }: React.PropsWithChildren) => {
  const username = window.localStorage.getItem('username')
  const { data, loading, error } = useFecth<IData>(`http://localhost:8080/data?username=${username}`)

  return <DataContext.Provider value={{ data, loading, error }}>{children}</DataContext.Provider>
}