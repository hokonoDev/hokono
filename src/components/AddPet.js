import React from 'react';
import { connect } from 'react-redux';
import { addPet } from '../actions/PetsActions';

const AddPet = ({ dispatch, history }) => {
  let input;
  let input2;

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          if (!input.value.trim() || !input2.value.trim()) {
            return
          }
          addPet({name: input.value, img: input2.files})
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
