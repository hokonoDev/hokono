import React from 'react';
import { connect } from 'react-redux';
import { addPet } from '../actions/PetsActions';

const AddPet = (props) => {
  let input;
  let input2;

  return (
    <div
      className="col-box-center"
    >
      <div
        className="gen-box"
      >
        <p
          className="title"
        >New Pet</p>
        <form
          className="add-pet-form"
          onSubmit={e => {
            e.preventDefault();
            if (!input.value.trim() || !input2.value.trim()) {
              return;
            }
            addPet({
              name: input.value,
              img: input2.files,
              adopt: props.match.path.slice(1, -7) === 'shelter',
              location: props.profile.location,
            });
            input.value = '';
            input2.value = '';
            setTimeout(() => props.history.push('/'), 500)
          }}
        >
          <p>Enter name</p>
          <input
            ref={node => {
              input = node
            }}
          />
          <p>Upload an image</p>
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
    </div>
  )
}
export default connect()(AddPet);
