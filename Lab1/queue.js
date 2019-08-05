class Queue {
    constructor() {
        this.q = [];
    }

    // get the current number of elements in the queue
    //Getter function
    get length() {
        return this.q.length
    };

    //Get all the elements 
    get queue() {
        return this.q;
    }

    // Boolean function: returns true if the queue is empty, false otherwise 
    isEmpty() {
        return 0 == this.q.length;
    };

    //adds new element to the end of the quue
    enqueue(newItem) {
        this.q.push(newItem)
    };

    //Boolean function: returns true if an item is found (first occurnace); false otherwise
    inQueue(item) {
        let i = 0;
        let isFound = false;
        while (i < this.q.length && !isFound) {
            if (this.q[i] === item) {
                isFound = true;
            } else
                i++;
        }
        return (isFound);
    }

    // pop an item from the queue
    dequeue() {
        if (0 != this.q.length) {
            let c = this.q[0];
            this.q.splice(0, 1);
            return c
        }
    };

    // task1: remove all the elements in the queue
    dequeueAll() {
        //this.q = [];

        while (this.q.length > 0){
            this.q.pop();
        }
    };

    // task2: add a set of items into the queue
    addAll(elements) {
        this.q = this.q.concat(elements);
    };

    // task3: pop (dequeue) N elements from the queue and reject the input if there is not enough element to be removed.
    dequeueN(n) {
        if (this.q.length < n)
            return null;

        while (n > 0){
            this.q.pop();
            n--;
        }
    };

    // task4: print the content of the queue with their indexes
    queueIndexes() {
        let out = "";
        for (let i=0; i < this.q.length; i++){
            out += i + " -> " + this.q[i] + "\n";
        }
        return out;
    }
};

let queue = new Queue();
queue.enqueue(10);
queue.enqueue(20);
console.log(queue.length);
console.log(queue.q);
queue.dequeue();
queue.enqueue(33);
console.log(queue.q);
console.log(queue.inQueue(33));
console.log(queue.inQueue(88));
// task 1
queue.dequeueAll();
console.log('\n' + 'Task 1');
console.log(queue.q);
// task 2
queue.addAll([3,7,9]);
console.log('\n' + 'Task 2');
console.log('Before dequeue: '+ queue.q);
// task 2
queue.dequeueN(2);
console.log('\n' + 'Task 3');
console.log('After dequeue: '+ queue.q);
// task 4
queue.addAll([34,30,11]);
console.log('\n' + 'Task 4');
console.log(queue.queueIndexes());