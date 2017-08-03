// MODULES
const express = require('express');
const r = require('./routes/v1');

// DEFINITIONS
const app = express();
app.set('view engine', 'ejs');

// ROUTES
app.get('/', (req, res) => {
    res.end();
});

app.get('/sample/:name', (req, res) => {
    const params = {
        client: 'SKY',
        customerId: '123',
        customerName: 'Victor Augusto',
        fields: [
            { title: 'Nome do atendente responsável', type: 'text', name: 'complaint-responsible' },
            { title: 'Dia do atendimento', type: 'text', name: 'contact-date' },
            { title: 'Nível da reclamação', type: 'select', name: 'complaint-level', options: [ { title: 'Nível 1', value: '1' }, { title: 'Nível 2', value: '2' }, { title: 'Nível 3', value: '3' } ] },
            { title: 'Comente o atendimento', type: 'textarea', name: 'statement' },
        ]
    };
    res.render('sample', { params });
})

// SERVER
app.listen(3000, () => {
    console.log('Running on port 3000');
});