import React, { Component } from "react"
import Search from "../../components/Search"
import Results from "../../components/Results"
import Saved from "../../components/Saved"
import Modal from "../../components/Modal"
import API from "../../utils/API"
import { Container } from "../../components/Grid"
import Loading from 'react-loading-components'
import subscribeToServerSockets from '../../utils/socket'

class Home extends Component {
  state = {
    searching: false,
    showModal: false,
    article: {},
    searchResults: [],
    savedArticles: [],
    note: ""
  }

  componentDidMount() {
    this.getSavedArticles()

    subscribeToServerSockets.subscribeToServerSockets()
  }

  handleChange = e => this.setState({[e.target.name]: e.target.value})

  // this is for the NYT API
  fetchArticles = data => {
    this.setState({ searching: true })
    API.fetch(data)
      .then(res =>{
        console.log(res.data)
        this.setState({ searchResults: res.data, searching: false })
      })
      .catch(err => console.log(err.response))
  }

  // this retrieves saved articles from our db
  getSavedArticles = () => {
    API.getSavedArticles()
      .then(res =>{
        console.log(res.data)
        this.setState({ savedArticles: res.data })
      })
      .catch(err => console.log(err.response))
  }

  getSavedArticle = article => {
    console.log(article)
    API.getSavedArticle(article)
      .then(res =>{
        console.log(res.data)
        this.setState({ article: res.data })
      })
      .catch(err => console.log(err.response))
  }

  saveArticle = data => {
    API.saveArticle(data)
    .then(res =>{
      console.log(res.data)
      this.setState({ savedArticles: [...this.state.savedArticles, res.data] })
    })
    .catch(err => console.log(err.response))
  }

  deleteArticle = data => {
    API.deleteArticle(data)
    .then(res =>{
      console.log(res.data)
      
      this.setState({ savedArticles: this.state.savedArticles.filter(article => article._id !== res.data._id) })
    })
    .catch(err => console.log(err.response))
  }

  saveNote = articleId => {
    const data = {}
    data.articleId = articleId
    data.note = this.state.note
    
    console.log(data)
    API.saveNote(data)
    .then(res =>{
      this.setState({ note: "", article: res.data})
      this.getSavedArticles()
    })
    .catch(err => console.log(err.response))
  }

  deleteNote = noteId => {
    API.deleteNote(noteId)
    .then(res =>{
      console.log(res.data)
      this.setState({ note: "" })
      this.getSavedArticle(this.state.article)
      this.getSavedArticles()
    })
    .catch(err => console.log(err.response))
  }

  openModal = data => this.setState({article: data, showModal: true})
  closeModal = () => this.setState({showModal: false})
  

  render() {
    return (
      <Container fluid>
        <Search title="Search" fetchArticles={this.fetchArticles.bind(this)}/>
        {this.state.searching ? <div className="center">
            <Loading type='ball_triangle' width={100} height={100} fill='#f44242' />
            <Loading type='ball_triangle' width={100} height={100} fill='#f44242' />
            <Loading type='ball_triangle' width={100} height={100} fill='#f44242' />
          </div> : ""}
        {this.state.searchResults.length ? <Results 
                                              title="Results"
                                              saveArticle={this.saveArticle.bind(this)}
                                              searchResults={this.state.searchResults}/> 
                                              : ""}
        {this.state.savedArticles.length ? <Saved 
                                              title="Saved"
                                              deleteArticle={this.deleteArticle.bind(this)}
                                              openModal={this.openModal.bind(this)}
                                              savedArticles={this.state.savedArticles}/> 
                                              : ""}
        {(this.state.showModal) ? <Modal 
          article={this.state.article}
          closeModal={this.closeModal.bind(this)}
          value={this.state.note}
          handleChange={this.handleChange.bind(this)}
          saveNote={this.saveNote.bind(this)}
          deleteNote={this.deleteNote.bind(this)}
          /> : "" }
      </Container>
    )
  }
}

export default Home
