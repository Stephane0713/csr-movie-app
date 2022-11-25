import classes from "./home.module.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";
import React from "react";
import { SearchMoviesResult } from "../models/movie.model";
import { fetchMovies } from "../services/fetch.service";
import { SearchTextContext } from "../contexts/SearchTextContextProvider";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";

const HomePage = () => {
  const { search } = React.useContext(SearchTextContext);
  const [searchResult, setSearchResult] = React.useState<SearchMoviesResult>();
  const navigate = useNavigate();

  const results = searchResult?.results ?? [];

  React.useEffect(() => {
    if (search !== "") {
      fetchMovies(search).then(setSearchResult);
    }
  }, [search, setSearchResult]);

  return (
    <>
      <Typography variant="h5" component="h1" align="center" color="initial">
        Welcome to the movie app of your dreams
      </Typography>
      <SearchBar />

      <TableContainer className={classes.root} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" className={classes.tableCell}>
                ID
              </TableCell>
              <TableCell align="center" className={classes.tableCell}>
                Titre
              </TableCell>
              <TableCell align="center" className={classes.tableCell}>
                Évaluation
              </TableCell>
              <TableCell align="center" className={classes.tableCell}>
                Nb de votes
              </TableCell>
              <TableCell align="center" className={classes.tableCell}>
                Popularité
              </TableCell>
              <TableCell align="center" className={classes.tableCell}>
                Date de sortie
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((movie) => (
              <TableRow
                key={movie.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                className={classes.row}
                onClick={() => {
                  navigate(`details/${movie.id}`);
                }}
              >
                <TableCell align="center">{movie.id}</TableCell>
                <TableCell align="center">{movie.title}</TableCell>
                <TableCell align="center">{movie.vote_average}</TableCell>
                <TableCell align="center">{movie.vote_count}</TableCell>
                <TableCell align="center">{movie.popularity}</TableCell>
                <TableCell align="center">{movie.release_date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export { HomePage };
