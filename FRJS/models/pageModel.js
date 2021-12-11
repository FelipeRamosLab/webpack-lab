export default class PageModel {
    constructor(setup = {
        name: '',
        title: '',
        description: '',
        mutables: {},
        template: '',
        statics: {}
    }) {
        this.name = setup.name;
        this.title = setup.title;
        this.description = setup.description;
        this.mutables = setup.mutables || {};
        this.statics = setup.statics || {};
        this.template = setup.template;
    }
}
