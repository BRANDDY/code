//run immediately after load html page
var lat,long;
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
                rota: '0, 60,0',
            },
            model:'coffee.gltf',
            animate:'property: rotation; to: 0 420 0; loop: true; dur: 10000'
        },
        {
            name:'PizzaPizza',
            location:{
                lat: 43.774307,
                lng: -79.501641,
                rota: '0,0,0',
            },
            model:'moon.gltf',
            animate:''
        },
        {
            name:'Library',
            location:{
                lat: 43.772445,
                lng: -79.505585,
                rota: '0,0,0',
            },
            model:'moon.gltf',
            animate:''
        },
        {
            name:'parking', //add parking location
            location:{
                lat: 43.775180,
                lng: -79.498349,
            },
            model:'car.gltf',
            animate:''
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
        let rota = place.location.rota;
        let animate = place.animate;
        //creat object in the page. give the values of 3d model, location, rotation, scale to object
        let model = document.createElement('a-entity');//creat 'a-entity' in index.html, and give it to 'model'
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);//location
        model.setAttribute('gltf-model', './assets/MyModel/'+modelName);//load model
        model.setAttribute('rotation', rota);//rotation
        model.setAttribute('animation', animate);//animation
        model.setAttribute('scale', '20 20 20')// scale

        //Event (name: loaded)
        //trigger event: 
        model.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });
        scene.appendChild(model);
    });
}
function getLocation(){
    //let scene = document.querySelector('a-scene');
    if(navigator.geolocation){
        let s = navigator.geolocation.getCurrentPosition(
            function show(position){
                lat = position.coords;
                long = position.coords.longitude;
                /*
                let word = document.createElement('a-text');
                word.setAttribute('gps-entity-place', `latitude:  43.773509; longitude:-79.501224;`);
                word.setAttribute('value',lat+', '+long);
                word.setAttribute('color', 'red');
                word.setAttribute('look-at','[gps-camera]');
                word.setAttribute('scale','1 1 1');
                word.addEventListener('loaded', () => {
                    window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
                });
                scene.appendChild(word);*/
            }
        );
    }else {
        console.log('Failed to get your location');
    }
}