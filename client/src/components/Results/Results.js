import React from "react"
import {Card, CardTitle, Collection, CollectionItem} from 'react-materialize'

const Results = (props) =>
<Card className="ben accent"
	header={<CardTitle className="ben lighten-1">{props.title}</CardTitle>}>
  <Collection>
    {props.searchResults.map(searchResult => <CollectionItem key={searchResult._id} className="ben lighten-3 ben-text text-icons" key={searchResult.id}><div>{searchResult.headline.main}<a href="#!" class="secondary-content"><i class="material-icons ben-text text-icons" onClick={()=>{props.saveArticle(searchResult)}}>save</i></a></div></CollectionItem>)}
  </Collection>
</Card>

export default Results;
