import React from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Books from './Books'
import Search from './Search'

class BooksApp extends React.Component {
  state={
    books: [],
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books: books
        }))
      })
  }

  updateBooks = (books) => {
    this.setState(() => ({
      books: books
    }))
  }

  render() {
    const books = this.state.books
    return (
      <div className="app">
        <Route exact path="/">
          <Books books={books} onChange={(books) => this.updateBooks(books)}/>
        </Route>
        <Route exact path="/search">
          <Search books={books} onChange={(books) => this.updateBooks(books)}/>
        </Route>
      </div>
    )
  }
}

export default BooksApp
