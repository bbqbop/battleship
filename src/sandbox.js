const testArray = [[1,2],[2,2],[3,3],[4,4]];
const testArray2 = [[5,5],[6,6],[7,7],[3,3]];

testArray.forEach(x => {
    testArray2.some(y => {
        strX = JSON.stringify(x);
        strY = JSON.stringify(y);
        if( strX === strY ){
            const idx = testArray2.findIndex(z => {
                return JSON.stringify(z) === strY
            })
            return testArray2.splice(idx, 1);
        }
    })
})

console.log(testArray, testArray2)