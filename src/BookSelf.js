import React, {Component} from 'react';
import Book from './Book.js';
import './App.css';

class BookShelf extends Component {
    render() {
        return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{this.props.type}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                {this.props.books.map( book=>
                    <Book 
                      bookDetails={book}
                      key={book.id}
                      updateShelf={this.props.updateShelf}
                    />
                )}
                </ol>
            </div>
        </div>);
    }
}

export default BookShelf;
