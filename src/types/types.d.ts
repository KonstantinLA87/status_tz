export type Id = string | number;

export type Type = string | null;

export interface Item {
    id: Id,
    parent: number | 'root',
    type?: Type,
}