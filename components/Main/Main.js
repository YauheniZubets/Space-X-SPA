import React from 'react';
import PropTypes from 'prop-types';

import Preloadcircle from '../Preloadcircle/Preloadcircle';

import './Main.css';

class Main extends React.PureComponent {

    static propTypes = {
        rocket: PropTypes.string
    }

    state = {
        isVideoLoaded: false // проверяем загрузилось ли видео, если загружено прелоадер удаляется
    }

    video={
        'Falcon 1': 'moon',
        'Falcon 9': 'earth',
        'Falcon Heavy': 'mars',
        other: 'space'
    }

    componentWillReceiveProps() { // сброс состояния прелоадера для видео
        this.setState({isVideoLoaded: false})
    }

    render () {
        
        return (
            <section className="main">
                <h1 className="title">
                    {this.props.rocket || this.props.name}
                </h1>
                {
                    this.props.rocket && 
                    <div className="video-container">
                        <Preloadcircle hide={this.state.isVideoLoaded} />
                        <video 
                            className={this.state.isVideoLoaded ? 'video' : 'video-display'}
                            autoPlay loop muted 
                            onLoadedData={()=>this.setState({isVideoLoaded: true})}
                            src={`/public/video/${this.video.hasOwnProperty(this.props.rocket)?
                                this.video[this.props.rocket] : this.video.other}.mp4`} 
                        />
                    </div>
                }
            </section>
        )
    }
};

export default Main;