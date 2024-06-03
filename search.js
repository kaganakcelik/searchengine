import FuzzySearch from 'fuzzy-search';
import data from './data.json' with { type: "json" };


const people = [{
  name: {
    firstName: 'Jesse',
    lastName: 'Bowen',
  },
  state: 'Seattle',
}];

// const data = [
//     {
//         site: 'orangutantype.com',
//         data: [
//         'not signed in', 'orangutantype', ' | ',
//         'words:',        'u',             's',
//         ' ',             'd',             'o',
//         ' ',             's',             'a',
//         'm',             'e',             ' ',
//         'l',             'e',             'a',
//         'r',             'n',             ' ',
//         'n',             'o',             ' ',
//         'f',             'a',             'r',
//         'm',             ' ',             'f',
//         'o',             'u',             'r',
//         ' ',             'y',             'o',
//         'u',             'r',             ' ',
//         'i',             'f',             ' ',
//         'w',             'e',             'n',
//         't',             ' '
//         ]
//     },
//     {
//         site: 'easycps.netlify.app',
//         data: [
//         'vvvvvvvv cps test vvvvvvvv',
//         'click here',
//         'timer: 5',
//         'made by kagan akcelik'
//         ]
//     }
// ]
 

const searcher = new FuzzySearch(data, ['data'], {
    caseSensitive: true,
});
  
const result = searcher.search(process.argv[2]);

if (result.length === 0) console.log('nothing found')
else {
    console.log(result.map(r => r.site))
}

