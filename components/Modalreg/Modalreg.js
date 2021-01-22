import React from 'react';
import PropTypes from 'prop-types';

import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';

import {namePlace_create, namePlace_add} from '../redux/userAC';
import {getAge} from './modules/getUserAge';

import './Modalreg.css';

class Modalreg extends React.PureComponent {

    static propTypes = {

    }

    state = {
        nameValue: '',
        surnameValue: '',
        age: null
    }

    componentWillMount() {
        // создадим
        this.props.dispatch( namePlace_create() );
      }

    cbChangeInput = (EO) => {
        let nameStr=EO.target.value;
        this.setState({nameValue: nameStr});
    }

    cbChangeInputSurn = (EO) => {
        let nameStr=EO.target.value;
        this.setState({surnameValue: nameStr});
    }

    cbChangeInputAge = (EO) => {
        let date=new Date(EO.target.value);
        console.log('date: ', date);
        let calculatedAge=getAge(date);
        // let curDate=new Date().getTime();
        // let age=((curDate-date) / (24*3600*365.25*1000)) | 0;
        this.setState({age: calculatedAge});
    }

    cbClose = (EO) => { //валидация инпут
        let nameVal=this.state.nameValue;
        let surnameVal=this.state.surnameValue;
        let age=this.state.age;
        let currentElem=EO.target;
        if (currentElem.tagName==='A' && this.state.nameValue!=='' && this.state.surnameValue!=='') this.props.close();
        if (this.state.nameValue!=='' && this.state.surnameValue!=='') this.props.dispatch(namePlace_add(nameVal, surnameVal, age));
    }

    render () {

        return (
            <div className='Header-regstrmodal'>
                <div className='Header-reginfo'>
                    <div className='Header-label'><span>Ваше имя</span></div>
                    <input 
                        type="text" 
                        value={this.state.nameValue} 
                        placeholder="Имя" 
                        className='Header-reginput'
                        onChange={this.cbChangeInput} 
                    />
                    <input 
                        type="text" 
                        value={this.state.surnameValue} 
                        placeholder="Фамилия" 
                        className='Header-reginput'
                        onChange={this.cbChangeInputSurn} 
                    />
                    <input 
                        type="date" 
                        onChange={this.cbChangeInputAge}
                    />
                    {
                        (this.state.nameValue==='') && <span>Заполните все поля</span>
                    }
                    <a className='bot5' onClick={this.cbClose}>
                        OK
                    </a>
                </div>
            </div>
        )
    }
};

const mapStateToProps = function (state) {
    // этому компоненту ничего не нужно из хранилища Redux
    return { }; 
};
  
// но этому компоненту нужен сам this.props.dispatch, и чтобы
// он появился, следует присоединить (connect) компонент к хранилищу Redux
  
export default connect(mapStateToProps)(Modalreg);