import React from 'react';
import BaseComponent from './BaseComponent';
import {spring, Motion} from 'react-motion';
import _ from 'lodash';

/**
    noWobble: {stiffness: 170, damping: 26}, // the default, if nothing provided
    gentle: {stiffness: 120, damping: 14},
    wobbly: {stiffness: 180, damping: 12},
    stiff: {stiffness: 210, damping: 20},
 */
const springConfig = {stiffness: 180, damping: 14};

export default class extends BaseComponent {
    ord_render(p){
        const s = this.ord_animate();
        const defaultStyle = {};
        _.each(s.from, (v, i)=>{
            defaultStyle[`value_${i}`] = v;
        });
        const toStyle = {};
        _.each(s.to, (v, i)=>{
            toStyle[`value_${i}`] = spring(v, springConfig);
        });

        const mp = {
            defaultStyle,
            style : toStyle
        };

        return (
            <Motion {...mp}>
                {
                    (tar)=>{
                        return (<div style={s.style_fn(_.values(tar))}>{this.ord_renderPage(p)}</div>);
                    }
                }
            </Motion>
        );
    }

    ord_animate(){
        return {
            from : [0, 50],
            to : [1, 0],
            style_fn : (values)=>{
                return {
                    position: 'relative',
                    opacity: values[0],
                    left: values[1]
                };
            }
        };
    }

    ord_renderPage(){
        return null;
    }
}