function tsp_hk(distance_matrix) {
    let n = distance_matrix.length; // variable for total cities 
    if (n <= 1) { // base case for one city or none
        return 0; // 0 as there is no distance to be computed 
    }

    let minTourLength = Infinity; // initialize tour length 

    for (let i = 0; i < n; i++) { // iterate through each city 
        let cache = {};  // reset cache 
        let cities = []; // array to store cities 
        for (let index = 0; index < n; index++) { // populates cities array with indices 
            cities.push(index); // adds indices on
        }
        let tmp = heldkarp(distance_matrix, i, cities, cache); // shortest path calculation 

        if (tmp < minTourLength) { // checks if current path is shorter than shortest found up to than 
            minTourLength = tmp; // swaps if so 
        }
    }

    return minTourLength;
}

function heldkarp(distMatrix, start, cities, cache) {
    let key = JSON.stringify([cities.slice().sort(), start]); // makes a string key for current state

    if (cache[key] !== undefined) { // checks if result for key has been computed 
        return cache[key]; // returns value 
    }

    if (cities.length == 2) { // base case for two cities 
        let remainingCity = cities.find(city => city !== start);  // finds other city that is not starting 
        cache[key] = distMatrix[start][remainingCity]; // gets distance start to remaining city 
        return cache[key]; // returns value 
    }

    let minDistance = Infinity; // intialize distance 

    for (let j = 0; j < cities.length; j++) { // loops through cities 
        if (cities[j] !== start) { // makes sure we skip start city 
            let newCities = []; // cities remaining to visit 
            for (let i = 0; i < cities.length; i++) { // loops through new cities 
                if (cities[i] !== start) { // makes sure start city isnt in 
                    newCities.push(cities[i]); // adds them on 
                }
            }

            let newDistance = distMatrix[start][cities[j]] + heldkarp(distMatrix, cities[j], newCities, cache); // calculates distance 

            if (newDistance < minDistance) { // checks if newest distance calculated is shorter
                minDistance = newDistance; // updates it if true 
            }
        }
    }

    cache[key] = minDistance; 
    return minDistance;
}
