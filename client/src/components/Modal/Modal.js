import React from 'react'
import {Card, Button, Collection, CollectionItem} from 'react-materialize'
import './Modal.css'

const buffer = {
  padding: "20px"
}

const Modal = props => <div id='myModal' className='customModal'>
  <div className='modal-content'>
    <div className='modal-header'>
      <span className='close' onClick={() => props.closeModal()}>&times;</span>
      <h2>{props.article.title}</h2>
    </div>
    <div className='modal-body'>
      {props.article.notes ? <Collection>
        {props.article.notes.map(note => <CollectionItem>{note.body}<a href='#!' className='secondary-content'><i className='material-icons' onClick={() => { props.deleteNote(note._id) }}>delete</i></a></CollectionItem>)}
      </Collection> : ''} 
    </div>
    <div style={buffer}>
      <textarea name = 'note' value={props.value} onChange={props.handleChange} />
      <Button onClick = {() => props.saveNote(props.article._id)}>Save Note</Button>
    </div>
    <div className='modal-footer'>
      <h3>{props.article.notes.length + ' - Saved Notes on this Article'}</h3>
    </div>
  </div>
</div>

export default Modal
