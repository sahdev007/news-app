import React, { Component } from 'react';
import NewsItems from './NewsItems';
import Spinner from './spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

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
      page:1,
      totalResults : 0
    }
    document.title =  `${this.capitalizeFirstLetter(this.props.category)} - News App`;
  }

  async updateNews() {
    console.log(this.props.apiKey);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.state.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading :false});
  }
  
  async componentDidMount() {
    console.log('component Mount methods');
    this.updateNews();
  }

    fetchMoreData = async() => {
      this.setState({page: this.state.page + 1});
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true});
      let data = await fetch(url);
      let parsedData = await data.json();
      setTimeout(() => {
        this.setState({articles: this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults, loading :false});
      }, 1000);
  };

  render() {
    return (
      <>

        <div className="container my-3">
          <h2 className='py-5 text-center text-capitalize'>{this.props.category} News Headlines</h2>
          {/* {this.state.loading && <Spinner/>} */}
              <InfiniteScroll
                dataLength={this.state.articles.length}
                next={this.fetchMoreData}
                hasMore={this.state.articles.length != this.state.totalResults}
                loader={<Spinner/>}
              >
                <div className="container">
                  <div className="row g-3">
                    {this.state.articles.map((res) => {
                      return  <div className="col-3 my-2" key={res.url} >
                          <NewsItems title={res.title} description={res.description} imgUrl={res.urlToImage} newsUrl={res.url} createdAt={res?.publishedAt}/>
                        </div>
                    })}
                  </div>
                </div>
            </InfiniteScroll>
        </div>
      </>
    )
  }
}
