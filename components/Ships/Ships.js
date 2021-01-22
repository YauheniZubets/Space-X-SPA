import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Main from '../Main/Main';
import Preloadsquare from '../Preloadsquare/Preloadsquare';

import './Ships.css';

const rocketImages={
	'Falcon 1': 'falcon-1',
	'Falcon 9': 'falcon-9',
	'Falcon Heavy': 'falcon-heavy',
	'Starship': 'starship'
}

class Ships extends React.PureComponent {

    static propTypes={
        rocket: PropTypes.object
    }

    render () {
        
        const {name, height, diameter, mass, payload_weights: payloadWeghts, description} = this.props.rocket;
        
        return (
            <div>
                {
                    (!this.props.rocket) ? 
                    <div><Preloadsquare /></div> :
                    <div>
                        <Main rocket={name} />
                        <section className="features">
                            <h2 className="features-title">
                                {name} <br/>Описание
                            </h2>
                            <div className="overview">
                                <table className="table">
                                    <caption className="table-title">
                                        Параметры
                                    </caption>
                                    <thead>
                                        <tr>
                                            <td className="table-column">ВЫСОТА</td>
                                            <td className="table-column">{height.meters} m / {height.feet} ft</td>
                                        </tr>
                                        <tr>
                                            <td className="table-column">ДИАМЕТР</td>
                                            <td className="table-column">{diameter.meters} m / {diameter.feet} ft</td>
                                        </tr>
                                        <tr>
                                            <td className="table-column">МАССА</td>
                                            <td className="table-column">{mass.kg} kg / {mass.lb} lb</td>
                                        </tr>
                                        {payloadWeghts.map((item)=>(
                                            <tr key={item.id}>
                                                <td className="table-column">Полезная загрузка к {item.id.toUpperCase()}</td>
                                                <td className="table-column">{item.kg} kg / {item.lb} lb</td>
                                            </tr>
                                        ))}
                                        
                                    </thead>
                                </table>
                                <div>
                                <img
                                    src={`/public/img/${rocketImages[name]}.png`}
                                    alt="rocket"
                                    className="Ships-rocket"
                                />	
                                </div>
                                <article>
                                    <h3 className="features-subtitle">DESCRIPTION</h3>
                                    <p className="features-text">
                                        {description}
                                    </p>
                                </article>
                            </div>
                        </section>
                    </div>
                }
            </div>
        )
    }
}

export default Ships;