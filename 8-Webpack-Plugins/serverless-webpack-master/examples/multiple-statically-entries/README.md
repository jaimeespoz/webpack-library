## WARNING!

This example is only there to show that you _can_ overtake the configuration
manually. This is *strongly discouraged* since serverless-webpack V3 as it
does not work with individual packaging of functions and prevents you to
use optimizations like Webpack's tree shaking.

You can also try to invoke a function locally:
```
serverless invoke local --function=first --path=./event.json
```
