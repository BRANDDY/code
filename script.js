//run immediately after load html page
window.onload = () => { 
    //array value from function staticLoadPlaces
    let places = staticLoadPlaces(); 
     renderPlaces(places);
};

//set model name and location as an array list
function staticLoadPlaces() {
    return [
        {
            name: 'MyModel',
            location: {
                lat: 43.770145,
                lng: -79.415122,
            }
        },
    ];
}

function renderPlaces(places) {
    //find 'a-scene' of index.html, give it to'scene'
    let scene = document.querySelector('a-scene');
    //go though each place element of places
    places.forEach((place) => {
        //give the value of location(lat&long) that we set in function staticLoadPlaces
        let latitude = place.location.lat;
        let longitude = place.location.lng;
        //creat object in the page. give the values of 3d model, location, rotation, scale to object
        let model = document.createElement('a-entity');//creat 'a-entity' in index.html, and give it to 'model'
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);//location
        model.setAttribute('gltf-model', './assets/MyModel/moon.gltf');//load model
        //model.setAttribute('mtl-model', './assets/MyModel/scene.mtl');//load model
        model.setAttribute('rotation', '0 180 0');//rotation
        //model.setAttribute('animation-mixer', '');//animation
        model.setAttribute('scale', '0.1 0.1 0.1')//scale

        //Event (name: loaded)
        //trigger event: 
        model.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });

        scene.appendChild(model);
    });
}