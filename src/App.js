import React from 'react'
import BookShelfContainer from './BookSelfContainer'
import Search from './Search'
import {Route, BrowserRouter} from 'react-router-dom'
import './App.css'

class BooksApp extends React.Component {
  render() {
    return (
      <BrowserRouter>
        {/* We need to use browser router to embed routes */}
        <div>
        <Route exact path='/' component={BookShelfContainer}/>
        <Route exact path='/Search' component={Search}/>
        </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp