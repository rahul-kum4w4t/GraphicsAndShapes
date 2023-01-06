export function radianToDegree(rad) {
    if (Number.isFinite(rad)) {
        return (rad / Math.PI) * 180;
    } else {
        return Number.NaN;
    }
}

export function degreeToRadian(deg) {
    if (Number.isFinite(deg)) {
        return (deg / 180) * Math.PI;
    } else {
        return Number.NaN;
    }
}

export function euclidDistSq(...axies) {
    if (Array.isArray(axies) && axies.length > 0) {
        let mag = 0;
        for (let axis of axies) {
            mag += (axis * axis);
        }
        return mag;
    } else {
        return Number.NaN;
    }
}

export function euclidDist(...axies) {
    return Math.sqrt(euclidDistSq(...axies));
}