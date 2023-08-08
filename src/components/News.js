import React, { Component } from 'react';
import NewsItems from './NewsItems';
import Spinner from './spinner';
import PropTypes from 'prop-types'

export default class News extends Component {


  static propsTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  capitalizeFirstLetter = (str) => {
    return str[0].toUpperCase() + str.slice(1);
  }

  constructor(props){
    super(props);
    this.state = {
      articles : [],
      loading : false,
      page:1
    }
    document.title =  `${this.capitalizeFirstLetter(this.props.category)} |  New App`;
  }
  async componentDidMount() {
    console.log('component Mount methods');
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2595e75c4713455abf65dff4a435e986`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading :false});
  }
  
  handleNext = async () => {
    console.log(this.state.page, 'page');
    if(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

    } else{
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2595e75c4713455abf65dff4a435e986&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true});
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({page: this.state.page + 1, articles: parsedData.articles, loading: false});
      console.log(this.state.page, 'new page size')
    }
  }

  handlePrev = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2595e75c4713455abf65dff4a435e986&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({page: this.state.page - 1, articles: parsedData.articles, loading: false})
  }

  render() {
    return (
      <>

        <div className="container my-3">
          <h2 className='py-5 text-center text-capitalize'>{this.props.category} News Headlines</h2>
          {this.state.loading && <Spinner/>}
          <div className="row g-3">
            {!this.state.loading && this.state.articles.map((res) => {
              return  <div className="col-3 my-2" key={res.url} >
                  <NewsItems title={res.title} description={res.description} imgUrl={res.urlToImage} newsUrl={res.url} createdAt={res?.publishedAt}/>
                </div>
            })}
          </div>
          <div className="container d-flex justify-content-between align-items-center my-4">
            <button disabled={this.state.page<=1} type="button" className="btn btn-danger me-2" onClick={this.handlePrev}> &larr; Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-success" onClick={this.handleNext}>Next &rarr;</button>
          </div>
        </div>
      </>
    )
  }
}
