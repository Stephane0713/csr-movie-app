import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import classes from "./home.module.css";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import React from "react";
import { SearchMoviesResult } from "../models/movie.model";
import { fetchMovies } from "../services/fetch.service";
import { SearchTextContext } from "../Contexts/SearchTextContextProvider";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { search, setSearch } = React.useContext(SearchTextContext);
  const [searchResult, setSearchResult] = React.useState<SearchMoviesResult>();

  React.useEffect(() => {
    if (search !== "") {
      fetchMovies(search).then(setSearchResult);
    }
  }, [search]);

  return (
    <>
      <Typography variant="h3" component="h1" align="center" color="initial">
        Welcome to the movie app of your dreams
      </Typography>
      <TextField id="search" onBlur={({ target }) => setSearch(target.value)} />
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
            {searchResult?.results.map((movie) => (
              <Link key={movie.id} to={`details/${movie.id}`}>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  className={classes.root}
                  onClick={() => {}}
                >
                  <TableCell align="center">{movie.id}</TableCell>
                  <TableCell align="center">{movie.title}</TableCell>
                  <TableCell align="center">{movie.vote_average}</TableCell>
                  <TableCell align="center">{movie.vote_count}</TableCell>
                  <TableCell align="center">{movie.popularity}</TableCell>
                  <TableCell align="center">{movie.release_date}</TableCell>
                </TableRow>
              </Link>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export { HomePage };
