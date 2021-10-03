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
            default: [[0, 2]],
            run: [
                [0, 1],
                [1, 1],
            ],
            jump: [[5, 0]],
        },
    },
};

export default spriteSheets;
