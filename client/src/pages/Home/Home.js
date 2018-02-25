import React, { Component } from "react";
import Search from "../../components/Search";
import Results from "../../components/Results";
import Saved from "../../components/Saved";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Container } from "../../components/Grid";
import Loading from 'react-loading-components';

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
                                              savedArticles={this.state.savedArticles}/> 
                                              : ""}
      </Container>
    );
  }
}

export default Home;
