import React from 'react';
import { connect } from 'react-redux';
import { addPet } from '../../../actions/PetsActions';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const AddPet = ({ dispatch }) => {
  let input;
  let input2;
  let input3;
  return (
    <div>
      <Link to='/dashboard'>dashboardlink</Link>
      <form
        onSubmit={e => {
          e.preventDefault()
          if (!input.value.trim() || !input2.value.trim()) {
            return
          }

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
