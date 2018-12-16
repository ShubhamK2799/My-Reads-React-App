import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI.js';
import Book from './Book.js';


class Search extends Component {
      constructor(props) {
          super(props);
          this.state = {
            results: [],
            myBooks:[]
          }
          this.updateShelf = this.updateShelf.bind(this)
          this.searchQuery = this.searchQuery.bind(this)
        }
      
      componentWillMount(){
        BooksAPI.getAll()
        .then((response)=>{
          this.setState({myBooks:response});
          console.log("My books: ",response)
        })
      }

      updateShelf(book,toshelf){
        BooksAPI.update(book,toshelf)
        .then(response=>{
            console.log(response)
        })
        BooksAPI.getAll()
        .then((response)=>{
          this.setState({myBooks:response});
          console.log("My books: ",response)
        })
      }
  
      searchQuery(query){
          console.log("Query "+query);
          if(query){
            BooksAPI.search(query).then((response) => {
              if(response.error)
                  this.setState({ results: [] })
              else
                  this.setState({ results: response })
            })
          }else   this.setState({ results: [] })
          console.log("Result: ",this.state.results);
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
          {this.state.results.map( book=>{
              var inShelf = "none"
              for(var i=0; i<this.state.myBooks.length;i++)
                if(this.state.myBooks[i].id===book.id){
                  inShelf = this.state.myBooks[i].shelf;
               } 
               {/* console.log(book.title,inShelf) */}
              return <Book 
                bookDetails={book}
                key={book.id}
                updateShelf={this.updateShelf}
                shelf={inShelf}
              />
            }
          )}
          </ol>
        </div>
      </div>)
    }
}

export default Search