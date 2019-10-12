function template({ template }, opts, { imports, componentName, props, jsx, exports }) {
    const mTemplate = template.smart({ plugins: ["jsx"] });

    return mTemplate.ast`
    import m from 'mithril';
    
    export default class ${componentName} {
        view(vnode) {
            let props = vnode.attrs;
            return ${jsx};
        }
    }
    `
}

module.exports = template;