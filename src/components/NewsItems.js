import React, { Component } from 'react'

export class NewsItems extends Component {

  render() {
    let {title, description, imgUrl, newsUrl, createdAt} = this.props;
    return (
      <>
        <div className="card">
          <img src={imgUrl} style={{height: 230}} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <span className="text-muted">{new Date(createdAt).toDateString()}</span>
            </p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read more</a>
          </div>
        </div>
      </>
    )
  }
}

export default NewsItems