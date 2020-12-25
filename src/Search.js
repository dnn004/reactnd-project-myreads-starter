import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Book from './Book'

class Search extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      query: '',
      books: []
    }
  }

  updateQuery = (query) => {
    this.setState(()=> ({
      query: query.trim()
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
        }
      })
  }

  updateBooks = (bookID, shelf) => {
    let books = this.props.books
    let book_index = this.state.books.findIndex(book => book['id'] === bookID)
    let book_updated = books[book_index]
    book_updated['shelf'] = shelf
    books[book_index] = book_updated
    this.props.onChange(books)
  }

  render() {
    const books = this.state.books
    return (
      <div className="search">
        <div>
          <input
            type='text'
            placeholder='Search Books'
            value={this.state.query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
        </div>
        {books ?
          <ol className="books-grid">
            {books.map((book =>
              <li key={book['id']}>
                <Book book={book} onChange={(bookID, shelf) => this.updateBooks(bookID, shelf)}>
                </Book>
              </li>
            ))}
          </ol>
        :''}
      </div>
    )
  }
}

export default Search
