import Constants from "../Constants";
const randomeMinMax = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const GameLoop =
    (entities, { touches, dispatch, events }) => {
        let head = entities.head;
        let food = entities.food;
        let tail = entities.tail;
        if (events.length) {
            for (let i = 0; i < events.length; i++) {
                if (events[i].type === "move-up" && head.ySpeed !== 1) {
                    head.ySpeed = -1
                    head.xSpeed = 0
                } else if (events[i].type === "move-down" && head.ySpeed !== -1) {
                    head.ySpeed = 1
                    head.xSpeed = 0
                } else if (events[i].type === "move-left" && head.xSpeed !== 1) {
                    head.xSpeed = -1
                    head.ySpeed = 0
                } else if (events[i].type === "move-right" && head.xSpeed !== 1) {
                    head.xSpeed = 1
                    head.ySpeed = 0
                }
            }
        }
        head.nextMoveSize -= 1
        if (head.nextMoveSize === 0) {
            head.nextMoveSize = head.updateFrequency
            if (head.position[0] + head.xSpeed < 0 || head.position[0] + head.xSpeed >= Constants.GRID_SIZE ||
                head.position[1] + head.ySpeed < 0 || head.position[1] + head.ySpeed >= Constants.GRID_SIZE) {
                //game over 
                dispatch({ type: "game-over" })
            } else {
                tail.elements = [[head.position[0], head.position[1]]].concat(tail.elements).slice(0, -1)
                head.position[0] += head.xSpeed
                head.position[1] += head.ySpeed
                if (head.position[0] === food.position[0] && head.position[1] === food.position[1]) {
                    tail.elements = [[food.position[0], food.position[1]]].concat(tail.elements)
                    food.position[0] = randomeMinMax(0, Constants.GRID_SIZE - 1)
                    food.position[1] = randomeMinMax(0, Constants.GRID_SIZE - 1)
                }
            }
        }


        return entities
    }


export { GameLoop };