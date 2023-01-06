const trailBtn = document.querySelector("#randomTrailsGen");
const myDiv = document.querySelector("#my-div");
const myDiv2 = document.querySelector("#my-div2");
const form = document.querySelector("form");
const trailName = document.querySelector("#name-input");
const trailType = document.querySelector("#trailType-input");
const baseURL = "http://localhost:4000/api/trail";

function dispTrail(trail) {
  myDiv.innerHTML = "";
  trail.forEach((trail) => {
    const trailName = document.createElement("h2");
    trailName.innerHTML = `
        <p> Trail Name: ${trail.name} <br/> Trail Type: ${trail.trailType}</p>
        <select 
        name="type"
        id="change-type-drop-down-${trail.id}"
        onchange="changeTrail(${trail.id})"
        placeholder="change trail type" class="input">
        <option value="Choose new type">Change trail type</option>
        <option value="Green">Green</option>
        <option value="Blue">Blue</option>
        <option value="Black">Black</option>
        <option value="Double Black">Double Black</option>
        <option value="Terrain Park">Terrain Park</option> 
        </select>
        <button onclick="deleteTrail(${trail.id})" class="deletebutton">Delete Trail</button>`;
    myDiv.appendChild(trailName);
  });
}

function dispTrails(trail) {
  const trailName = document.createElement("h2");
  trailName.textContent = trail;
  myDiv2.appendChild(trailName);
}

function trailCallBack(trailrun) {
  console.log(trailrun.data);
  let trailrunArr = trailrun.data;
  for (i = 0; i < 5; i++) {
    let randomIndex = Math.floor(Math.random() * trailrunArr.length);
    let randomTrailrun = trailrunArr[randomIndex];
    dispTrails(randomTrailrun.trails);
    console.log(randomTrailrun);
  }
}

const trailDestruct = ({ data: trail }) => dispTrail(trail);

const createNewTrail = () =>
  axios
    .post(baseURL, { name: trailName.value, trailType: trailType.value })
    .then(trailDestruct);

const changeTrail = (id) => {
  const changeSelector = document.getElementById(`change-type-drop-down-${id}`);
  console.log(changeSelector.value);
  axios
    .put(`${baseURL}/${id}`, { trailType: changeSelector.value })
    .then(trailDestruct);
};

const getTrails = () => {
  myDiv2.textContent = "";
  axios.get("http://localhost:4000/trails").then(trailCallBack);
};

const deleteTrail = (id) => {
  axios.delete(`${baseURL}/${id}`).then(trailDestruct);
};

function formSubmit(e) {
  e.preventDefault();

  createNewTrail();
}

trailBtn.addEventListener("click", getTrails);
form.addEventListener("submit", formSubmit);
