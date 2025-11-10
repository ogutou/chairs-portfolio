/** @format */

import React from "react";
import Scene from "./Scene";
import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import {
	Float,
	Text,
	Html,
	PivotControls,
	OrbitControls,
	TransformControls,
} from "@react-three/drei";

const Experience = () => {
	return (
		<>
			<Canvas
				camera={{
					fov: 45,
					near: 0.1,
					far: 10000,
					position: [0, 0.8, 15],
				}}
			>
				<Perf position="top-left" />
				<OrbitControls makeDefault enableDamping target={[0, 0.4, 12]} />
				<Scene />
			</Canvas>
		</>
	);
};

export default Experience;
