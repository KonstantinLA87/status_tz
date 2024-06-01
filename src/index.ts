import { Item, Id } from './types/types';

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
        
        while (currentItem.parent !== 'root') {
            currentItem = this.fastItems[currentItem.parent]
            parents.push(currentItem)
        }

        return parents
    }
}