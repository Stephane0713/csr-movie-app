import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Movie } from "../models/movie.model";
import { fetchMovie } from "../services/fetch.service";
import classes from "./details.module.css";

const DetailsPage = () => {
  const FallbackImage = "/placeholder.jpg";
  const navigate = useNavigate();
  const { id } = useParams();
  const [movie, setMovie] = React.useState<Movie>();
  const [moviePoster, setMoviePoster] = React.useState<string>();

  React.useEffect(() => {
    if (id !== undefined) {
      fetchMovie(id).then((res: Movie) => {
        setMovie(res);
        setMoviePoster(`https://image.tmdb.org/t/p/w500/${res?.poster_path}`);
      });
    }
  }, [id, setMovie, setMoviePoster]);

  if (!movie) return <></>;

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<KeyboardBackspaceIcon />}
        sx={{ marginRight: "auto", marginBottom: 2 }}
        onClick={() => navigate("/")}
      >
        Go back
      </Button>
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
          <Rating
            defaultValue={movie.vote_average}
            precision={0.25}
            max={10}
            size="large"
            readOnly
          />
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
            Titre original : {movie.original_title} - VO :{" "}
            {movie.original_language}
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
    </>
  );
};

export { DetailsPage };
