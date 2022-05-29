import React from 'react'

const RenderError = (props) => {
    if (props.isError) {
        return (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            Unable to fetch Gifs, please try again
          </div>
        );
    }
}

export default RenderError