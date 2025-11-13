/** @format */

import * as THREE from "three";
import React, { useRef, useEffect } from "react";
import Scene from "./Scene";
import { Canvas, useFrame } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";

const Experience = () => {
	const cameraRef = useRef();
	// const pointerRef = useRef({
	// 	x: 0,
	// 	y: 0,
	// });

	// useEffect(() => {
	// 	const onPointerMove = (e) => {
	// 		pointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
	// 		pointerRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
	// 	};

	// 	window.addEventListener("pointermove", onPointerMove);

	// 	return () => {
	// 		window.removeEventListener("pointermove", onPointerMove);
	// 	};
	// }, []);

	return (
		<>
			<Canvas>
				<OrthographicCamera
					// ref={cameraRef}
					makeDefault
					position={[-3.61, 2, 17.87]}
					// rotation={[-0.2098047606678561, -0.5418059887050007, -0.10937073910198182]}
					zoom={600}
					near={0.1}
					far={100}
				/>
				{/* <PivotOrbit cameraRef={cameraRef} pointerRef={pointerRef} target={[0, 0.4, 12]} /> */}
				<OrbitControls
					makeDefault
					enableDamping
					target={[0, 0.5, 12]}
					minZoom={250}
					maxZoom={1000}
					minPolarAngle={THREE.MathUtils.degToRad(20)}
					maxPolarAngle={THREE.MathUtils.degToRad(75)}
					// minAzimuthAngle={THREE.MathUtils.degToRad(-70)}
					// maxAzimuthAngle={THREE.MathUtils.degToRad(10)}
				/>
				<Scene camera={cameraRef} />
			</Canvas>
		</>
	);
};

export default Experience;
