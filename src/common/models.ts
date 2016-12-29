import * as utils from './utils';

export interface IPresentation {
    id: string,
    topic: string,
    type: 'Presentation' | 'Activity' | 'Discussion' | 'Presentation/Activity',
    presenters: string[],
    length: number,
    votes: number
}

export interface IPresenter {
    id: string,
    name: string
}

const MIN_TOPIC_LENGTH = 0;
const MAX_TOPIC_LENGTH = 100;
const PRESENTATION_TYPES = ['Presentation', 'Activity', 'Discussion', 'Presentation/Activity'];


// DESERIALIZED OBJECT: Object for storage in memory
export function deserializePresentation(x: any): IPresentation {
    if (!utils.isObject(x)) { throw 'Presentation is not an object'; }
    if (!utils.isUuid(x.id)) { throw 'Id is not a UUID'; }
    if (!utils.isString(x.topic)) { throw 'Topic is not a string'; }
    if (x.topic.length < MIN_TOPIC_LENGTH || x.topic.length > MAX_TOPIC_LENGTH) { throw 'Topic is invalid'; }
    if (PRESENTATION_TYPES.indexOf(x.type) === -1) { throw 'Topic type is invalid'; }
    x.presenters = JSON.parse(x.presenters);
    if (!utils.isUuidArray(x.presenters)) { throw 'presenters is not a UUID array'; }
    if (!utils.isNonNegativeInteger(x.length)) { throw 'Length is a non-negative number'; }
    if (!utils.isNonNegativeInteger(x.votes) ) { throw 'Votes is not a non-negative integer'; }
    return x as IPresentation;
}

export function deserializePresentations(x: any[]) {
    return x.map(deserializePresentation);
}


// SERIALIZED OBJECT: Object for DB storage or transfer
export function serializePresentations(presentations: IPresentation[]) {
    return presentations;
}

export function serializePresentation(presentation: IPresentation) {
    return presentation;
}

export function deserializePresenter(x: any): IPresenter {
    if (!utils.isObject(x)) { throw 'Presenter is not an object'; }
    if (!utils.isUuid(x.id)) { throw 'Id is not a UUID'; }
    if (!utils.isString(x.name)) { throw 'name is not a string'; }
    return x as IPresenter;
}

export function deserializePresenters(x: any[]) {
    return x.map(deserializePresenter);
}


// SERIALIZED OBJECT: Object for DB storage or transfer
export function serializePresenters(presenters: IPresenter[]) {
    return presenters;
}

export function serializePresenter(presenter: IPresenter) {
    return presenter;
}