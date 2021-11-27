import $ from 'jquery';
import {Render} from './FRJS';
import axios from 'axios';

// Styles
import './styles/global.scss';

import Home from './pages/home.html';

// Declare JQuery as global
window.$ = $;
window.axios = axios;

async function Main(){
    const $FRJS = $('<div id="__FRJS"></div>');
    const HomePage = await Render({stringHTML: Home});

    $FRJS.empty();
    $FRJS.html(HomePage);
    $('body').append($FRJS);
}

Main();
