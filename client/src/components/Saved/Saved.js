import React from "react"
import {Card, CardTitle, Collection, CollectionItem, Button} from 'react-materialize'

const Saved = (props) =>
<Card className="ben accent"
	header={<CardTitle className="ben lighten-1">{props.title}</CardTitle>}>
  <Collection>
    {props.savedArticles.map(savedArticle => <CollectionItem className="ben lighten-3 ben-text text-icons" key={savedArticle._id}><div>{savedArticle.title}<a href="#!" class="secondary-content"><i class="material-icons ben-text text-icons" onClick={()=>{props.deleteArticle(savedArticle)}}>delete</i></a></div></CollectionItem>)}
  </Collection>  
</Card>

export default Saved;
