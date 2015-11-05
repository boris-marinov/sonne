var createStack = require('../lib/stack')
var comp = require('../lib/comp')
module.exports = {
  stack(test){
    const stack = createStack([foo, bar])
    const fooVal = foo.of(5)
    const barVal = bar.of(5)
    const fooBarVal = foo.of(bar.of(5))
    test.deepEqual(stack.wrap(foo, fooVal), fooVal, "Wrap does nothing for values of the outer type")
    test.deepEqual(stack.lift(bar, barVal), barVal, "Lift does nothing for values of the inner type")

    test.deepEqual(stack.lift(foo, fooVal), fooBarVal, "Lift works for the outer value of stacks of two items.")
    test.deepEqual(stack.wrap(bar, barVal), fooBarVal, "Lift works for the inner value of stacks of two items.")

    test.deepEqual(stack.wrapLift(foo, fooVal), fooBarVal, "WrapLift works for the outer value of stacks of two items.")
    test.deepEqual(stack.wrapLift(bar, barVal), fooBarVal, "WrapLift works for the inner value of stacks of two items.")
    test.done()
  },
  stackThree(test){
    const stack = createStack([foo, bar, baz])
    const fooVal = foo.of(5)
    const barVal = bar.of(5)
    const bazVal = baz.of(5)
    const fooBarVal = foo.of(bar.of(5))
    const fooBarBazVal = foo.of(bar.of(baz.of(5)))
    const barBazVal = bar.of(baz.of(5))
    test.deepEqual(stack.lift(foo, fooVal), fooBarBazVal, "Lift works for the outer value of stacks of three items.")
    test.deepEqual(stack.lift(bar, fooBarVal), fooBarBazVal, "Lift works for the outer value of stacks of three items.")

    test.deepEqual(stack.wrap(baz, bazVal), fooBarBazVal, "Wrap works for the outermost value of stacks of three items.")

    test.deepEqual(stack.wrap(bar, barBazVal), fooBarBazVal, "Wrap works for the middle value of stacks of three items.")

    test.deepEqual(stack.wrapLift(bar, barVal), fooBarBazVal, "Liftwrap works for the middle value of stacks of three items.")
    test.deepEqual(stack.wrapLift(baz, bazVal), fooBarBazVal, "Liftwrap works for the innermost value of stacks of three items.")

    test.deepEqual(stack.wrapLift(foo, fooVal), fooBarBazVal, "Liftwrap works for the outermost value of stacks of three items.")
    test.done()
  },
  dev (test) {
    const stackTwo = createStack([baz, comp.list ])
   //test.deepEqual(stackTwo.lift(baz, {bazVal:1}),[{bazVal:1}])

    const stackThree = createStack([foo, baz, comp.list])
   //test.deepEqual(stackThree.lift(foo, {fooVal: 1}),{fooVal:[{bazVal:1}]})
   test.deepEqual(stackThree.lift(baz, {fooVal: {bazVal:1}}),{fooVal:[{bazVal:1}]})

    test.done()
  }

}


var foo = {
  name: 'foo',
  of (val) { return {fooVal: val } },
  chain (funk, val, proto) {
    return proto.chain((innerfoo) => {
      return funk(innerfoo.fooVal)
    }, val)
  },
  lift (val, proto) {
    return proto.chain((innerValue) => proto.of({fooVal: innerValue}), val)
  },
  wrap (val, proto) {
    return proto.of(val)
  }
}

var bar = {
  name: 'bar',
  of (val) { return {barVal: val } },
  chain (funk, val, proto) {
    return proto.chain((innerbar) => {
      return funk(innerbar.barVal)
    }, val)
  },
  lift (val, proto) {
    return proto.chain((innerValue) => proto.of({barVal: innerValue}), val)
  },
  wrap (val, proto) {
    return proto.of(val)
  }
}

var baz = {
  name: 'baz',
  of (val) { return {bazVal: val } },
  chain (funk, val, proto) {
    return proto.chain((innerbaz) => {
      return funk(innerbaz.bazVal)
    }, val)
  },
  lift (val, proto) {
    return proto.chain((innerValue) => proto.of({bazVal: innerValue}), val)
  },
  wrap (val, proto) {
    return proto.of(val)
  }
}