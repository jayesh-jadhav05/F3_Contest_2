const Address = document.getElementById("Address");
const MyCurrentData = document.getElementById("CurrentDataHere");
const ShowUserAddressData = document.getElementById("UserDataHere");


const GetLocation = () => {

    const UserAddress = Address.value;
    if(UserAddress === ""){
        ShowUserAddressData.innerHTML = `<h6 style="color:red;font-size:20px;">Please enter an address!</h6>`;
        return;
    }
    
     const a = UserAddress.trim().split(" ").filter((c) => {
           if(c !== "") return c;
     });

     if(a.length <= 1){
        alert("Please Enter City State Country");
     }

    fetch(`https://api.geoapify.com/v1/geocode/search?text=1214-1224%20${a[0]}%20${a[1]}%20${a[2]}&limit=5&format=json&apiKey=3d7c228eb170446284e099d8272acfe1
    `)
    .then(res => res.json())
    .then(data => SetUserData(data))
}


const SetUserData = (Userdata) => {
    const PresentData = Userdata.results[0];
    ShowUserAddressData.innerHTML = `
    <h3>Result</h3>
    <div class="AddressData">
    <p>Name Of Time Zone : ${PresentData.timezone.name}</p>
    <p>Lat : ${PresentData.lat}</p>
    <p>Offset STD : ${PresentData.timezone.offset_STD}</p>
    <p>Offset STD Seconds : ${PresentData.timezone.offset_STD_seconds}</p>
    <p>Offset DST : ${PresentData.timezone.offset_DST}</p>
    <p>Offset DST Seconds : ${PresentData.timezone.offset_DST_seconds}</p>
    <p>Country : ${PresentData.country}</p>
    <p>Postcode : ${PresentData.state_code}</p>
    <p><span>City : ${PresentData.city}</p>
    </div> 
    `
}


const GetDataFromAPI = (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=3d7c228eb170446284e099d8272acfe1`)
        .then(res => res.json())
        .then(data => MyLocation(data))
}

navigator.geolocation.getCurrentPosition(GetDataFromAPI);

const MyLocation = (MyData) => {
    console.log(MyData.results[0]);
    const PresentData = MyData.results[0];
    MyCurrentData.innerHTML = `
    
    <p>Name Of Time Zone : ${PresentData.timezone.name}</p>
    <p>Lat : ${PresentData.lat}</p>
    <p>Offset STD : ${PresentData.timezone.offset_STD}</p>
    <p>Offset STD Seconds : ${PresentData.timezone.offset_STD_seconds}</p>
    <p>Offset DST : ${PresentData.timezone.offset_DST}</p>
    <p>Offset DST Seconds : ${PresentData.timezone.offset_DST_seconds}</p>
    <p>Country : ${PresentData.country}</p>
    <p>Postcode : ${PresentData.state_code}</p>
    <p>City : ${PresentData.city}</p>
   `  
}

MyLocation();
