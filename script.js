//run immediately after load html page
window.onload = () => { 
    //object value from function staticLoadPlaces
    let places = staticLoadPlaces(); 
     renderPlaces(places);
};

//set model name and other information
function staticLoadPlaces() {
    return [
        {   
            name:'Starbucks',
            location: {
                lat: 43.772544,
                lng: -79.501608,
            },
            model:'coffee.gltf'
        },
        {
            name:'PizzaPizza',
            location:{
                lat: 43.774307,
                lng: -79.501641,
            },
            model:'moon.gltf'
        },
        {
            name:'Library',
            location:{
                lat: 43.772445,
                lng: -79.505585,
            },
            model:'moon.gltf'
        },
        {
            name:'parking', //add parking location
            location:{
                lat: 43.775180,
                lng: -79.498349,
            },
            model:'car.gltf'
        }
    ];
}

function renderPlaces(places) {
    //find 'a-scene' of index.html, give it to'scene'
    let scene = document.querySelector('a-scene');
    //go though each element(place) of places
    places.forEach((place) => {
        //give the value of location(lat&long) that we set in function staticLoadPlaces
        let latitude = place.location.lat;
        let longitude = place.location.lng;
        let modelName = place.model;
        //creat object in the page. give the values of 3d model, location, rotation, scale to object
        let model = document.createElement('a-entity');//creat 'a-entity' in index.html, and give it to 'model'
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);//location
        model.setAttribute('gltf-model', './assets/MyModel/'+modelName);//load model
        //model.setAttribute('mtl-model', './assets/MyModel/scene.mtl');//load model
        model.setAttribute('rotation', '0 0 0');//rotation
        //model.setAttribute('animation-mixer', 'clip:run');//animation
        model.setAttribute('scale', '10 10 10')//scale

        //Event (name: loaded)
        //trigger event: 
        model.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });
        scene.appendChild(model);
    });
}