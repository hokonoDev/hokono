import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addPet } from '../actions/PetsActions';
import { Nav } from './index';
import firebase from '../firebase/index.js';

const AddPet = ({ dispatch, history, auth }) => {
  let input;
  let input2;

  this.createFile = (path) => {
    console.log("path file", path);
    const file = new File([''], path);
    //var selectedFile = document.getElementById('imgBlob').files[0];
    //store a file and access it's img using the fedback ref url
    const currUser = firebase.auth().currentUser;
    const storageRef = firebase.storage().ref('/testfolder/testimg');
    //upload a file
    const uploadTask = storageRef.put(file);
  }

  return (
    <div>
      <Nav
        authData={auth}
      />
      <form
        onSubmit={e => {
          e.preventDefault()
          if (!input.value.trim() || !input2.value.trim()) {
            return
          }
          this.createFile(input2.value)
          dispatch(addPet({name: input.value, img: input2.value}))
          input.value = ''
          input2.value = ''
        }}
      >
        Add name
        <input
          ref={node => {
            input = node
          }}
        />
        Add img from phone camera
        <input type="file"
          accept="image/*"
          capture="camera"
          id="imgBlob"
          ref={node2 => {
            input2 = node2
          }}
        />
        <button type="submit">
          Add Pet
        </button>
      </form>
    </div>
  )
}
export default connect()(AddPet);
