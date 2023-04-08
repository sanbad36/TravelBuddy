import React, { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
    (function (d, m) {
      var kommunicateSettings = {
        appId: '1a8bbcf66035e56b7e6cd9f5570094d8d',
        popupWidget: true,
        automaticChatOpenOnNavigation: true
      };
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = 'https://widget.kommunicate.io/v2/kommunicate.app';
      var h = document.getElementsByTagName('head')[0];
      h.appendChild(s);
      window.kommunicate = m;
      m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
    /* NOTE : Use web server to view HTML files as real-time update will not work if you directly open the HTML file in the browser. */
  }, []);

  return <div></div>;
};

export default Chatbot;
