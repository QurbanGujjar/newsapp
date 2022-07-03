import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spineer from "./Spineer";
import PropTypes from "prop-types";
import jsonData from "./SampleOutput.json";
import InfiniteScroll from "react-infinite-scroll-component";

// 473713aa39ca4ee0ac4c93b07dd42fa8

let varPageSize;
export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 4,
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    // pageSize:PropTypes.number
  };

  articles = [];
  capitalFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(0);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalFirstLetter(
      this.props.category
    )} -NewsMonkey`;
  }


  getPageSize() {
    // setwindowSize(window.innerWidth)
    let w = window.innerWidth;
    if (w < 500) {
      // console.log(" news case 1");
      this.varPageSize = 1;
    } else if (w > 500 && w < 780) {
      // console.log(" news case 2");
      this.varPageSize = 2;
    } else if (w > 780 && this.w < 1100) {
      // console.log(" news case 3");
      this.varPageSize = 3;
    } else {
      // console.log("news case 4");
      this.varPageSize = 4;
    }
  }

  async updateNews() {
    // this.getPageSize();
    // console.log("update news ",this.state.page)
    // console.log(this.state.page)/
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.APIKEY}&page=${this.state.page}&pagesize=4`;
    // const url ='/SampleOutput.json'
    this.setState({ loading: true });
    let data = await fetch(url);
    // console.log(data)
    let parsedData = await data.json();
    // console.log(parsedData)
    // let parsedData = await data.json();
    // this.props.setProgress(100)
    // let parsedData =  jsonData
    this.setState({ loading: false });
    this.setState((this.articles = parsedData.articles));
    this.setState({ totalResults: parsedData.totalResults });
    this.props.setProgress(100);
    // console.log(parsedData.totalResults)
  }

  async componentDidMount() {
    this.updateNews();
  }
  handlePreviousClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  fetchMoreData = async ()=>{
    this.setState({ page: this.state.page + 1 });
    // console.log("a l",this.articles.length)
    this.setState({ loading: true });
    // console.log("fetch more data ",this.state.page)
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.APIKEY}&page=${this.state.page+1}&pagesize=4`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState((this.articles = this.articles.concat(parsedData.articles)));
    // console.log(this.articles)
    // console.log("fetch news ",this.state.page)
  }

  render() {
    // console.log("Rander");
    return (
      <>        <h2 className='text-center' style={{margin:'35px 0px',marginTop:"90px"}}>
          NewsMonkey top Headlinse from{" "}
          {this.capitalFirstLetter(this.props.category)} category
        </h2>
        {/* {this.state.loading && <Spineer />} */}
        {/* !this.state.loading && */}

        <InfiniteScroll
          dataLength={this.articles.length}
          next={this.fetchMoreData}
          hasMore={this.articles.length !== this.state.totalResults}
          loader={<Spineer/>}
        >
          <div className="container">
          <div className='row'>
            {this.articles.map((element) => {
              return (
                <div
                  className='col-md-3'
                  key={element.url}
                >
                  <NewsItem
                    title={element?.title}
                    discription={element?.description}
                    imgUrl={element?.urlToImage}
                    url={element?.url}
                    author={element?.author}
                    date={element?.publishedAt}
                    source={element?.source.name}
                  />
                </div>
              );
            })}
          </div>
          </div>
        </InfiniteScroll>
        {/* <div className='container d-flex justify-content-between'>
          <button
            type='button'
            disabled={this.state.page <= 1}
            className='btn btn-dark'
            onClick={this.handlePreviousClick}
          >
            {" "}
            &laquo; Previous
          </button>
          <button
            type='button'
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            className='btn btn-dark'
            onClick={this.handleNextClick}
          >
            {" "}
            Next &raquo;
          </button>
        </div> */}
      </>
    );
  }
}

export default News;
