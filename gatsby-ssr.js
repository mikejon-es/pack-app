const React = require("react");

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <meta 
      key="viewport"
      name="viewport" 
      content="width=device-width, initial-scale=1.0, viewport-fit=cover" 
    />,
    <meta 
      key="apple-mobile-web-app-capable"
      name="apple-mobile-web-app-capable" 
      content="yes" 
    />,
    <meta 
      key="apple-mobile-web-app-status-bar-style"
      name="apple-mobile-web-app-status-bar-style" 
      content="black-translucent" 
    />
  ]);
};