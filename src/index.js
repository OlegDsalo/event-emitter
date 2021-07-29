/**
 * Implement event emitter class which has 3 public methods:
 * addEventListener
 * removeEventListener
 * emit
 * event emitter should be able to store subscribers for a specific events and call them when
 * event with the same name dispatched using emit()
 *
 * any ways of implementation allowed but subscriptions should work inside
 * different instances of event emitter separatly
 *
 * there are index.test.js file with test suit and methods usage examples
 */

class EventEmitter {
  subscribers = [];


  /**
   * 
   * Should subscribe handler function to specified event name
   * @param {*} name event name
   * @param {*} handler event handle function (event) => void
   */
  addEventListener(name, handler) {
    console.log("addEventListener name handler");
    // this.subscribers.name = handler;
    this.subscribers.push({ name, handler });
    console.log(this.subscribers);
  }

  /**
   * Should unsubscribe handler from specific event name
   * @param {*} name event name
   * @param {*} handler event handle function (event) => void
   */
  removeEventListener(name, handler) {
    console.log("removeEventListener name handler");
    // delete this.subscribers.name;
    const indexToRemove = this.subscribers.findIndex(s => s.name === name && s.handler === handler);
    if (indexToRemove >= 0) {
      this.subscribers.splice(indexToRemove, 1);
    }

  }

  /**
   * Should call all handlers attached to provided event name
   * @param {*} name event name
   * @param {*} eventData event payload
   */
  emit(name, eventData) {
    console.log("emit name handler");
    this.subscribers.filter(s => s.name === name).forEach(s => s.handler(eventData));
  }
}

let em = new EventEmitter();
em.addEventListener("jest", jest);
em.addEventListener("jest", jest2);

em.emit("jest", { "test": "test" });

function jest(eventData) {
  console.log("jest", eventData);
}
function jest2(eventData) {
  console.log("jest2", eventData);
}
module.exports = { EventEmitter }