import React from 'react'
import ElastosArchitecture from './elastos_architecture.png'
import '../../style.scss'
import I18N from '@/I18N'

export default class extends React.Component {

    render () {
        return (
            <div className="p_developerLearnDetail">
                <h3>{I18N.get('developer.learn.started.basics.title')}</h3>
                <p>{I18N.get('developer.learn.started.basics.part1')}</p>
                <p>{I18N.get('developer.learn.started.basics.part2')}</p>
                <p>{I18N.get('developer.learn.started.basics.part3')}</p>
                <br />
                <a href="https://www.elastos.org/wp-content/uploads/2018/White%20Papers/elastos_whitepaper_en.pdf?_t=1526235330" target="_blank">{I18N.get('developer.learn.started.basics.readwhitepaper')}</a>
                <br/>
                <a href="https://www.elastos.org/wp-content/uploads/2018/White Papers/elastos_sidechain_whitepaper_v0.3.0.8_EN.pdf?_t=1526918471" target="_blank">{I18N.get('developer.learn.started.basics.readchain')}</a>
                <br/>


                <img src={ElastosArchitecture} />
                <h3>{I18N.get('developer.learn.started.basics.brief')}</h3>
                <ul>
                    <li>
                        <strong>{I18N.get('developer.learn.started.basics.bitcoin.title')}</strong>{I18N.get('developer.learn.started.basics.bitcoin.text')}
                    </li>
                    <li>
                        <strong>{I18N.get('developer.learn.started.basics.ethereum.title')}</strong>{I18N.get('developer.learn.started.basics.ethereum.text')}
                    </li>
                    <li>
                        <strong>{I18N.get('developer.learn.started.basics.elastos.title')}</strong>{I18N.get('developer.learn.started.basics.elastos.text.part1')}
                        <ol>
                            <li>{I18N.get('developer.learn.started.basics.elastos.text.li1')}</li>
                            <li>{I18N.get('developer.learn.started.basics.elastos.text.li2')}</li>
                            <li>{I18N.get('developer.learn.started.basics.elastos.text.li3')}</li>
                            <li>{I18N.get('developer.learn.started.basics.elastos.text.li4')}</li>
                            <li>{I18N.get('developer.learn.started.basics.elastos.text.li5')}</li>
                        </ol>
                        <p>
                            {I18N.get('developer.learn.started.basics.elastos.text.part2')}
                        </p>
                        <p>
                            {I18N.get('developer.learn.started.basics.elastos.text.part3')}
                        </p>
                    </li>
                </ul>
                <h3>{I18N.get('developer.learn.started.basics.elastos.text.part4')}</h3>
                <p>
                    {I18N.get('developer.learn.started.basics.elastos.text.part5')}
                </p>
                <p>
                    {I18N.get('developer.learn.started.basics.elastos.text.part6')}
                </p>
            </div>
        )
    }
}
