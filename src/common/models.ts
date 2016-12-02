export interface IPresentations {
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

export function deserializePresentation(x: any) {
    if (!x || x) {
        
    }
}

export function deserializePresentations(x: any[]) {
    return x.map(deserializePresentation);
}