import React from "react"
import {Card, CardTitle, Input, Button} from 'react-materialize'
import API from '../../utils/API'

class Search extends React.Component {

  state={
    startYear: '1980-01-01',
    endYear: '2018-01-01',
    searchTerm: ''
  }

  changeHandler = e => {
    e.preventDefault()
    const {name, value} = e.target
    this.setState({[name]: value})
  }

  render(){
    return <Card 
      className="ben accent"
      textClassName='white-text'
      header={<CardTitle  className="ben lighten-1">{this.props.title}</CardTitle>}
      actions={[<Button className={this.state.searchTerm.length ? '': 'disabled'} onClick={()=>{this.props.fetchArticles(this.state)}}>Search</Button>]}>
      <Input
        className="ben-text text-darken-4"
        name="searchTerm" 
        label ="Search Term"
        onChange={this.changeHandler}/>
      <Input 
        className="ben-text text-darken-4"
        name="startYear" 
        label ="Start Year"
        onChange={this.changeHandler}/>
      <Input 
        className="ben-text text-darken-4"
        name="endYear" 
        label ="End Year"
        onChange={this.changeHandler}/>
    </Card>
    }
}

export default Search
