import React from 'react';
import PropTypes from 'prop-types';
import Main from '../Main/Main';

import Pagination from '../Pagination/Pagination';
import Preloadsquare from '../Preloadsquare/Preloadsquare';

import {Link} from 'react-router-dom';

import './Calendar.css';

class Calendar extends React.PureComponent {

    static propTypes = {
        launches: PropTypes.array,
        currentP: PropTypes.number
    }

    state = {
        allLaunches: this.props.launches,
        posts: null, //количество всех постов(стартов)
        loading: false, //состояние загрузки списка
        currentPage: this.props.currentP, //текущая страница пагинации
        postsPerPage: 10 //количество элементов на странице пагинации
    }

    componentWillReceiveProps (newProps) { // изменяет состояние когда пропсы опаздывают после получения через fetch
        if (newProps.launches) { //вызываем пагинацию после получения полных пропсов;
            this.setState({allLaunches: newProps.launches, currentPage: newProps.currentP}, ()=> this.getCurrentPosts()); 
        }
    }

    componentDidMount () { //вызывается когда пропсы готовы сразу
        if (this.props.launches) this.getCurrentPosts();
    }

    getCurrentPosts = () => { //вычисления количества отображений на одной странице пагинации
        const indexOfLastPost=this.state.currentPage * this.state.postsPerPage;
        const indexOfFirstPost=indexOfLastPost - this.state.postsPerPage;
        const currentPosts=this.props.launches.slice(indexOfFirstPost, indexOfLastPost);
        this.setState({posts: currentPosts});
        return currentPosts;
    }
    

    cbClick = (EO) => { //по атрибуту получим id launch и передадим в Detail
        let id=EO.target.getAttribute('value');
        this.props.currentLaunch(id);
    }

    render () {
        //console.log('render', this.props, this.state);
        //console.log(this.props);
        return (
            <div>
                <Main name='Все запуски SpaceX' />
                <section className="calendar">
                    <div className="container">
                    {
                        (!this.state.posts) ? 
                        <div style={{height: '100vh'}}><Preloadsquare /></div> :
                        <div>
                            <ul className="calendar-list">
                                {   
                                    this.state.posts &&
                                    this.state.posts.map(item=>(
                                        <li className="calendar-item" key={item.id}>
                                            <article className="launches">
                                                <div className="launches-image">
                                                    <img src={item.links.patch.small} alt="" />
                                                </div>
                                                <div className="launches-content">
                                                    <h2 className="launches-title">{item.name}</h2>
                                                    <div onClick={this.cbClick}>
                                                        <Link to={`/starts/${item.id}`} 
                                                            className="button launches-details" value={item.id}
                                                        >
                                                            Подробнее
                                                        </Link>
                                                    </div>
                                                </div>
                                            </article>
                                        </li>
                                    ))	
                                }
                            </ul>
                            <Pagination 
                                postsPerPage={this.state.postsPerPage} 
                                totalPosts={this.state.allLaunches.length}
                                pag={this.props.pag}
                                currentPage={this.state.currentPage}
                            />
                        </div>
                    }
                    </div>
                </section>
            </div>
        )
    }
};

export default Calendar;