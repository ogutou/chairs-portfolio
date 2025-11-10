/** @format */

import React from "react";
import { Suspense } from "react";
import Chairs from "./models/Chairs001_2511072051_bake07";

const Scene = () => {
	return (
		<>
			<Suspense fallback={null}>
				<Chairs />
			</Suspense>
		</>
	);
};

export default Scene;
