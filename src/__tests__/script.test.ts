// TYPES
export type Id = string | number;

export type Type = string | null;

export interface Item {
    id: Id,
    parent: number | 'root',
    type?: Type,
}


// DATA
export const items: Item[] = [
    {
        id: 1,
        parent: "root",
    },
    {
        id: 2,
        parent: 1,
        type: "test",
    },
    {
        id: "7",
        parent: 4,
        type: null,
    },
    {
        id: 8,
        parent: 4,
        type: null,
    },
    {
        id: 3,
        parent: 1,
        type: "test",
    },

    {
        id: '4',
        parent: 2,
        type: "test",
    },
    {
        id: 5,
        parent: 2,
        type: "test",
    },
    {
        id: '6',
        parent: 2,
        type: "test",
    },
    {
        id: '9',
        parent: 7,
        type: "test",
    },
    {
        id: 10,
        parent: 9,
        type: "test",
    },
];


// CLASS
export class TreeStore {
    private items: Item[];
    private fastItems: {[key: string]: Item}

    constructor(items: Item[]) {
        this.items = items

        this.fastItems = {}
        items.forEach(item => this.fastItems[item.id] = item)
    }

    getAll() {
        return this.items
    }

    getItem(id: Id) {
        return this.fastItems[id]
    }

    // добавить для root
    getChildren(id: Id) {
        return this.items.filter(item => item.parent == id)
    }

    getAllChildren(id: Id) {
        const children = [...this.items.filter(item => item.parent == id)]

        for ( let child of children ) {
            children.push(...this.getChildren(child.id))
        } 

        return children
    }

    getAllParents(id: Id) {
        const parents = []
        let currentItem = this.fastItems[id];
        
        while (currentItem && currentItem.parent !== 'root') {
            currentItem = this.fastItems[currentItem.parent]
            parents.push(currentItem)
        }

        return parents
    }
}



// TEST
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
    const children4: Item[] = [
        { id: '7', parent: 4, type: null },
        { id: 8, parent: 4, type: null }
    ];

    const children2: Item[] = [
        { id: "4", parent: 2, type: "test" },
        { id: 5, parent: 2, type: "test" },
        { id: "6", parent: 2, type: "test" },
    ];

    it("call with ID = 4", () => {
        expect(treeStore.getChildren(4)).toStrictEqual(children4);
    });

    it("call with ID = 5", () => {
        expect(treeStore.getChildren(5)).toStrictEqual([]);
    });

    it("call with ID = 2", () => {
        expect(treeStore.getChildren(2)).toStrictEqual(children2);
    });
});


describe("getAllChildren(id)", () => {
    const children2: Item[] = [
        { id: "4", parent: 2, type: "test" },
        { id: 5, parent: 2, type: "test" },
        { id: "6", parent: 2, type: "test" },
        { id: "7", parent: 4, type: null },
        { id: 8, parent: 4, type: null },
        { id: "9", parent: 7, type: "test" },
        { id: 10, parent: 9, type: "test" },
    ];

    it("call with ID = 2", () => {
        expect(treeStore.getAllChildren(2)).toStrictEqual(children2);
    });
});


describe("getAllParents(id)", () => {
    const children2: Item[] = [
        { id: "4", parent: 2, type: "test" },
        { id: 2, parent: 1, type: "test" },
        { id: 1, parent: "root" },
    ];

    it("call with ID = 7", () => {
        expect(treeStore.getAllParents(7)).toStrictEqual(children2);
    });
});
