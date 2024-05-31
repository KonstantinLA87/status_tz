

// module.exports = class TreeStore {
//     constructor(items) {
//         this.items = items

//         this.fastItems = {}
//         items.forEach(item => this.fastItems[item.id] = item)
//     }

//     getAll() {
//         return this.items
//     }

//     getItem(id) {
//         return this.fastItems[id]
//     }

//     // добавить для root
//     getChildren(id) {
//         return this.items.filter(item => item.parent == id)
//     }

//     getAllChildren(id) {
//         const children = [...this.items.filter(item => item.parent == id)]

//         for ( let child of children ) {
//             children.push(...this.getChildren(child.id))
//         } 

//         return children
//     }

//     getAllParents(id) {
//         const parents = []
//         let currentItem = this.fastItems[id];
        
//         while (currentItem.parent !== 'root') {
//             currentItem = this.fastItems[currentItem.parent]
//             parents.push(currentItem)
//         }

//         return parents
//     }
// }
