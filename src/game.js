import AssetLoader from '@engine/AssetLoader';
import Renderer from '@engine/Renderer';
import Wall from '@objects/Wall';
import HtmlOverlay from '@engine/HtmlOverlay';
import spriteSheets from './spriteSheets';

const urls = Object.values(spriteSheets).map(sprite => sprite.src);

const Game = () => {
    return (
        <>
            <h1 className="text-4xl text-yellow-300 font-pixelart">Hello World</h1>
            <Renderer className="game-container">
                <AssetLoader urls={urls} placeholder={<HtmlOverlay>Loading...</HtmlOverlay>}>
                    <Wall x={0} y={0} />
                    <Wall x={1} y={0} />
                    <Wall x={2} y={0} />
                    <Wall x={3} y={0} />
                </AssetLoader>
            </Renderer>
        </>
    );
};

export default Game;
