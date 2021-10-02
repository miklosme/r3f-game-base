import { Canvas } from '@react-three/fiber';

export default function Renderer({ className, clearColor = '#000', cameraZoom = 64, children }) {
    return (
        <div className={className}>
            <Canvas
                camera={{
                    position: [0, 0, 32],
                    zoom: cameraZoom,
                    near: 0.1,
                    far: 64,
                }}
                orthographic
                noEvents
                gl2
                gl={{ antialias: false }}
                onContextMenu={e => e.preventDefault()}
                onCreated={({ gl, events }) => {
                    gl.setClearColor(clearColor);
                }}
            >
                {children}
            </Canvas>
        </div>
    );
}
