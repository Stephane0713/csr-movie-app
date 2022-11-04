import React from "react";

export const SearchTextContext = React.createContext({ search: "", setSearch: (search: string) => {} });

export function SearchTextContextProvider(props: { children: React.ReactNode }) {
  const [search, setSearch] = React.useState<string>("");
  const { children } = props;
  return <SearchTextContext.Provider value={{ search, setSearch }}>{children}</SearchTextContext.Provider>;
}
