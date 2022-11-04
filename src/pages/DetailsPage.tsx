import { Card, CardContent, CardMedia, Rating, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { Movie } from "../models/movie.model";
import { fetchMovie } from "../services/fetch.service";
import classes from "./details.module.css";

const DetailsPage = () => {
  const FallbackImage = "public/placeholder.jpg";
  const { id } = useParams();
  const [movie, setMovie] = React.useState<Movie>();
  const [moviePoster, setMoviePoster] = React.useState<string>();

  React.useEffect(() => {
    if (id !== undefined) {
      fetchMovie(id)
        .then(setMovie)
        .then(() => setMoviePoster(movie?.poster_path));
    }
  }, []);

  if (!movie) return <></>;

  return (
    <Card className={classes.root}>
      <CardMedia
        component="img"
        height="400"
        sx={{ width: "300px", objectFit: "contain" }}
        image={moviePoster}
        alt={movie.title}
        onError={() => setMoviePoster(FallbackImage)}
      />
      <CardContent>
        <Rating defaultValue={movie.vote_average} precision={0.25} max={10} size="large" readOnly />
        <Typography gutterBottom variant="h5" component="div" mt={3}>
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.overview}
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={3}>
          Date de sortie : {movie.release_date}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Titre original : {movie.original_title} - VO : {movie.original_language}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Popularité : {movie.popularity}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Évaluation : {movie.vote_average}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Votes : {movie.vote_count}
        </Typography>
      </CardContent>
    </Card>
  );
};

export { DetailsPage };
