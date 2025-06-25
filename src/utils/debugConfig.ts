import Debug from 'debug';

Debug.enable('*,-router:route,-body-parser:json,-express:application,-router:layer,-queue');

export function createDebugger(name: string) {
    return Debug(name);
}