const assert = require('chai').assert;
const Translator = require('../components/translator.js');

suite('Unit Tests', () => {
    let translator = new Translator();
    const americanToBritish = translator.americanToBritishLocale();
    const britishToAmerican = translator.britishToAmericanLocale();

    // American to British
    test('Mangoes are my favorite fruit.', function () {
        assert.equal(translator.translate('Mangoes are my favorite fruit.', americanToBritish),
            'Mangoes are my <span class="highlight">favourite</span> fruit.');
    });
    test('I ate yogurt for breakfast.', function () {
        assert.equal(translator.translate('I ate yogurt for breakfast.', americanToBritish),
            'I ate <span class="highlight">yoghurt</span> for breakfast.');
    });
    test('We had a party at my friend\'s condo.', function () {
        assert.equal(translator.translate('We had a party at my friend\'s condo.', americanToBritish),
            'We had a party at my friend\'s <span class="highlight">flat</span>.');
    });
    test('Can you toss this in the trashcan for me?', function () {
        assert.equal(translator.translate('Can you toss this in the trashcan for me?', americanToBritish),
            'Can you toss this in the <span class="highlight">bin</span> for me?');
    });
    test('The parking lot was full.', function () {
        assert.equal(translator.translate('The parking lot was full.', americanToBritish),
            'The <span class="highlight">car park</span> was full.');
    });
    test('Like a high tech Rube Goldberg machine.', function () {
        assert.equal(translator.translate('Like a high tech Rube Goldberg machine.', americanToBritish),
            'Like a high tech <span class="highlight">Heath Robinson device</span>.');
    });
    test('To play hooky means to skip class or work.', function () {
        assert.equal(translator.translate('To play hooky means to skip class or work.', americanToBritish),
            'To <span class="highlight">bunk off</span> means to skip class or work.');
    });
    test('No Mr. Bond, I expect you to die.', function () {
        assert.equal(translator.translate('No Mr. Bond, I expect you to die.', americanToBritish),
            'No <span class="highlight">Mr</span> Bond, I expect you to die.');
    });
    test('Dr. Grosh will see you now.', function () {
        assert.equal(translator.translate('Dr. Grosh will see you now.', americanToBritish),
            '<span class="highlight">Dr</span> Grosh will see you now.');
    });
    test('Lunch is at 12:15 today.', function () {
        assert.equal(translator.translate('Lunch is at 12:15 today.', americanToBritish),
            'Lunch is at <span class="highlight">12.15</span> today.');
    });
    // British to American
    test('We watched the footie match for a while.', function () {
        assert.equal(translator.translate('We watched the footie match for a while.', britishToAmerican),
            'We watched the <span class="highlight">soccer</span> match for a while.');
    });
    test('Paracetamol takes up to an hour to work.', function () {
        assert.equal(translator.translate('Paracetamol takes up to an hour to work.', britishToAmerican),
            '<span class="highlight">Tylenol</span> takes up to an hour to work.');
    });
    test('First, caramelise the onions.', function () {
        assert.equal(translator.translate('First, caramelise the onions.', britishToAmerican),
            'First, <span class="highlight">caramelize</span> the onions.');
    });
    test('I spent the bank holiday at the funfair.', function () {
        assert.equal(translator.translate('I spent the bank holiday at the funfair.', britishToAmerican),
            'I spent the <span class="highlight">public holiday</span> at the <span class="highlight">carnival</span>.');
    });
    test('I had a bicky then went to the chippy.', function () {
        assert.equal(translator.translate('I had a bicky then went to the chippy.', britishToAmerican),
            'I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop</span>.');
    });
    test('I\'ve just got bits and bobs in my bum bag.', function () {
        assert.equal(translator.translate('I\'ve just got bits and bobs in my bum bag.', britishToAmerican),
            'I\'ve just got <span class="highlight">odds and ends</span> in my <span class="highlight">fanny pack</span>.');
    });
    test('The car boot sale at Boxted Airfield was called off.', function () {
        assert.equal(translator.translate('The car boot sale at Boxted Airfield was called off.', britishToAmerican),
            'The <span class="highlight">swap meet</span> at Boxted Airfield was called off.');
    });
    test('Have you met Mrs Kalyani?', function () {
        assert.equal(translator.translate('Have you met Mrs Kalyani?', britishToAmerican),
            'Have you met <span class="highlight">Mrs.</span> Kalyani?');
    });
    test('Prof Joyner of King\'s College, London.', function () {
        assert.equal(translator.translate('Prof Joyner of King\'s College, London.', britishToAmerican),
            '<span class="highlight">Prof.</span> Joyner of King\'s College, London.');
    });
    test('Tea time is usually around 4 or 4.30.', function () {
        assert.equal(translator.translate('Tea time is usually around 4 or 4.30.', britishToAmerican),
            'Tea time is usually around 4 or <span class="highlight">4:30</span>.');
    });

    // check for highlight (same to above, just for fCC tests)
    test('Mangoes are my favorite fruit.', function () {
        assert.equal(translator.translate('Mangoes are my favorite fruit.', americanToBritish),
            'Mangoes are my <span class="highlight">favourite</span> fruit.');
    });
    test('I ate yogurt for breakfast.', function () {
        assert.equal(translator.translate('I ate yogurt for breakfast.', americanToBritish),
            'I ate <span class="highlight">yoghurt</span> for breakfast.');
    });
    test('We watched the footie match for a while.', function () {
        assert.equal(translator.translate('We watched the footie match for a while.', britishToAmerican),
            'We watched the <span class="highlight">soccer</span> match for a while.');
    });
    test('Paracetamol takes up to an hour to work.', function () {
        assert.equal(translator.translate('Paracetamol takes up to an hour to work.', britishToAmerican),
            '<span class="highlight">Tylenol</span> takes up to an hour to work.');
    });
});
