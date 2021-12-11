import $ from 'jquery';
import FRJSAppCore from './FRJS';

// Styles
import './src/styles/global.scss';

// Initialize JQuery as global variable in the browser
window.$ = $;

window.FRJSApp = new FRJSAppCore({
    pages: [{ 
        name: 'home', 
        title: 'FRJS Lab', 
        description: 'This is the first tests in my new framework!',
        template: 'home'
    }]
}).RenderPage('home');
