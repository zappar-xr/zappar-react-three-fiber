module.exports = {
    "roots": [
        "<rootDir>/tests"
    ],
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "(.*|(\\.|/)(test|spec))\\.tsx?$",
    "testPathIgnorePatterns": ["./tests/anchorOrigin.tsx", "./tests/faceLandmarks.tsx", "./tests/faceTracking.tsx", "./tests/faceTrackingHelmet.tsx", "./tests/imageTracking.tsx", "./tests/instantTracking.tsx", "./tests/routes.tsx", "./tests/util.ts", "./tests/simple-face.tsx", "./tests/simple-image.tsx"  ],
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
    "preset": "jest-puppeteer"
}
