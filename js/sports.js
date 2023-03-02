const searchAllData = (id) => {
    const inputElement = document.getElementById('search-value');
      document.getElementById ('single-player-details').innerHTML = "";
    document.getElementById('Male').classList.add('d-none');
    document.getElementById('Female').classList.add('d-none');
    document.getElementById("spinner").classList.remove('d-none');
  
    const inputValue = inputElement.value;
    // console.log(inputElement)

    const searchId = id ||inputValue ;

    const url = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${searchId}`;
   console.log(url);
   fetch(url)
   .then((res) => res.json())
   .then((data) => {
     document.getElementById("spinner").classList.add('d-none');
     showPlayersData(data.player);
   });
};

const showPlayersData = (players) => {
    document.getElementById('search-value').value = "";
   

    const container = document.getElementById("player-info");
    container.innerHTML ="" ;
    players.forEach((player) => {

        // console.log(player);

        const { strPlayer, strThumb, strNationality, idPlayer } = player;

        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        
        <div class="card">
          <img src="${strThumb ? strThumb : "http://picsum.photos/500/300?random=3"}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${strPlayer}</h5>
            <p class="card-text">${strNationality}</p>
          </div>

          <div class="my-5 mx-3">
          <button onclick="singlePlayer('${idPlayer}')" type="button" class="btn btn-info ms-5">Details</button>
        <button  type="button" class="btn btn-light ms-5">Delete</button>
        </div>
        </div>
        
        `
        container.appendChild(div);
    });
}

const singlePlayer = (id) => {
    const url = `https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`
    fetch(url)
        .then((res) => res.json())
        .then(data => showSinglePlayer(data.players[0]))
} ;
 
const showSinglePlayer = (data) =>{
console.log(data);

const {strThumb,strPlayer,dateBorn,strGender,strDescriptionEN} = data ;

const container = document.getElementById ('single-player-details');
container.innerHTML = '';
const div = document.createElement('div');
if (strGender === 'Male') {
  const element= document.getElementById('Male');
  element.classList.remove('d-none');
}
else{
  const element= document.getElementById('Female');
  element.classList.remove('d-none');
}


div.innerHTML= `

<div class="card mb-3 w-100 h-100 my-5" >
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${strThumb}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${strPlayer}</h5>
        <h2 class="card-title">${dateBorn}</h2>
        <p class="card-text">${strDescriptionEN.slice(0,100)+"..."} </p>
       
      </div>
    </div>
  </div>
</div>

`
container.appendChild(div);
}
searchAllData('messi');