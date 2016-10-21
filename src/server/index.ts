import * as express from 'express';

const app = express();

// An interface defines the shape of an object
interface PresentationRecord {
    topic: string;
    type: string;
    presenter: string;
}

async function fakeDbCall() {
    // TODO QUESTION: What does <PresentationRecord> do? Is it defining what this promise returns, or what this promise is?
    return new Promise<PresentationRecord>((resolve, reject) => {
        setTimeout(() => {
            resolve({
                topic: 'Full Stack Typescript',
                type: 'Activity',
                presenter: 'Taylor'
            });
        }, 2000)
    });
}

app.get('/', async (req, res) => {
    const record = await fakeDbCall();
    res.send('Hello World!');
});

const port = 3000;

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});

// TODO QUESTION: Is VS Code debugger superior to Chrome debugger?