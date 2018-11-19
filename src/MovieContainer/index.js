import React, { Component } from 'react';
import CreateMovie from '../CreateMovie';
import MovieList from '../MovieList';
import EditMovie from '../EditMovie';
import { Grid } from 'semantic-ui-react';
import getCookie from 'js-cookie';

class MovieContainer extends Component {
  constructor(){
    super();

    this.state = {
      movies: [],
      movieToEdit: {
        title: '',
        description: '',
        _id: ''
      },
      showEditModal: false
    }
  }
  getMovies = async () => {
    // Where We will make our fetch call to get all the movies
    const csrfCookie = getCookie('csrftoken');
    const movies = await fetch('http://localhost:8000/movies/', {
      credentials: 'include',
      headers: {
        'X-CSRFToken': csrfCookie
      }
    });
    const moviesParsedJSON = await movies.json();
    return moviesParsedJSON
  }
  componentDidMount(){
    // get ALl the movies, on the intial load of the APP
    this.getMovies().then((movies) => {
      if(movies.message === 'Must be logged in to see the data'){
        console.log('Must Be LOGGED IN');
      } else {
        this.setState({movies: movies.data})
      }
    }).catch((err) => {
      console.log(err);
    })
    /// Where you call this.getMovies
  }
  addMovie = async (movie, e) => {
    // .bind arguments take presidence over every other argument
    e.preventDefault();
    console.log(movie);
    try {
      const csrfCookie = getCookie('csrftoken');
      const createdMovie = await fetch('http://localhost:8000/movies/', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(movie),
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfCookie
        }
      });
      const parsedResponse = await createdMovie.json();
      console.log(parsedResponse, '<--parsedResponse');
      this.setState({movies: [...this.state.movies, parsedResponse.data]})
    } catch(err){
      console.log(err)
    }
    // request address will start with 'http://localhost:9000'
    // Set up your post request with fetch, Maybe lookup how do i do post request with fetch,
    // headers: {'Content-Type': 'application/json'}
    // becuase after we create it, we want to add it to the movies array
  }
  deleteMovie = async (id) => {
    const csrfCookie = getCookie('csrftoken');
    const deleteMovieResponse = await fetch('http://localhost:8000/movies/' + id + '/', {
      headers: {
        'X-CSRFToken': csrfCookie,
        'Content-Type': 'application/json'
      },
      method: 'DELETE',
      credentials: 'include'
    });
    this.setState({movies: this.state.movies.filter((movie) => 
      movie.id !== id
    )})

      // Then make the delete request, then remove the movie from the state array using filter
  }
  handleEditChange = (e) => {

    this.setState({
      movieToEdit: {
        ...this.state.movieToEdit,
        [e.currentTarget.name]: e.currentTarget.value
      }
    });


    // movieToEdit: {
    //   _id: this.state.movieToEdit._id,
    //   title: this.state.movieToEdit.title,
    //   description: this.state.movieToEdit.description
    // }
  }
  closeAndEdit = async (e) => {
    // Put request,
    e.preventDefault();
    // If you feel up to make the modal (EditMovie Component) and show at the appropiate times

  }
  openAndEdit = (movieFromTheList) => {
    console.log(movieFromTheList, ' movieToEdit  ');


    this.setState({
      showEditModal: true,
      movieToEdit: {
        ...movieFromTheList
      }
    })

    // movieToEdit = {
    //   title: movieFromTheList.title,
    //   description: movieFromTheList.description
    // }
  }
  render(){
    console.log(this.state)
    return (
      <Grid columns={2} divided textAlign='center' style={{ height: '100%' }} verticalAlign='top' stackable>
        <Grid.Row>
          <Grid.Column>
            <CreateMovie addMovie={this.addMovie}/>
          </Grid.Column>

          <Grid.Column>
            <MovieList movies={this.state.movies} deleteMovie={this.deleteMovie} openAndEdit={this.openAndEdit}/>
          </Grid.Column>
          <EditMovie open={this.state.showEditModal} movieToEdit={this.state.movieToEdit} handleEditChange={this.handleEditChange} closeAndEdit={this.closeAndEdit}/>
        </Grid.Row>
      </Grid>
      )
  }
}

export default MovieContainer;
