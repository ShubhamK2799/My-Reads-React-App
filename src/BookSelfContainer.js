import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookSelf'

class BookSelfContainer extends Component{
    constructor(props){
        super(props)
        this.state={
            books:[]
            // shelf:''
        }
        // in order to access this.state in the function
        this.updateShelf=this.updateShelf.bind(this)
    }
    componentWillMount(){
        //BooksApi.getAll() will return a promise
        // Here if we are using expanded function decleration then we need to return the expression 
        // to consider it as a assignment else use shorthand function notation
        BooksAPI.getAll()
        .then((allBooks)=>{
            this.setState({books:allBooks});
        })
    }

    updateShelf(book,toshelf){
      BooksAPI.update(book,toshelf).then(response=>{
          var newbooks = this.state.books;
          newbooks.forEach(function(newbook){
              if(newbook.id===book.id) newbook.shelf=toshelf
              return newbook
          })
          console.log(newbooks)
          this.setState({books:newbooks}) 
      })
    }

    render(){
        return (
            <div className="app">
              <div className="list-books">
                
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>

                <div className="list-books-content">  
                  <BookShelf 
                    type="Currently Reading" 
                    books= {this.state.books.filter(book=> book.shelf==='currentlyReading')}
                    updateShelf = {this.updateShelf}
                  />
                </div>
                
                <div className="list-books-content">  
                  <BookShelf 
                  type="Want to Read" 
                    books={this.state.books.filter(book=> book.shelf==='wantToRead')}
                    updateShelf = {this.updateShelf}
                  />
                </div>
                
                <div className="list-books-content">  
                  <BookShelf type="Read"
                    books={this.state.books.filter(book=> book.shelf==='read')}
                    updateShelf = {this.updateShelf} 
                  />
                </div>
                

                <div className="search-books-results">
                  <div className="open-search">
                    <Link to='/Search'>
                      <button>Add a book</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            )
    }
}

export default BookSelfContainer