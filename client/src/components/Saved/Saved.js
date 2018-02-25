import React from 'react'
import {Card, CardTitle, Collection, CollectionItem} from 'react-materialize'

const Saved = (props) =>
  <Card className='ben accent'
    header={<CardTitle className='ben lighten-1'>{props.title}</CardTitle>}>
    <Collection>
      {props.savedArticles.map(savedArticle => <CollectionItem className='ben lighten-3 ben-text text-icons' key={savedArticle._id}>
        <div>{savedArticle.title}
          <a href='#!' className='secondary-content'><i className='material-icons ben-text text-icons' onClick={() => { props.deleteArticle(savedArticle) }}>delete</i></a>
          <a href={savedArticle.url} className='secondary-content'><i className='material-icons ben-text text-icons'>link</i></a>
          <a href='#!' className='secondary-content'><i className='material-icons ben-text text-icons' onClick={() => { props.openModal(savedArticle) }}>comment</i></a>
        </div></CollectionItem>)}
    </Collection>
  </Card>

export default Saved
