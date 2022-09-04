import produce from "immer";
import { DETAIL_MOVIES, SET_CINEMAS, SET_MOVIES, SET_SCHEDULE } from "./action";
const initialState = {
  movies: null,
  selectedMovie: null,
  cinemas: null,
  schedule: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MOVIES: {
      const nextState = produce(state, (draff) => {
        draff.movies = action.payload;
      });
      return nextState;
    }

    case DETAIL_MOVIES: {
      const nextDetail = produce(state, (draff) => {
        draff.selectedMovie = action.payload;
      });
      return nextDetail;
    }

    case SET_CINEMAS: {
      const nextDetail = produce(state, (draff) => {
        draff.cinemas = action.payload;
      });
      return nextDetail;
    }
    case SET_SCHEDULE : {
      const nextDetail = produce(state, (draff) => {
        draff.schedule = action.payload[0];
      });
      return nextDetail;
    }

    default:
      return state;
  }
};

export default reducer;
