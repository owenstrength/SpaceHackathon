import React, { Component } from 'react'

export class PageNotFound extends Component {
    render() {
        return (
            <div>
                <h1 className='title-text'>404 - Page Not Found</h1>
                <h1 className='desc-text'>This is not a planet. You are lost in space.</h1>
            </div>
        )
    }
}

export default PageNotFound