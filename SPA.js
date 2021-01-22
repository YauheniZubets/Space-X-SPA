import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';


import Header from './components/Header/Header';
import Start from './components/Start/Start';
import Ships from './components/Ships/Ships';
import Footer from './components/Footer/Footer';
import Calendar from './components/Calendar/Calendar';
import Detailscalendar from './components/Detailscalendar/Detailscalendar';

import FetchData from './components/fetchData';
import combinedReducer from './components/redux/reducers.js';

import './style.css';

let store=createStore(combinedReducer);

class SPA extends React.PureComponent {

    static propTypes = {

    }

    state = {
        showHeaderComponent: false,
        rockets: null, //список ракет из апи
        currentRocket: null, //текущая ракета для отображения
        company: null, //информации о компании
        launches: null, //игформация о стартах
        currentLaunch: null, //текущий старт
        calendarPage: 1 //default page для календаря
    }

    fetchData=new FetchData();
    
    componentDidMount () {
        this.getRocket(); //загружаем список ракет)
        this.getCompany(); //информация о компании
        this.getLaunches(); //список стартов
    }

    getRocket = () => { 
        this.fetchData.loadDataRocket()
            .then(data=>{
                this.setState({rockets:data});
                return data[0];
            })
            .then(data=>this.setState({currentRocket: data}));
    }

    getCompany = () => { 
        this.fetchData.loadDataCompany()
            .then(data=>{
                this.setState({company: data});
                return data;
            })
    }

    getLaunches = () => { 
        this.fetchData.loadDataLaunches()
            .then(data=>{
                this.setState({launches: data});
                return data;
            })
    }

    findCurrentLaunch = (launch) => {
        let currentLaunch=this.state.launches.find(item=>item.id===launch);
        this.setState({currentLaunch:currentLaunch})
        return currentLaunch;
    }

    changeRocket = (rocket) => { //поменять ракету по клику из меню
        this.setState({currentRocket: this.state.rockets[rocket]});
    }

    setPage = (page) => { //для роутинга пагинации в календаре
        console.log('page: ', page);
        this.setState({calendarPage:+page});
    }

    render () {
        //console.log(this.state.calendarPage);
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div>
                        <Header rockets={this.state.rockets} changeRocket={this.changeRocket} />
                        

                        <Route exact path='/' render={()=><Start />}/>
                        <Route path='/ships' render={()=> this.state.currentRocket && 
                            <Ships rocket={this.state.currentRocket} />}/>
                        <Route exact path='/starts/page/:page' render={()=>(
                             <Calendar 
                                launches={this.state.launches} 
                                currentLaunch={this.findCurrentLaunch} 
                                currentP={this.state.calendarPage}
                                pag={this.setPage}    
                            />
                            )} 
                        />
                        <Route exact path='/starts/:id' component={()=><Detailscalendar currentLaunch={this.state.currentLaunch} pagPage={this.state.calendarPage} />} />

                        {this.state.company && <Footer company={this.state.company} />}
                    </div>
                </BrowserRouter>
            </Provider>
        )
    }
};

export default SPA;