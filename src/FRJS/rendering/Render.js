export default async function Render(setup = {
    stringHTML: String(),
    node: document.createDocumentFragment(),
    selector: String(),
}) {
    
    let contentResult;
    
    if(setup.stringHTML) {
        const $node = $(setup.stringHTML);
        
        contentResult = await template({$node});
    } else if (setup.node) {
        contentResult = await template({$node: setup.node});
    }

    return contentResult
}

async function template({$node}){
    let content = [];

    for(let child of $node){
        let $templates = $(child).find('frjs-template');

        for(let template of $templates){
            const $template = $(template);
            const path = $template.attr('path');
            const templateFile = await import(`../../templates/${path}.html`);
            const templateNode = Render({stringHTML: templateFile.default});

            
            $template.html(templateNode);
        }

        content.push($node)
    }

    console.log($node)
    return content
}