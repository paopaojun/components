import i18n from "./i18n.json";
const genText = (fnText, arg) => {
  if (!fnText) {
    return ''
  } else if (typeof fnText === 'function') {
    return fnText(arg)
  } else {
    return fnText
  }
}

export const genAttr = (x, scope) => {
  const genList = ['class', 'style', 'disabled']
  const attrs = {}
  genList.forEach(y => {
    x[y] && (attrs[y] = genText(x[y], scope.row))
  })
  if (x.icon) {
    attrs[icon] = x.icon
  }
  return attrs
}

export const locz = key => {
  const lang = window.navigator.language;
  let locList = {}
  if (/zh/ig.test(lang)) {
    locList = i18n['zh']
  } else if (/en/ig.test(lang)) {
    // add your language
    locList = i18n['en']
  } else {
    locList = i18n['en']
  }
  return locList[key]
}

// Lodash
const Lodash = {};
const LodashList = ['get', 'has', 'last', 'pick', 'omit', 'omitBy', 'padStart']
LodashList.forEach(x => Lodash[ x] = require('lodash/' + x + '.js'))
export const _ = Lodash;