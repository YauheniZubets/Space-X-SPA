import React from 'react';
import PropTypes from 'prop-types';
import Main from '../Main/Main';
import {Link} from 'react-router-dom';

import Preloadcircle from '../Preloadcircle/Preloadcircle';
import Preloadsquare from '../Preloadsquare/Preloadsquare';

import './Detailscalendar.css';

class Detailscalendar extends React.PureComponent {

    static propTypes = {
        currentLaunch: PropTypes.object,
        pagPage:PropTypes.number //номер страницы для возврата на компонент Календарь
    }

    state = {
        isVideoLoaded: false // проверяем загрузилось ли видео, если загружено прелоадер удаляется
    }

    componentWillReceiveProps() { // сброс состояния прелоадера для видео
        this.setState({isVideoLoaded: false})
    }

    render () {
        console.log(this.props);
        const launch=this.props.currentLaunch;
        return (
            <div>
                {
                    (!this.props.currentLaunch) ?
                    <div style={{height: '100vh'}}><Preloadsquare /></div> :
                    <div>
                        <Main name={launch.name} />
                        <div className="details">
                            <div className="container">
                                <div className="details-row">
                                    <div className="details-image">
                                        <img src={launch.links.patch.small} alt={launch.name} />
                                    </div>
                                    <div className="details-content">
                                        <p className="details-description">{launch.details}</p>
                                    </div>
                                </div>
                                <Preloadcircle hide={this.state.isVideoLoaded} />
                                <iframe 
                                    className={this.state.isVideoLoaded ? 'details-youtube' : 'video-display'} 
                                    width="560" 
                                    height="315" 
                                    src={`https://www.youtube.com/embed/${launch.links.youtube_id}`} 
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                                    allowFullScreen
                                    onLoad={()=>this.setState({isVideoLoaded: true})}>
                                </iframe>
                            </div>
                            <Link to={`/starts/page/${this.props.pagPage}`} className="button button-back">go back</Link>
                        </div>
                    </div>
                }
            </div>
        )
    }
};

export default Detailscalendar;