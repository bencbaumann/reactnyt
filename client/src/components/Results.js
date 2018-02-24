import React from "react"
import {Card, CardTitle, Collection, CollectionItem, Button} from 'react-materialize'

const Results = (props) =>
<Card className='deep-orange accent-4'
	header={<CardTitle className="lime accent-3">{props.title}</CardTitle>}
	actions={[<a href='#'>Search</a>]}>
  <Collection>
    {props.searchResults.map(searchResult => <CollectionItem key={searchResult.id}><div>{searchResult.headline.main}<a href="#!" class="secondary-content"><i class="material-icons" onClick={()=>{props.saveArticle(searchResult)}}>save</i></a></div></CollectionItem>)}
  </Collection>
</Card>

export default Results;
