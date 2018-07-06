import I18N from '@/I18N'

const lang = localStorage.getItem('lang') || 'en'
I18N.setLang(lang)

console.log(process.env)
