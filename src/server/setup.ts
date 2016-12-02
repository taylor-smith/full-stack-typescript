import uuid from 'node-uuid';
import Chance from 'chance';
import loremIpsum from 'lorem-ipsum';
import Sql from './sql';

const chance = new Chance();
const NUM_PRESENTATIONS = 100;
const NUM_PRESENTERS = 50;

const getRandomPresenterIds = (n: number) => {
    const result: string[] = [];
    for (let i=0; i<n; i++) {
        result.push(uuid.v4());
    }
    return result;
};

const getRandomTopics = (n: number) => {
    const result: string[] = [];
    for (let i=0; i<n; i++) {
        result.push(loremIpsum({
            count: chance.integer({ min: 1, max: 6 }),
            units: 'words'
        }));
    }
    return result;
};

async function setup() {
    console.log('Creating database...');
    const sql = new Sql();
    await sql.open(true, true);
    await sql.run('CREATE TABLE presentations (id, topic, type, presenters, length, votes)');
    await sql.run('CREATE TABLE presenters (id, name)');
    await sql.run('BEGIN TRANSACTION');
    try {
        const presenterIds = getRandomPresenterIds(NUM_PRESENTERS);
        for (let id of presenterIds) {
            sql.run('INSERT INTO presenters VALUES ($id, $name)', {
                $id: id,
                $name: chance.name()
            });
        }
        for (let i = 0; i < NUM_PRESENTATIONS; i++) {
            sql.run('INSERT INTO presentations VALUES ($id, $topic, $type, $presenters, $length, $votes)', {
                $id: uuid.v4(),
                $topic: loremIpsum({
                    count: chance.integer({ min: 1, max: 6 }),
                    units: 'words'
                }),
                $type: chance.pickone(['Presentation', 'Activity', 'Discussion', 'Presentation/Activity']),
                $presenters: JSON.stringify(chance.pickset(presenterIds, chance.integer({min: 1, max: 3}))),
                $length: chance.pickone([30, 45, 60]), 
                $votes: chance.integer({min: 0, max: 30})

            })
        }
        await sql.run('COMMIT');
    } catch (err) {
        await sql.run('ROLLBACK');
    }
    sql.close();
}

try {
    setup();
} catch (err) {
    console.log(err)
}