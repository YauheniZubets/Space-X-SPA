import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import './Pagination.css';

class Pagination extends React.PureComponent {

    static propTypes = {
        postsPerPage: PropTypes.number,
        totalPosts: PropTypes.number,
        pag: PropTypes.func,
        currentPage: PropTypes.number
    }

    state = {
        paginationSelect: this.props.currentPage
    }

    pageNumbers=[];

    constructor (props) {
        super(props);
        for (let i = 1; i <= Math.ceil(props.totalPosts/props.postsPerPage); i++) {
            this.pageNumbers.push(i);
        }
    }

    newClass = (EO) => {
        let number=EO.target.innerHTML;
        if (number==='«') {
            console.log('number: ', number);
            //console.log(this.state.paginationSelect-=1);
            this.props.pag(this.state.paginationSelect-=1);
        }
        if (number==='»') {
            console.log('number: ', number);
            this.props.pag(this.state.paginationSelect++);
        }
        if (!isNaN(number)) {
            this.props.pag(number);
        }
        if(this.state.paginationSelect!==+number){
            this.setState({paginationSelect: +number});
        } 
    }

    render () {
        //console.log(this.props.currentPage, this.state.paginationSelect);
        const {paginate}=this.props;
        
        return (
            <nav className='Pagination-nav'>
                <ul className='Pagination'>
                    <li onClick={this.newClass}>
                        <Link to={`/starts/page/${this.state.paginationSelect-1}`}  >
                            «
                        </Link>
                    </li>
                    {this.pageNumbers.map(number=>{
                        return (
                        
                        <li key={number} 
                            onClick={this.newClass} >
                            <Link to={`/starts/page/${number}`} className={(this.state.paginationSelect==+number) ? 'Pagination-active' : ''} >
                                {number}
                            </Link>  
                        </li>
                    )})}
                    <li onClick={this.newClass}>
                        <Link to={`/starts/page/${this.state.paginationSelect+1}`}  >
                            »
                        </Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Pagination;