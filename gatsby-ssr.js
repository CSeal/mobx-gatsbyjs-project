/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
*/

//import wrapWithProvider from './wrap-with-provider'
//export const wrapRootElement = wrapWithProvider

const React = require('react')
const { Provider, useStaticRendering } = require('mobx-react')
const  { renderToString } = require('react-dom/server')
const { default: RootStore } = require('./src/models/RootModel')

useStaticRendering(true);

exports.replaceRenderer = ({ bodyComponent, replaceBodyHTMLString }) => {
    const ProviderBody = () => (
        <Provider {...RootStore}>
                {bodyComponent}
        </Provider>
    );

    replaceBodyHTMLString(renderToString(<ProviderBody />));
};
