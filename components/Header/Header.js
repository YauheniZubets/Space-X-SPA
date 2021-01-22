import React from 'react';
import PropTypes from 'prop-types';
import {Link, NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

import Modalreg from '../Modalreg/Modalreg';

import './Header.css';

class Header extends React.PureComponent {

    static propTypes = {
        rockets: PropTypes.array,
        userInfo: PropTypes.object //из Redux
    }

    state = {
        showReg: null,
        showMobileMenu: false
    }

    cbChangeRocket = (EO) => {
        let currentIndex=EO.target.getAttribute('index');
        this.props.changeRocket(currentIndex);
    }

    cbShowRegModal = (EO) => {
        if (EO.target.tagName=='LI') this.setState({showReg: true});
    }

    cbShowRegModalAgain = (EO) => {
        console.log('EO: ', EO.target);
        if (EO.target.tagName=='A') this.setState({showReg: true});
    }

    cbCloseModall = (EO) => {
        console.log('EO: ', EO);
        this.setState({showReg: false});
    }

    cbShowMobileMenu = () => {
        this.state.showMobileMenu 
        ? this.setState({showMobileMenu: false})
        : this.setState({showMobileMenu: true});
    }

    render () {
        //console.log(this.props);
        return (
            <header className='Header'>
                <div className='Header-Logo'>
                    <img src='/public/logo-small.svg'/>
                </div>
                <nav className='Header-Menu'>
                    <ul className="list">
                        <li className="item">
                            <NavLink exact to="/" 
                            className="item-link"
                            >Главная</NavLink>
                        </li>
                        <li className="item">
                            <NavLink to="/ships" 
                            className="item-link"
                            >Корабли</NavLink>
                            <ul>
                                {this.props.rockets && this.props.rockets.map((item, index)=>
                                        <li key={index}>
                                            <NavLink to={`/ships`} 
                                                className="link-ship"
                                                onClick={this.cbChangeRocket}
                                                index={index}
                                            >{item.name}</NavLink>
                                        </li>
                                )}
                            </ul>
                        </li>
                        <li className="item">
                            <NavLink to={`/starts/page/1`} 
                            className="item-link"
                            >Старты</NavLink>
                        </li>
                        <li className='item-name cursor' onClick={this.cbShowRegModal}>
                            { (this.props.userInfo.userName.name) 
                                ?   <div>
                                        <span>{this.props.userInfo.userName.name}   </span>
                                        <span>{this.props.userInfo.userName.surname}   </span>
                                        <span>Возраст: {this.props.userInfo.userName.age}</span>
                                    </div>
                                : 'Вход / регистрация'
                            }
                            {
                                (this.state.showReg) &&
                                <Modalreg  close={this.cbCloseModall}  />
                            }
                        </li>
                    </ul>
                </nav>
                <div className='Mobilemenu'>
                    <div className="menumobile">
                        <a className="menumobile-triger" href="#" onClick={this.cbShowMobileMenu}></a>
                        <div className={this.state.showMobileMenu ? 'menumobile-popup' : 'menumobile-popup-none'}>
                            <a className="menumobile-close" href="#" onClick={this.cbShowMobileMenu}></a>
                            <ul>
                                <li onClick={this.cbShowMobileMenu}>
                                    <NavLink exact to="/" 
                                    className="item-link"
                                    >Главная</NavLink>
                                </li>
                                <li onClick={this.cbShowMobileMenu}>
                                    <NavLink to="/ships" 
                                    className="item-link"
                                    >Корабли</NavLink>
                                    <ul className='Header-mobilemenu-ships'>
                                        {this.props.rockets && this.props.rockets.map((item, index)=>
                                                <li key={index} onClick={this.cbShowMobileMenu}>
                                                    <NavLink to={`/ships`} 
                                                        className="link-ship"
                                                        onClick={this.cbChangeRocket}
                                                        index={index}
                                                    >{item.name}</NavLink>
                                                </li>
                                        )}
                                    </ul>
                                </li>		
                                <li onClick={this.cbShowMobileMenu}>
                                    <NavLink to={`/starts/page/${1}`} 
                                    className="item-link"
                                    >Старты</NavLink>
                                </li>
                                <li onClick={this.cbShowRegModal} className='cursor Header-mobilemenu-modal'>
                                    { (this.props.userInfo.userName.name) 
                                        ?   <div>
                                                <span>{this.props.userInfo.userName.name}  </span>
                                                <span>{this.props.userInfo.userName.surname}  </span>
                                                <span>Возраст: {this.props.userInfo.userName.age}</span>
                                            </div>
                                        : 'Вход / регистрация'
                                    }
                                    {
                                        (this.state.showReg) &&
                                        <Modalreg  close={this.cbCloseModall} />
                                    }       
                                </li>
                            </ul>						
                        </div>
                    </div>
                </div>
                
            </header>
        )
    }
};

const mapStateToProps = function (state) {
    return {
      // весь раздел Redux state под именем userInfo будет доступен
      // данному компоненту как this.props.userInfo
      userInfo: state.userInfo,
    };
  };

export default connect(mapStateToProps)(Header);