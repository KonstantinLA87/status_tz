import type * as TestFunctions from "../index";
import { Item } from '../types';

const { TreeStore } = jest.requireActual<typeof TestFunctions>("../index.ts")
const { items } = jest.requireActual<{ items: Item[] }>('../data');


const treeStore = new TreeStore(items);


describe("getAll()", () => {
    it("call", () => {
        expect(treeStore.getAll()).toBe(items);
    });
});

 
describe("getItem(id)", () => {
    it("call with ID = 2", () => {
        expect(treeStore.getItem(2)).toBe(items.find((item) => item.id == 2));
    });

    it("call with ID = 4", () => {
        expect(treeStore.getItem(4)).toBe(items.find((item) => item.id == 4));
    });

    it("call with not exist ID", () => {
        expect(treeStore.getItem(11)).toBeUndefined();
    });
});


describe("getChildren(id)", () => {
    const children4 = [
        { id: "7", parent: 4, type: null },
        { id: 8, parent: 4, type: null },
    ];

    const children2 = [
        { id: "4", parent: 2, type: "test" },
        { id: 5, parent: 2, type: "test" },
        { id: "6", parent: 2, type: "test" },
    ];

    it("call with ID = 4", () => {
        expect(treeStore.getChildren(4)).toEqual(children4);
    });

    it("call with ID = 5", () => {
        expect(treeStore.getChildren(5)).toStrictEqual([]);
    });

    it("call with ID = 2", () => {
        expect(treeStore.getChildren(2)).toEqual(children2);
    });
});


describe("getAllChildren(id)", () => {
    const children2 = [
        { id: "4", parent: 2, type: "test" },
        { id: 5, parent: 2, type: "test" },
        { id: "6", parent: 2, type: "test" },
        { id: "7", parent: 4, type: null },
        { id: 8, parent: 4, type: null },
        { id: "9", parent: 7, type: "test" },
        { id: 10, parent: 9, type: "test" },
    ];

    it("call with ID = 2", () => {
        expect(treeStore.getAllChildren(2)).toEqual(children2);
    });
});


describe("getAllParents(id)", () => {
    const children2 = [
        { id: "4", parent: 2, type: "test" },
        { id: 2, parent: 1, type: "test" },
        { id: 1, parent: "root" },
    ];

    it("call with ID = 7", () => {
        expect(treeStore.getAllParents(7)).toEqual(children2);
    });
});
