import './app.css';
import nyancat from './nyancat.jpg';

document.addEventListener('DOMContentLoaded', () => {
    document.body.innerHTML = `
    <img src="${nyancat}" />
    `
})

console.log(process.env.NODE_ENV) // "development"
console.log(TWO);
console.log(TW);
console.log(api.domain)
