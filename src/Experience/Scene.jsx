/** @format */

import * as THREE from "three";
import React, { useRef, Suspense } from "react";
import Chairs from "./models/Chairs001_2511072051_bake07";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";

const Scene = ({ camera }) => {
	const groupRef = useRef();

	// useFrame(() => {
	// 	console.log(camera.current.position);
	// 	console.log(camera.current.position);
	// });

	// const groupRotationRef = useRef(0);
	// useFrame(() => {
	// 	if (!groupRef.current) return;
	// 	const targetRotation = pointerRef.current.x * Math.PI * 0.01;

	// 	groupRotationRef.current = THREE.MathUtils.lerp(groupRotationRef.current, targetRotation, 0.1);

	// 	groupRef.current.rotation.y = groupRotationRef.current;
	// });

	//回転の操作
	const { rotate, baseSpeedDeg, slowRangeDeg, minFactor } = useControls("Rotation", {
		rotate: { value: false },
		baseSpeedDeg: { value: 75, min: 0, max: 400, step: 1, label: "速度" },
		slowRangeDeg: { value: 15, min: 0, max: 30, step: 1, label: "減速" },
		minFactor: { value: 0.01, min: 0, max: 0.05, step: 0.001, label: "最小倍率" },
	});

	//回転のシステム
	const rotating = useRef();
	const sectorDeg = 30;
	useFrame((_, dt) => {
		const g = rotating.current;
		if (!g) return;

		let deg = THREE.MathUtils.radToDeg(g.rotation.y) % 360;
		if (deg < 0) deg += 360;

		const r = deg % sectorDeg;
		const distToNearest = Math.min(r, sectorDeg - r);

		let factor = 1;
		if (distToNearest < slowRangeDeg) {
			const t = distToNearest / slowRangeDeg;
			const eased = t * t * (3 - 2 * t);
			factor = minFactor + (1 - minFactor) * eased;
		}

		const basedSpeed = THREE.MathUtils.degToRad(baseSpeedDeg);
		const speedMultiplier = rotate ? 1 : 0;

		g.rotation.y += basedSpeed * factor * speedMultiplier * dt;
	});

	return (
		<>
			<Suspense fallback={null}>
				<group ref={groupRef}>
					<group ref={rotating}>
						<Chairs />
					</group>
				</group>
			</Suspense>
		</>
	);
};

export default Scene;
