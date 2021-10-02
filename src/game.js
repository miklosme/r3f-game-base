import AssetLoader from '@engine/AssetLoader';
import Renderer from '@engine/Renderer';
import spriteData from './spriteData';
import GameObject from '@engine/GameObject';
import Sprite from '@engine/Sprite';
import HtmlOverlay from '@engine/HtmlOverlay';

const urls = Object.values(spriteData).map(sprite => sprite.src);

const App = () => {
    return (
        <div>
            <h1 className="text-4xl text-yellow-300 font-pixelart">Hello World</h1>
            <Renderer className="game-container">
                <AssetLoader urls={urls} placeholder={<HtmlOverlay>Loading...</HtmlOverlay>}>
                    <ambientLight />
                    <GameObject displayName="Player" x={1} y={0}>
                        <Sprite {...spriteData.wall} />
                    </GameObject>
                </AssetLoader>
            </Renderer>
        </div>
    );
};

export default App;
