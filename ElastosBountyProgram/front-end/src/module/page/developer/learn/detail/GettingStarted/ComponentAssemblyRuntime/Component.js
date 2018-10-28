import React from 'react'
import I18N from '@/I18N'
import '../../style.scss';

export default class extends React.Component {

    render () {
        return (
            <div className="p_developerLearnDetail">
                <h3>{I18N.get('developer.learn.started.assembly.title')}</h3>
                <p>{I18N.get('developer.learn.started.assembly.part1')}</p>
                <p>
                    {I18N.get('developer.learn.started.assembly.part2')}
                </p>
                <p>
                    {I18N.get('developer.learn.started.assembly.part3')}
                </p>
                <p>
                    {I18N.get('developer.learn.started.assembly.part4')}
                </p>
                <p>
                    {I18N.get('developer.learn.started.assembly.part5')}
                </p>
                <h3>{I18N.get('developer.learn.started.assembly.part6')}</h3>
                <p>{I18N.get('developer.learn.started.assembly.part7')}</p>
                <a href="https://github.com/elastos/Elastos.RT/blob/master/Docs/CAR_Language.md" target="_blank">{I18N.get('developer.learn.started.assembly.source')}</a>
                <h3>{I18N.get('developer.learn.started.assembly.part8')}</h3>
                <p>{I18N.get('developer.learn.started.assembly.part9')}</p>
                <a href="https://github.com/elastos/Elastos.RT/blob/master/Docs/How_To_Write_A_Car_Component.md" target="_blank">{I18N.get('developer.learn.started.assembly.source')}</a>
            </div>
        )
    }
}
