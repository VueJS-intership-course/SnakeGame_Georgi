export class Apple {
    static appleIsEaten = false;
    static addApple() {
        let elements = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 120, 130, 140, 150, 160, 170, 180, 190, 200];
        let position = {
            x: elements[Math.floor(Math.random() * elements.length)],
            y: elements[Math.floor(Math.random() * elements.length)],
        };
        let svg = document.querySelector('.area');
        let apple = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        apple.setAttribute('id', 'apple');
        apple.setAttribute('width', '20');
        apple.setAttribute('height', '20');
        apple.setAttribute('rx', '10');
        apple.setAttribute('ry', '10');
        apple.setAttribute('fill', 'red');
        apple.setAttribute('x', position.x);
        apple.setAttribute('y', position.y);
        svg.appendChild(apple);
    }

    static removeApple() {
        let apple = document.getElementById('apple');
        apple.remove();
        Apple.addApple();
    }
}