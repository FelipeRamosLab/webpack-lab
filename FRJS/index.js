import {loadComponents} from './core/index';

// Models
import PageModel from './models/pageModel';

// Configurations
import FRJSConfig from '../FRJS-config.json';

export default class FRJS {
    constructor(setup = {
        globals: [],
        pages: [PageModel.prototype],
    }){
        this.staticGlobals = {};
        this.mutableGlobals = {};
        this.pages = [];

        setup.pages.map(page=>{
            this.pages.push(new PageModel(page));
        });
    }

    async RenderPage(page){
        if (!this.pages.find(res=>res.name === page)) throw new Error(`The page provided "${page}" doesn't exist!`);

        const pageData = this.pages.find(res=>res.name === page);

        try {
            const html = await import(`../${FRJSConfig.paths.pages}/${pageData.template}.html`);
            const htmlString = html.default;
            const result = `<div id="frjs-root">${htmlString}</div>`;
            
            $('body').html(await loadComponents(result));
            return htmlString;
        } catch(err){
            console.error('An error occurs during the RenderPage process!', err);
        }

    }
}
