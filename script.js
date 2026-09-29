const search=document.querySelector(".search");
const display=document.querySelector(".Display");
const displaycard=document.querySelector(".display-card");

const pokename=document.querySelector("#pokename");
const poketype=document.querySelector("#poketype");
const pokeabilities=document.querySelector("#pokeabilities");
const pokistats=document.querySelector("#pokistats");

let pokemoncount;
let pokemonurl;
let pokemonresponse;
let pokemondata;

let pokemonlist=[];



async function getdata(){
    const url="https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";
    const response=await fetch(url);
    const data=await response.json();


    getpokemondata(data);
}

async function getpokemondata(data){
    pokemoncount=data.results.length;
    for(let i=0; i<pokemoncount; i++){
        pokemonurl=data.results[i].url;
        pokemonresponse=await fetch(pokemonurl);
        pokemondata=await pokemonresponse.json();

        pokemonlist.push(pokemondata);
    }
    pokemoncount=data.results.length;
    console.log(pokemoncount);
    loopthroughpoki(pokemoncount, data, pokemonurl, pokemonresponse, pokemondata, pokemonlist,);

}

function loopthroughpoki(pokemoncount,data, pokemonurl, pokemonresponse, pokemondata, pokemonlist){
    for(let i=0; i<pokemoncount; i++){
        console.log(pokemonlist[i].name);
    }
    search.addEventListener("input", ()=>{
        for(let i=0; i<pokemoncount; i++)
            if(search.value.toLowerCase()===pokemonlist[i].name){
                displaycard.src=pokemonlist[i].sprites.front_default;
                pokename.textContent=pokemonlist[i].name;
                poketype.textContent=pokemonlist[i].types
                    .map(item => item.type.name)
                    .join(", ");
                pokeabilities.textContent=pokemonlist[i].abilities
                    .map(item => item.ability.name)
                    .join(", ");
                pokistats.textContent=pokemonlist[i].stats
                    .map(item => `${item.stat.name}: ${item.base_stat}`)
                    .join(", ");
            }
        })

}

getdata();