const spriteSheets = {
    wall: {
        src: './wall.png',
        width: 19,
        height: 19,
        sheet: {
            default: [
                [0, 0],
                [5, 0],
            ],
        },
    },
    player: {
        src: './player.png',
        width: 38,
        height: 57,
        sheet: {
            stand: [[2,0]],
            run: [
                [0, 1],
                [1, 1],
            ],
            jump: [[5, 0]],
        },
    },
};

export default spriteSheets;

export const GRID_WIDTH = 19;
export const GRID_HEIGHT = 19;
