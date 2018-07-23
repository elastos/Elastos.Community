import BaseRedux from '@/model/BaseRedux'

class LanguageRedux extends BaseRedux {
    defineTypes () {
        return ['language']
    }

    defineDefaultState() {
        return {
            language: 'en'
        };
    }
}

export default new LanguageRedux()
