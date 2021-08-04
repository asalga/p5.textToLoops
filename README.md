# p5.textToLoops
Applies basic logic to textToPoints that allows more intelligent organization of vertices.

<img src="img.png" width="200"/>

## Usage
```js
 new p5(p => {
    let gfx, h2n;

    p.setup = _ => {
        p.createCanvas(500, 500);
        p.background(0);

        let obj = textToLoops(ch);
		let loops = obj.loops;

        loops.forEach( _loop => {

            let scl = 1;
            _loop.forEach( (l, i) => {
                line(   _loop[i].x * scl, 
                        _loop[i].y * scl, 
                        _loop[i + 1].x * scl, 
                        _loop[i + 1].y * scl);
            });            
        });
    }
});
```

# Development
$ npm run start

# Build
$ npm run build
