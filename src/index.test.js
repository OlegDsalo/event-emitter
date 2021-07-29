const { EventEmitter } = require("./index");

describe("Event emitter", () => {
  let em;

  beforeEach(() => {
    em = new EventEmitter();
  });

  it("Should subscribe for an event and be called when it emitted", () => {
    const onClick = jest.fn();
    const onClick1 = jest.fn();

    const onFocus = jest.fn();

    em.addEventListener("click", onClick);
    em.addEventListener("click", onClick1);

    em.addEventListener("focus", onFocus);

    em.emit("click");

    expect(onClick).toBeCalled();
    expect(onClick1).toBeCalled();
    expect(onFocus).not.toBeCalled();
  });

  it("Should not be called after listener got removed", () => {
    const onClick = jest.fn();
    const onFocus = jest.fn();

    em.addEventListener("click", onClick);
    em.addEventListener("focus", onFocus);
    em.addEventListener("blur", onFocus);

    em.emit("click");

    em.removeEventListener("click", onClick);

    em.emit("click");

    em.emit("focus");

    em.emit("focus");

    em.removeEventListener("focus", onFocus);

    em.emit("focus");

    em.emit("blur");

    expect(onFocus).toBeCalledTimes(3);
    expect(onClick).toBeCalledTimes(1);
  });

  it("Should accept event payload in handler function", () => {
    const onClick = jest.fn();
    const payload = { some: "field" };

    em.addEventListener("click", onClick);

    em.emit("click", payload);

    expect(onClick).toBeCalledWith(payload);
  });
});
