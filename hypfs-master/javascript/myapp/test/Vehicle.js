var paths = require('./path');

class Vehicle {
    constructor(num_percorso) {
        this.num_percorso = num_percorso;
        this.coord = this.show_coords(num_percorso)

    }

    show_coords(num_percorso) {

        switch (num_percorso) {
            case 1:
                return paths.path1
            case 2:
                return paths.path2
            case 3:
                return paths.path3
            case 4:
                return paths.path4
            case 5:
                return paths.path5
            case 6:
                return paths.path6
    
            default:
            // code block
        }

    }
}

module.exports = Vehicle