import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI.js';
import Book from './Book.js';


class Search extends Component {
      constructor(props) {
          super(props);
          this.state = {
            results: []
          }
        }
      
      updateShelf(book,toshelf){
        BooksAPI.update(book,toshelf).then(response=>{
            console.log(response)
        })
      }
  
      searchQuery = function(query){
          console.log("Query is "+query);
          if(query){
            BooksAPI.search(query).then((response) => {
              if(response.error)
                  this.setState({ results: [] })
              else
                  this.setState({ results: response })
            })
          }else
            this.setState({ results: [] })
          console.log(this.state.results);
      }

    render(){
        return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" 
            onChange={(event) => this.searchQuery(event.target.value)} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {this.state.results.map( book=>
              <Book 
                bookDetails={book}
                key={book.id}
                updateShelf={this.updateShelf}
              />
          )}
          </ol>
        </div>
      </div>)
    }
}

export default Search