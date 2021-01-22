import React from 'react';
import PropTypes from 'prop-types';

import Preloadsquare from '../Preloadsquare/Preloadsquare';

import './footer.css';

class Footer extends React.PureComponent {

    static propTypes = {
        company: PropTypes.object
    }

    render () {
        const {links:{elon_twitter: elonMask, flickr, twitter, website}, summary}=this.props.company;

        return  (
            <footer className="footer">
            {
                (!this.props.company) ? 
                <div></div> :
                <footer className="footer">
                    <img src='/public/logo-small.svg' alt="logo Space X" className="logo"/>
                    <nav className="footer-nav">
                        <ul className="list">
                            <li className="item">
                                <a href={elonMask} rel="noopener noreferrer" target='_blank' className="item-link">Elon Musk Twitter</a>
                            </li>
                            <li className="item">
                                <a href={twitter} rel="noopener noreferrer" target='_blank' className="item-link">Twitter</a>
                            </li>
                            <li className="item">
                                <a href={flickr} rel="noopener noreferrer" target='_blank' className="item-link">Flickr</a>
                            </li>
                            <li className="item">
                                <a href={website} rel="noopener noreferrer" target='_blank' className="item-link">Website</a>
                            </li>
                        </ul>
                    </nav>
                    <p className="footer-text">
                        {summary}
                        <a className="footer-link" href="mailto:rideshare@spacex.com"
                        >rideshare@spacex.com</a>
                    </p>
                </footer>
            }
            </footer>
        )
    }
};

export default Footer;