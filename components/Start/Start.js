import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Preloadcircle from '../Preloadcircle/Preloadcircle';

import './Start.css';

class Start extends React.PureComponent {

    static propTypes = {
    }

    state={
        opacity : 0, //прозрачность
        startLogo: true, //показать логотип space-x
        mainPreloader: false // проверяем загрузилось ли видео, если загружено прелоадер удаляется

    }

    changeOpacity = () => { //прозрачность div
        let timer=setTimeout(()=>{
            this.setState({opacity:1});
            (this.state.opacity>=1 && clearTimeout(timer));
            let timeOutdiv=setTimeout(()=>this.setState({startLogo: false}), 2500);
            (!this.state.startLogo && clearTimeout(timeOutdiv));//убираем див
        }, 1000);
    }

    cbHidePreloader = () => {
        console.log('hide');
        this.setState({mainPreloader: true});
    }

    componentDidMount(){
        this.changeOpacity();
    }

    componentWillReceiveProps() { // сброс состояния прелоадера для image
        this.setState({isVideoLoaded: false})
    }

    render () {
        return (
            <main>
                {
                    (this.state.startLogo) && 
                    <div className='Start'>
                        <div style={{opacity: this.state.opacity, backgroundColor: 'black', height: 'inherit', transition: '2.5s linear', transitionProperty: 'opacity'}}></div>
                    </div>
                }
                {
                    (!this.state.startLogo) &&
                    <div className='Start-Earth'>
                        <Preloadcircle hide={this.state.mainPreloader} />
                        <img 
                            src='/public/earth.gif'
                            onLoad={this.cbHidePreloader}
                            className={this.state.mainPreloader ? '' : 'Start-video-display-none'}
                        />
                    </div>
                }
            </main>
            
            
        );
    }
};

export default Start;