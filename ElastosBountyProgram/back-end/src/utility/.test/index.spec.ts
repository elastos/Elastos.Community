declare var describe, test, expect, require, process;

import {getEnv} from '../index';

describe('test utility/index', ()=>{
    test('NODE_ENV should be dev', ()=>{
        expect(getEnv()).toBe('dev');
    });
});
