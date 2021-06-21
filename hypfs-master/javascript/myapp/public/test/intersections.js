var paths = require('./path');



mypath_label = ["path1", "path2", "path3", "path4", "path5"]
mypath = [paths.path1, paths.path2, paths.path3, paths.path4, paths.path5]

//cerco i punti in comuner tra i path
intersections = []
for (let i = 0; i < mypath.length; i++) {
    for (let k = i + 1; k < mypath.length; k++) {

        if (mypath[i].filter(item1 => mypath[k].some(item2 => item1.lat === item2.lat && item1.lng === item2.lng)) != "") {
            console.log("Punti in comune:", mypath_label[i], mypath_label[k], mypath[i].filter(item1 => mypath[k].some(item2 => item1.lat === item2.lat && item1.lng === item2.lng)))

            intersections.push(mypath[i].filter(item1 => mypath[k].some(item2 => item1.lat === item2.lat && item1.lng === item2.lng)))
        }
    }
}

//metto tutti gli elementi in comune in un unico arrat
intersections = intersections.flat(1); //The depth level specifying how deep a nested array structure should be flattened. Defaults to 1.

//rimuovo i duplicati prima di fare inserimento  marker pothole

intersections = intersections.filter((thing, index, self) =>
    index === self.findIndex((t) => (
        t.lat === thing.lat && t.lng === thing.lng
    ))
)

console.log("Intersezioni:", intersections)



module.exports = {intersections}