import m from "mithril";
import SimplexNoise from "simplex-noise";

// const svgNs = "http://www.w3.org/2000/svg";

class NoiseLine {
    constructor(simplex, x, y, length) {
        this.simplex = simplex;
        this.x = x;
        this.y = y;
        this.length = length;

        this.points = this.generatePoints();
    }

    regenerate() {
        this.points = this.generatePoints();
    }

    draw() {
        let commands = this.generateCommands(this.points);

        return <path fill="none" stroke="blue" strokeWidth="3px" d={commands}/>
    }

    generateCommands(points) {
        let commands = [];

        commands.push(`M ${points[0].x}, ${points[0].y}`);
        for (let { x, y } of points.slice(1)) {
            commands.push(`L ${x}, ${y}`);
        }

        return commands.join(" ");
    }

    generatePoints() {
        let points = [];
        let dx = this.length / 300;

        for (let x = 0; x <= this.length; x += dx) {
            let xx = this.x + x;
            let y = this.y + (this.simplex.noise2D(x / 200, this.y / 400)) * 20;

            points.push({ x: xx, y });
        }

        return points;
    }
}

class DynamicBackground {
    constructor() {
        this.simplex = new SimplexNoise();
        this.lines = [];
        this.width = 0;
        this.height = 0;
    }

    generateViewBox() {
        return `0 0 ${this.width} ${this.height}`;
    }

    view() {
        return <svg xmlns="http://www.w3.org/2000/svg" width={this.width} height={this.height} viewBox={this.generateViewBox()}>
            <g>
                {this.lines.map(l => l.draw())}
            </g>
        </svg>
    }

    redraw() {
        this.lines = [];
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        for (let y = 0; y <= this.height; y += 15) {
            let line = new NoiseLine(this.simplex, 0, y, this.width + 10);

            this.lines.push(line);
        }
    }

    oninit() {
        this.redraw();

        this.onresize = function(ev) {
            this.redraw();
            m.redraw();
        }.bind(this);

        window.addEventListener("resize", this.onresize);
    }

    onremove() {
        this.lines = [];

        window.removeEventListener("resize", this.onresize);
    }
}

export default class BackgroundPlate {
    view() {
        return <div class="background">
            <DynamicBackground/>
        </div>
    }
}