import React from 'react'
import Loader from './Loader';

const RenderGif = (props) => {
    if (props.isloading) {
        return <Loader />
    }
    return props.currentItems.map(el => {
        return (
            <div key={el.id} className='gif'>
                <img className={'gifimage'} src={el.images.fixed_height.url} />
            </div>
        )
    })
}

export default RenderGif