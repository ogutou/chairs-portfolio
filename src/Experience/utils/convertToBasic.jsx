/** @format */

//  * MeshStandardMaterial → MeshBasicMaterial に一括変換
//  * - map はそのまま引き継ぐ
//  * - material.transparent が true のときだけ transparent=true / alphaTest=指定値 を付与
//  * - マルチマテリアル（配列）対応
//  * - 同一マテリアルの重複変換を避けるためキャッシュ再利用

import * as THREE from "three";

export function convertStandardToBasic(root, { alphaTest = 0.55, setSRGBOnMap = true } = {}) {
	const cache = new Map();

	root.traverse((obj) => {
		if (!obj.isMesh || !obj.material) return;

		const toBasic = (mat) => {
			if (!mat || !mat.isMaterial) return mat;
			if (!mat.isMeshStandardMaterial) return mat;

			const key = mat.uuid;
			if (cache.has(key)) return cache.get(key);

			const basic = new THREE.MeshBasicMaterial({
				name: mat.name,
				map: mat.map ?? null,
				side: mat.side,
				opacity: mat.opacity,
			});

			if (mat.transparent) {
				basic.transparent = true;
				basic.alphaTest = alphaTest;
			}

			// three r150+ 推奨の色空間設定（必要な場合のみ）
			if (setSRGBOnMap && basic.map && THREE.SRGBColorSpace) {
				basic.map.colorSpace = THREE.SRGBColorSpace;
			}
			// 旧 three の場合は↓
			// if (setSRGBOnMap && basic.map && THREE.sRGBEncoding) {
			//   basic.map.encoding = THREE.sRGBEncoding;
			// }

			cache.set(key, basic);
			mat.dispose(); // 元Standardを破棄（以後使わない前提）

			return basic;
		};

		if (Array.isArray(obj.material)) {
			const next = obj.material.map(toBasic);
			obj.material = next.length === 1 ? next[0] : next;
		} else {
			obj.material = toBasic(obj.material);
		}
	});
}

//動画
// import * as THREE from "three";

// export function convertMaterialsToBasic(materials, alphaTestValue = 0.55) {
// 	const newMaterials = {};
// 	Object.keys(materials).forEach((key) => {
// 		const oldMaterial = materials[key];
// 		if (oldMaterial instanceof THREE.MeshStandardMaterial) {
// 			const newMaterial = new THREE.MeshBasicMaterial({
// 				map: oldMaterial.map,
// 				transparent: oldMaterial.transparent || false,
// 				alphaTest: oldMaterial.transparent ? alphaTestValue : 0,
// 			});
// 			newMaterials[key] = newMaterial;
// 		} else {
// 			newMaterials[key] = oldMaterial;
// 		}
// 	});

// 	return newMaterials;
// }
