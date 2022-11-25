import { Search } from "@mui/icons-material";
import { TextField, Button, Box } from "@mui/material";
import React from "react";
import { SearchTextContext } from "../../contexts/SearchTextContextProvider";

const SearchBar = () => {
  const inputValue = React.useRef<HTMLInputElement>();
  const { search, setSearch } = React.useContext(SearchTextContext);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setSearch(inputValue.current?.value || "");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", justifyContent: "center", margin: 2 }}
    >
      <TextField
        sx={{ marginRight: 2 }}
        size="small"
        id="search"
        inputRef={inputValue}
        defaultValue={search}
      />
      <Button variant="outlined" type="submit">
        <Search />
      </Button>
    </Box>
  );
};

export default SearchBar;
