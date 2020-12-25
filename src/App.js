import React from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import MainPage from './MainPage'
import SearchPage from './SearchPage'
import { BrowserRouter } from 'react-router-dom'

class BooksApp extends React.Component {
  state={
    books: [],
  }

  async componentDidMount(){
    const books = await BooksAPI.getAll();
    this.setState({ books })
  }

  updateBooks = (books) => {
    this.setState(() => ({
      books: books
    }))
  }

  render() {
    const books = this.state.books
    return (
      <BrowserRouter>
      <div className="app">
        <Route exact path="/">
          <MainPage books={books} onChange={(books) => this.updateBooks(books)}/>
        </Route>
        <Route exact path="/search">
          <SearchPage books={books} onChange={(books) => this.updateBooks(books)}/>
        </Route>
      </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp
