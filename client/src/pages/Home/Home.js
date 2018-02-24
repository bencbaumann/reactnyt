import React, { Component } from "react";
import Search from "../../components/Search";
import Results from "../../components/Results";
import Saved from "../../components/Saved";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Container } from "../../components/Grid";
import ReactLoading from 'react-loading';

class Home extends Component {
  state = {
    searching: false,
    resultsLoading: false,
    searchResults: [],
    savedArticles: []
  };

  componentDidMount() {
    this.getSavedArticles();
  }

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

  saveArticle = data => {
    console.log("I'm in the parent beotch")
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

  render() {
    return (
      <Container fluid>
        <Search title="Search" fetchArticles={this.fetchArticles.bind(this)}/>
        {this.state.searching ? <ReactLoading type="bars" color="red" height='100' width='100' /> : ""}
        {this.state.searchResults.length ? <Results 
                                              title="Results"
                                              saveArticle={this.saveArticle.bind(this)}
                                              searchResults={this.state.searchResults}/> 
                                              : ""}
        {this.state.savedArticles.length ? <Saved 
                                              title="Saved"
                                              deleteArticle={this.deleteArticle.bind(this)}
                                              savedArticles={this.state.savedArticles}/> 
                                              : ""}
      </Container>
    );
  }
}

export default Home;
