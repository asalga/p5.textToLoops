/*
    Andor Saga
*/
(function () {
    let p5 = window.p5;

    p5.prototype.textToLoops = function (str, font, fntSz, cfg) {

        cfg = cfg || {
            simplifyThreshold: 0,
            sampleFactor: 1.0
        };

        function getClosestPointIdx(p, rawPoints) {

            let closestIdx = 0;
            let closestDist = Infinity;
            for (let i = 0; i < rawPoints.length; i++) {
                let d = p5.prototype.dist(p.x, p.y, rawPoints[i].x, rawPoints[i].y);
                if (d < closestDist && rawPoints[i].hasBeenAdded === false) {
                    closestDist = d;
                    closestIdx = i;
                }
            }
            return closestIdx;
        }

        let distThreshold = 4;

        let loops = [];
        let pointsProcessed = 0;
        let bounds = {
            minX: Infinity,
            minY: Infinity,
            maxX: -Infinity,
            maxY: -Infinity
        };

        let rawPoints = font.textToPoints(str, 0, 0, fntSz, cfg);

        // we need to add some metadata to keep track of which 
        // points have already been added so they aren't checked
        // when calculating distance.
        rawPoints.forEach(p => p.hasBeenAdded = false);

        // calc bounds
        rawPoints.forEach(p => {
            let b = bounds;
            if (p.x < b.minX) b.minX = p.x;
            if (p.x > b.maxX) b.maxX = p.x;
            if (p.y < b.minY) b.minY = p.y;
            if (p.y > b.maxY) b.maxY = p.y;
        });

        let loopIdx = 0;
        loops[loopIdx] = [];

        let nextIdx = 0;
        while (pointsProcessed < rawPoints.length) {
            let p = rawPoints[nextIdx];

            p.hasBeenAdded = true;
            loops[loopIdx].push(p);
            nextIdx = getClosestPointIdx(p, rawPoints);

            // if the next point is farther than the threshold, we start a new loop
            if (p5.prototype.dist(p.x, p.y, rawPoints[nextIdx].x, rawPoints[nextIdx].y) > distThreshold) {

                // close the loop if its close enought to the first point in the loop
                if (p5.prototype.dist(p.x, p.y, loops[loopIdx][0].x, loops[loopIdx][0].y) < 5) {
                    loops[loopIdx].push(loops[loopIdx][0]);
                }

                loopIdx++;
                loops[loopIdx] = [];
            }

            pointsProcessed++;
        }

        // Last loop has 0 size. Need to fix this
        if (loops[loops.length - 1].length === 0) {
            loops.length = loops.length - 1;
        }

        //
        return { loops, bounds };
    }

})();


    //     let _p;
    //     new p5(p => {
    //         p.setup = _ => {
    //             _p = p;
    //             console.log('setup');
    //             // renderer = _p.createCanvas(w, h, _p.WEBGL);
    //             // _p.pixelDensity(1);

    //             // // don't pollute the DOM
    //             // renderer.canvas.style.display = 'none';

    //             // sh = new p5.Shader(_p._renderer, vert, frag);
    //             // _p.shader(sh);
    //             // _p.ortho();
    //             // _p.translate(-_p.width / 2, -_p.height / 2, 0);
    //         }
    //     });

    //     /*
    //         strength -  strength of the normal
    //                     values closer to 0 will make z component of vectors
    //                     have more influence pointing 'outwards'
    //                     typical values: 0.001 - 10
    //         level - typical values: 5 - 7
    //     */
    //     this.get = function (tex, strength = 2, level = 7) {
    //         sh.setUniform('tex', tex);
    //         sh.setUniform('res', [tex.width, tex.height]);
    //         sh.setUniform('strength', strength);
    //         sh.setUniform('level', level);
    //         _p.rect(0, 0, _p.width, _p.height, 1, 1);
    //         return renderer;
    //     }
    // }