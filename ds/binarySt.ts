class BinaryTreeNode {
    data: any = null
    leftNode: BinaryTreeNode | null = null
    rightNode: BinaryTreeNode | null = null

    constructor(value: any) {
        this.data = value
    }
}

class BST {
    root: BinaryTreeNode | null = null

    Insert(value: any) {
        const newNode = new BinaryTreeNode(value)
        if (this.root === null)
            this.root = newNode
        else
            this._insert(newNode, this.root)

    }
    private _insert(newNode: BinaryTreeNode, currentNode: BinaryTreeNode) {
        if (newNode.data > currentNode.data) {
            if (currentNode.rightNode === null)
                currentNode.rightNode = newNode
            else
                this._insert(newNode, currentNode.rightNode)
        } else {
            if (currentNode.leftNode === null)
                currentNode.leftNode = newNode
            else
                this._insert(newNode, currentNode.leftNode)
        }
    }

    Remove(value: any) {
        if (this.root === null) return null
        const [deletedNode, parentNode] = this._searchRemoveNode(value, null, this.root)
        if (deletedNode === null) return null

        if (deletedNode.rightNode === null) {
            if (parentNode === null)
                this.root = deletedNode.leftNode
            else {
                if (deletedNode.data < parentNode.data) {
                    parentNode.leftNode = deletedNode.leftNode
                } else {
                    parentNode.rightNode = deletedNode.leftNode
                }
            }
        }

        else if (deletedNode.rightNode.leftNode === null) {
            deletedNode.rightNode.leftNode = deletedNode.leftNode //*****************\\
            if (parentNode === null)
                this.root = deletedNode.rightNode
            else {
                if (deletedNode.data < parentNode.data)
                    parentNode.leftNode = deletedNode.rightNode
                else
                    parentNode.rightNode = deletedNode.rightNode

            }
        }

        else {
            let leftMost = deletedNode.rightNode.leftNode
            let leftMostParent = deletedNode.rightNode
            while (leftMost.leftNode !== null) {
                leftMostParent = leftMost
                leftMost = leftMost.leftNode
            }
            //--------------------\\
            leftMostParent.leftNode = leftMost.rightNode
            leftMost.leftNode = deletedNode.leftNode
            leftMost.rightNode = deletedNode.rightNode
            if (parentNode === null)
                this.root = leftMost
            else {
                if (deletedNode.data < parentNode.data)
                    parentNode.leftNode = leftMost
                else
                    parentNode.rightNode = leftMost
            }
        }
    }
    private _searchRemoveNode(value: any, parentNode: null | BinaryTreeNode, currentNode: BinaryTreeNode): [null | BinaryTreeNode, null | BinaryTreeNode] {
        if (value < currentNode.data && currentNode.leftNode !== null) {
            parentNode = currentNode
            currentNode = currentNode.leftNode
            return this._searchRemoveNode(value, parentNode, currentNode)
        } else if (value > currentNode.data && currentNode.rightNode !== null) {
            parentNode = currentNode
            currentNode = currentNode.rightNode
            return this._searchRemoveNode(value, parentNode, currentNode)
        } else if (value === currentNode.data)
            return [currentNode, parentNode]
        return [null, null]
    }

    Search(value: any) {
        if (this.root === null) return null
        return this._search(value, this.root)
    }

    private _search(value: any, currentNode: BinaryTreeNode) {
        if (value < currentNode.data && currentNode.leftNode !== null)
            return this._search(value, currentNode.leftNode)
        else if (value > currentNode.data && currentNode.rightNode !== null)
            return this._search(value, currentNode.rightNode)
        else if (value === currentNode.data)
            return currentNode
        return null
    }
}

// const bst = new BST()
// bst.Insert(4)
// bst.Insert(5)
// bst.Insert(3)
// bst.Insert(13)
// bst.Insert(20)
// bst.Insert(1)
// bst.Insert(7)
// bst.Insert(8)
// bst.Insert(6)

// bst.Remove(5)
// console.log(JSON.stringify(bst))

//#endregion BST

//#region searching************

class NewBTS extends BST {

    breadthFirstSearch() {
        if (this.root === null) return []
        let currentNode = this.root
        let bfs: any = []
        let queue: BinaryTreeNode[] = []
        queue.push(currentNode)
        while (queue.length > 0) {
            currentNode = queue.shift()!
            bfs.push(currentNode.data)
            if (currentNode.leftNode)
                queue.push(currentNode.leftNode)
            if (currentNode.rightNode)
                queue.push(currentNode.rightNode)
        }
        return bfs
    }
    dapthFirstSearchInOrder() {
        if (this.root === null) return
        return this.traverseInOrder(this.root, [])
    }

    traverseInOrder(node: BinaryTreeNode, dfs: any[]) {
        if (node.leftNode !== null)
            this.traverseInOrder(node.leftNode, dfs)
        dfs.push(node.data)
        if (node.rightNode !== null)
            this.traverseInOrder(node.rightNode, dfs)

        return dfs
    }

    dapthFirstSearchPreOrder() {
        if (this.root === null) return
        return this.traversePreOrder(this.root, [])
    }
    traversePreOrder(node: BinaryTreeNode, dfs: any[]) {
        dfs.push(node.data)
        if (node.leftNode !== null)
            this.traversePreOrder(node.leftNode, dfs)
        if (node.rightNode !== null)
            this.traversePreOrder(node.rightNode, dfs)

        return dfs
    }
    dapthFirstSearchPostOrder() {
        if (this.root === null) return
        let dfs: any[] = []
        return this.traversePostOrder(this.root, [])
    }
    traversePostOrder(node: BinaryTreeNode, dfs: any[]) {
        if (node.leftNode !== null)
            this.traversePostOrder(node.leftNode, dfs)
        if (node.rightNode !== null)
            this.traversePostOrder(node.rightNode, dfs)
        dfs.push(node.data)

        return dfs
    }
}


const bst = new NewBTS()
bst.Insert(40)
bst.Insert(50)
bst.Insert(30)
bst.Insert(25)
bst.Insert(35)
bst.Insert(45)
bst.Insert(60)

console.log(bst.dapthFirstSearchPostOrder());



