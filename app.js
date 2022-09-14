// let divCard = `
// <div class="pokemon-card-container">
//             <div class="pokemon-card">
//                 <div class="background">
//                     <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png" alt="" class="image">
//                 </div>
    
//                 <div class="content">
//                     <h1 class="pokemon-name">Nome</h1>
//                     <span class="pokemon-type">Tipo</span>
//                     <div class="pokemon-stats">
//                         <p>Power: att</p>
//                         <p>Damage: att</p>
//                         <p>Deffense: att</p>
//                         <p>Sp. Attack: att</p>
//                         <p>Sp. Deffense: att</p>
//                         <p>Speed: att</p>
//                     </div>
//                     <h1 class="pokemon-logo">Pokemon Cards</h1>
//                 </div>
//             </div>
//         </div>`

// let divVS = `
// <div class="battle-container">
//             <img src="Imagens/versus.png" alt="Logo de versus" class="versus-img">
//         </div>`

// Área do jogador
function escreverPokeJogador(pokemon) {
    let container = document.querySelector("[data-js='container']");
    let pokeUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
    let pokeName = pokemon.name;
    let pokeNameFormat = pokeName[0].toUpperCase() + pokeName.substring(1);
    let pokeType = pokemon.types[0].type.name.toUpperCase();

    let hp = pokemon.stats[0].base_stat;
    let damage = pokemon.stats[1].base_stat;
    let defense = pokemon.stats[2].base_stat;
    let spAttack = pokemon.stats[3].base_stat;
    let spDefense = pokemon.stats[4].base_stat;
    let speed = pokemon.stats[5].base_stat;


    let divCard = `
    <div class="pokemon-card-container ${pokeType + 1}">
        <h1 class="card-title">Sua carta</h1>
                <div class="pokemon-card">
                    <div class="background ${pokeType + 2}">
                        <img src="${pokeUrl}" alt="" class="image">
                    </div>
        
                    <div class="content ${pokeType + 3}">
                        <h1 class="pokemon-name">${pokeNameFormat}</h1>
                        <span class="pokemon-type">${pokeType}</span>
                        <div class="pokemon-stats">
                            <label><input type="radio" name="select" id="hp" checked>HP: ${hp}</label>
                            <label><input type="radio" name="select" id="damage">Damage: ${damage}</label>
                            <label><input type="radio" name="select" id="defense">Defense: ${defense}</label>
                            <label><input type="radio" name="select" id="spatk">Sp. Attack: ${spAttack}</label>
                            <label><input type="radio" name="select" id="spdef">Sp. Defense: ${spDefense}</label>
                            <label><input type="radio" name="select" id="speed">Speed: ${speed}</label>
                        </div>
                        <h1 class="pokemon-logo">&copy Sunshine Cards</h1>
                    </div>
                </div>
    </div>`
    container.innerHTML += divCard;
}

// Desenhar o VERSUS
function DrawVersusImg() {
    let container = document.querySelector("[data-js='container']");
    let divVS = `
        <div class="battle-container">
            <img src="Imagens/versus.png" alt="Logo de versus" class="versus-img">
        </div>`
    
    container.innerHTML += divVS;
}

// Área da máquina
function escreverPokeMaq(pokemon) {
    let container = document.querySelector("[data-js='container']");
    let pokeUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
    let pokeName = pokemon.name;
    let pokeNameFormat = pokeName[0].toUpperCase(pokeUrl) + pokeName.substring(1);
    let pokeType = pokemon.types[0].type.name.toUpperCase();

    let divCard = `
    <div class="pokemon-card-container ${pokeType + 1}">
        <h1 class="card-title">Carta da máquina</h1>
                <div class="pokemon-card">
                    <div class="background ${pokeType + 2}">
                        <img src="${pokeUrl}" alt="" class="image">
                    </div>
        
                    <div class="content ${pokeType + 3}">
                        <h1 class="pokemon-name">${pokeNameFormat}</h1>
                        <span class="pokemon-type">${pokeType}</span>
                        <div class="pokemon-stats" id="${pokeType + 4}">
                            <p>HP: ???</p>
                            <p>Damage: ???</p>
                            <p>Defense: ???</p>
                            <p>Sp. Attack: ???</p>
                            <p>Sp. Defense: ???</p>
                            <p>Speed: ???</p>
                        </div>
                        <h1 class="pokemon-logo">&copy Sunshine Cards</h1>
                    </div>
                </div>
    </div>`

    container.innerHTML += divCard;
}

async function SortearPoke() {
    let battleBtn = document.querySelector("[data-js='battleBtn']");
    let container = document.querySelector("[data-js='container']");
    container.innerHTML = "";
    let first = Math.floor(Math.random() * 905) + 1;
    let second = Math.floor(Math.random() * 905) + 1;
    while (second == first) {
        second = Math.floor(Math.random() * 905) + 1;
    }
    console.log(first, second)

    const poke1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${first}`)
        .then(response => response.json())
        .then(poke => {
            escreverPokeJogador(poke);
            DrawVersusImg();
            pokemonJogador = poke;
        })

    const poke2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${second}`)
        .then(response => response.json())
        .then(poke => {
            battleBtn.removeAttribute("disabled");
            escreverPokeMaq(poke);
            pokemonMaq = poke;
        })
}

var pokemonJogador;

var pokemonMaq;

function nomePokemon(pokemon) {
    let pokeName = pokemon.name;
    let pokeNameFormat = pokeName[0].toUpperCase() + pokeName.substring(1);
    return pokeNameFormat;
}

function Batalhar() {
    let nocautes = ["nocauteou", "desmaiou", "desacordou", "derrotou", "derrubou", "capotou"]
    let random = Math.floor(Math.random() * nocautes.length);
    let check = document.getElementsByName("select");
    let janela = document.getElementById("window");
    let result = document.getElementById("resultBattle");
    let statsMaq = document.getElementById(`${pokemonMaq.types[0].type.name.toUpperCase() + 4}`);

    // STATS POKEMON JOGADOR
    let nomeJg = nomePokemon(pokemonJogador);
    let hpJg = pokemonJogador.stats[0].base_stat;
    let damageJg = pokemonJogador.stats[1].base_stat;
    let defenseJg = pokemonJogador.stats[2].base_stat;
    let spAttackJg = pokemonJogador.stats[3].base_stat;
    let spDefenseJg = pokemonJogador.stats[4].base_stat;
    let speedJg = pokemonJogador.stats[5].base_stat;
    //

    // STATS POKEMON MAQUINA
    let nomeMaq = nomePokemon(pokemonMaq);
    let hpMaq = pokemonMaq.stats[0].base_stat;
    let damageMaq = pokemonMaq.stats[1].base_stat;
    let defenseMaq = pokemonMaq.stats[2].base_stat;
    let spAttackMaq = pokemonMaq.stats[3].base_stat;
    let spDefenseMaq = pokemonMaq.stats[4].base_stat;
    let speedMaq = pokemonMaq.stats[5].base_stat;
    //

    if (check[0].checked) {
        if (hpJg > hpMaq) {
            result.innerHTML = `
                ${nomeJg} ${nocautes[random].toUpperCase()} ${nomeMaq}<br>
                ${nomeJg} vence por ${hpJg - hpMaq} pontos de HP!`
        } else if (hpJg < hpMaq) {
            result.innerHTML = `
                ${nomeMaq} ${nocautes[random].toUpperCase()} ${nomeJg}<br>
                ${nomeJg} perde por ${hpMaq - hpJg} pontos de HP!`
        } else {
            result.innerHTML = `
                ${nomeJg} EMPATOU com ${nomeMaq}<br>
                Os pontos de HP são iguais!`
        }
    }
    if (check[1].checked) {
        if (damageJg > damageMaq) {
            result.innerHTML = `
                ${nomeJg} ${nocautes[random].toUpperCase()} ${nomeMaq}<br>
                ${nomeJg} vence por ${damageJg - damageMaq} pontos de DAMAGE!`
        } else if (damageJg < damageMaq) {
            result.innerHTML = `
                ${nomeMaq} ${nocautes[random].toUpperCase()} ${nomeJg}<br>
                ${nomeJg} perde por ${damageMaq - damageJg} pontos de DAMAGE!`
        } else {
            result.innerHTML = `
                ${nomeJg} EMPATOU com ${nomeMaq}<br>
                Os pontos de DAMAGE são iguais!`
        }
    }
    if (check[2].checked) {
        if (defenseJg > defenseMaq) {
            result.innerHTML = `
                ${nomeJg} ${nocautes[random].toUpperCase()} ${nomeMaq}<br>
                ${nomeJg} vence por ${defenseJg - defenseMaq} pontos de DEFENSE!`
        } else if (defenseJg < defenseMaq) {
            result.innerHTML = `
                ${nomeMaq} ${nocautes[random].toUpperCase()} ${nomeJg}<br>
                ${nomeJg} perde por ${defenseMaq - defenseJg} pontos de DEFENSE!`
        } else {
            result.innerHTML = `
                ${nomeJg} EMPATOU com ${nomeMaq}<br>
                Os pontos de DEFENSE são iguais!`
        }
    }
    if (check[3].checked) {
        if (spAttackJg > spAttackMaq) {
            result.innerHTML = `
                ${nomeJg} ${nocautes[random].toUpperCase()} ${nomeMaq}<br>
                ${nomeJg} vence por ${spAttackJg - spAttackMaq} pontos de SPECIAL ATTACK!`
        } else if (spAttackJg < spAttackMaq) {
            result.innerHTML = `
                ${nomeMaq} ${nocautes[random].toUpperCase()} ${nomeJg}<br>
                ${nomeJg} perde por ${spAttackMaq - spAttackJg} pontos de SPECIAL ATTACK!`
        } else {
            result.innerHTML = `
                ${nomeJg} EMPATOU com ${nomeMaq}<br>
                Os pontos de SPECIAL ATTACK são iguais!`
        }
    }
    if (check[4].checked) {
        if (spDefenseJg > spDefenseMaq) {
            result.innerHTML = `
                ${nomeJg} ${nocautes[random].toUpperCase()} ${nomeMaq}<br>
                ${nomeJg} vence por ${spDefenseJg - spDefenseMaq} pontos de SPECIAL DEFENSE!`
        } else if (spDefenseJg < spDefenseMaq) {
            result.innerHTML = `
                ${nomeMaq} ${nocautes[random].toUpperCase()} ${nomeJg}<br>
                ${nomeJg} perde por ${spDefenseMaq - spDefenseJg} pontos de SPECIAL DEFENSE!`
        } else {
            result.innerHTML = `
                ${nomeJg} EMPATOU com ${nomeMaq}<br>
                Os pontos de SPECIAL DEFENSE são iguais!`
        }
    }
    if (check[5].checked) {
        if (speedJg > speedMaq) {
            result.innerHTML = `
                ${nomeJg} ${nocautes[random].toUpperCase()} ${nomeMaq}<br>
                ${nomeJg} vence por ${speedJg - speedMaq} pontos de SPEED!`
        } else if (speedJg < speedMaq) {
            result.innerHTML = `
                ${nomeMaq} ${nocautes[random].toUpperCase()} ${nomeJg}<br>
                ${nomeJg} perde por ${speedMaq - speedJg} pontos de SPEED!`
        } else {
            result.innerHTML = `
                ${nomeJg} EMPATOU com ${nomeMaq}<br>
                Os pontos de SPEED são iguais!`
        }
    }

    statsMaq.innerHTML = `
    <p>HP: ${hpMaq}</p>
    <p>Damage: ${damageMaq}</p>
    <p>Defense: ${defenseMaq}</p>
    <p>Sp. Attack: ${spAttackMaq}</p>
    <p>Sp. Defense: ${spDefenseMaq}</p>
    <p>Speed: ${speedMaq}</p>`

    janela.style.animation = "surgir 1.5s ease-in-out 2s 1 forwards"
}

function fecharJanela() {
    let janela = document.getElementById("window");
    janela.style.animation = ""
}