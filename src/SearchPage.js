import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import './App.css'
import Book from './Book'

class SearchPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      query: '',
      books: []
    }
  }

  updateQuery = (query) => {
    this.setState(()=> ({
      query: query
    }))

    BooksAPI.search(query.trim())
      .then((books) => {
        if(Array.isArray(books)){
          let all_books = this.props.books
          for(let i = 0; i < books.length; i++){
            let book_index = all_books.findIndex(book => book['id'] === books[i]['id'])
            if(book_index !== -1){
              let book_updated = all_books[book_index]
              books[i]['shelf'] = book_updated['shelf']
            } else {
              books[i]['shelf'] = "none"
            }
          }

          this.setState(() => ({
            books: books
          }))
        } else {
          this.setState(() => ({
            books: []
          }))
        }
      })
  }

  updateBooks = (bookID, shelf) => {
    let books_search = this.state.books
    let book_search_index = books_search.findIndex(book => book['id'] === bookID)
    books_search[book_search_index]['shelf'] = shelf
    this.setState(() => ({
      books: books_search
    }))

    let books = this.props.books
    let book_index = books.findIndex(book => book['id'] === bookID)
    books[book_index]['shelf'] = shelf
    this.props.onChange(books)
  }

  render() {
    const books = this.state.books
    return (
      <div className="search">
        <div className="to-main-page">
          <Link
            to='/'
            style={{ textDecoration: 'none' }}
          >Main Page</Link>
        </div>
        <div className="search-books-bar">
          <input
            type='text'
            placeholder='Search Books'
            value={this.state.query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
        </div>
        <div className="search-books-results">
          {books ?
            <ol className="books-grid" style={{justifyContent: 'left'}}>
              {books.map((book =>
                <li key={book['id']}>
                  <Book book={book} onChange={(bookID, shelf) => this.updateBooks(bookID, shelf)} />
                </li>
              ))}
            </ol>
          :''}
        </div>
      </div>
    )
  }
}

export default SearchPage
