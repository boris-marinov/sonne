# monad-transformers
A JS implementation of all majour monad transformers.

# Features

### Highly composable
We test every type against every other to make sure everything works together. 

### Functions all the way down
The monad transformers are implemented by just writing functions transforming one type to another. The stack may contain any value, including values coming from third party libs and the build-ins.

### Chaining API
The library features an underscore-inspired chaining API, familiar and easy-to-use for JS developers.

### Handles wrapping and unwrapping of Values.
This package contains a stack component which abstracts away the process of wrapping and unwrapping of values, thus making the types easy to write and understand.

# How to use

Call `sonne.make` to composes two or several types in a new type:

     var listMaybe = sonne.make(sonne.data.list, sonne.data.maybe)

Create an instance of the new type and use it.
  
      listMaybe.fromArray([{name: 'foo'}, {name: 'bar'}, {noname: 'baz'}])

Use the methods coming from the types that you composed:

      listMaybe.fromArray([{name: 'foo'}, {name: 'bar'}, {noname: 'baz'}])

        //Calling a promise method
        .get('name') // [maybe('foo'), maybe('bar'), maybe(undefined)]
        
        //Calling a list method
        .filter(a => a.name !== 'bar') //[maybe('foo'), maybe(undefined)]
        
        //Calling a general monad method
        .map((val)=>console.log(val)) //foo
