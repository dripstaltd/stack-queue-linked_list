// Stack Implementation
function Stack() {
  this.storage = {};
  this.length = 0;
}

Stack.prototype.push = function (value) {
  this.storage[this.length] = value;
  this.length++;
  return true;
};

Stack.prototype.pop = function () {
  if (this.length === 0) return null;
  const element = this.storage[this.length - 1];
  delete this.storage[--this.length];
  return element;
};

Stack.prototype.size = function () {
  return this.length;
};

const stack = new Stack();

// Queue Implementation
function Queue() {
  this.storage = {};
  this.startIndex = 0;
  this.endIndex = 0;
}

Queue.prototype.length = function () {
  return this.endIndex - this.startIndex;
};

Queue.prototype.enqueue = function (value) {
  this.storage[this.endIndex] = value;
  this.endIndex++;
  return true;
};

Queue.prototype.dequeue = function () {
  if (this.length() === 0) return null;
  const removedElement = this.storage[this.startIndex];
  delete this.storage[this.startIndex];
  this.startIndex++;
  return removedElement;
};

Queue.prototype.size = function () {
  return this.length();
};

const queue = new Queue();

// Linked List Implementation
function Node(value) {
  this.value = value;
  this.next = null;
}

function LinkedList() {
  this.head = null;
  this.tail = null;
}

LinkedList.prototype.addToTail = function (value) {
  const node = new Node(value);
  if (!this.tail) {
    this.head = node;
    this.tail = node;
  } else {
    this.tail.next = node;
    this.tail = node;
  }
  return true;
};

LinkedList.prototype.removeHead = function () {
  if (!this.head) return null;
  const value = this.head.value;
  this.head = this.head.next;
  if (!this.head) this.tail = null;
  return value;
};

LinkedList.prototype.size = function () {
  let count = 0;
  let current = this.head;
  while (current) {
    count++;
    current = current.next;
  }
  return count;
};

const linkedList = new LinkedList();

let currentStructure = 'stack';

function updateDisplay() {
  const container = $('#structure-container');
  container.empty();

  container.removeClass('stack queue linked-list').addClass(currentStructure);

  if (currentStructure === 'stack') {
    for (let i = 0; i < stack.length; i++) {
      const itemDiv = $('<div class="stack-item"></div>').text(stack.storage[i]);
      container.append(itemDiv);
    }
    $('#size-value').text(stack.size());
    $('#storage-content').text(JSON.stringify(stack.storage));
    $('#length-value').text(stack.size());
  } else if (currentStructure === 'queue') {
    for (let i = queue.startIndex; i < queue.endIndex; i++) {
      const itemDiv = $('<div class="queue-item"></div>').text(queue.storage[i]);
      if (i === queue.startIndex) itemDiv.append('<div class="arrow arrow-front">Front</div>');
      if (i === queue.endIndex - 1) itemDiv.append('<div class="arrow arrow-back">Back</div>');
      container.append(itemDiv);
    }
    $('#size-value').text(queue.size());
    $('#storage-content').text(JSON.stringify(queue.storage));
    $('#length-value').text(queue.length());
  } else if (currentStructure === 'linkedList') {
    let current = linkedList.head;
    const linkedListStorage = [];
    while (current) {
      linkedListStorage.push(current.value);
      const itemDiv = $('<div class="linked-list-item"></div>').text(current.value);
      if (current === linkedList.head) itemDiv.append('<div class="arrow arrow-front">Head</div>');
      if (current === linkedList.tail) itemDiv.append('<div class="arrow arrow-back">Tail</div>');
      container.append(itemDiv);
      current = current.next;
    }
    $('#size-value').text(linkedList.size());
    $('#storage-content').text(JSON.stringify(linkedListStorage));
    $('#length-value').text(linkedList.size());
  }
}

$(document).ready(function () {
  $('#action1').click(function () {
    const value = $('#inputValue').val();
    if (value) {
      if (currentStructure === 'stack') stack.push(value);
      else if (currentStructure === 'queue') queue.enqueue(value);
      else if (currentStructure === 'linkedList') linkedList.addToTail(value);
      $('#inputValue').val('');
      updateDisplay();
    }
  });

  $('#action2').click(function () {
    if (currentStructure === 'stack') stack.pop();
    else if (currentStructure === 'queue') queue.dequeue();
    else if (currentStructure === 'linkedList') linkedList.removeHead();
    updateDisplay();
  });

  $('#toggle-structure').click(function () {
    if (currentStructure === 'stack') {
      currentStructure = 'queue';
      $('#structure-title').text('Queue Visual Representation');
      $('#action1').text('Enqueue');
      $('#action2').text('Dequeue');
      $('#toggle-structure').text('Switch to Linked List');
    } else if (currentStructure === 'queue') {
      currentStructure = 'linkedList';
      $('#structure-title').text('Linked List Visual Representation');
      $('#action1').text('Add to Tail');
      $('#action2').text('Remove Head');
      $('#toggle-structure').text('Switch to Stack');
    } else {
      currentStructure = 'stack';
      $('#structure-title').text('Stack Visual Representation');
      $('#action1').text('Push');
      $('#action2').text('Pop');
      $('#toggle-structure').text('Switch to Queue');
    }
    updateDisplay();
  });

  updateDisplay();
});
