import React,{Component} from 'react'

class Book extends Component{

    handleUpdate(bookDetails,toshelf){
        this.props.updateShelf(bookDetails,toshelf)
    }

    render(){
        return (<li>
            <div className="book">
                <div className="book-top">
                {/* {console.log(this.props.imageUrl)} */}
                <div className="book-cover" style={{ 
                    width: 128, height: 193, 
                    backgroundImage: `url(${this.props.bookDetails.imageLinks?this.props.bookDetails.imageLinks.smallThumbnail:''})`
                    }}/>
                <div className="book-shelf-changer">
                    <select onChange={event => this.handleUpdate(this.props.bookDetails,event.target.value)} value={this.props.shelf} >
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option> 
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                    </select>
                </div>
                </div>
                <div className="book-title">{this.props.bookDetails.title}</div>
                <div className="book-authors">{this.props.bookDetails.authors}</div>
            </div>
        </li>);
    }
}

export default Book
