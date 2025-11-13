/** @format */

import React from "react";
import { Html, useProgress } from "@react-three/drei";

const CanvasLoader = () => {
	const { progress } = useProgress();
	return (
		<Html center>
			<div className="r3f-loader">
				<div className="r3f-spinner" />
				<div className="r3f-label">{Math.round(progress)}%</div>
			</div>
		</Html>
	);
};

export default CanvasLoader;
