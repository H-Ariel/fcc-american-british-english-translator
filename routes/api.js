'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {

  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const { text, locale } = req.body;

      if (text == undefined || locale == undefined)
        return res.json({ error: 'Required field(s) missing' });
      if (text.length == 0)
        return res.json({ error: 'No text to translate' });
      if (locale != translator.americanToBritishLocale() && locale != translator.britishToAmericanLocale())
        return res.json({ error: 'Invalid value for locale field' });

      let translation = translator.translate(text, locale);
      if (translation == text)
        translation = 'Everything looks good to me!';

      res.json({ text, translation });
    });
};
