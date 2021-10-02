import Bulbasaur from '../images/bulbasaur.png';

function PokeList() {

  return (
    <div className="pokeListContainer">
		<div className="searchContainer">
			{/* <input type="text">Search</input> */}
		</div>
		<div className="listContainer">
			{/* This will need it's own seperate component */}
			<div className="pokecard">
				<div className="pokeheader">
					<img src={Bulbasaur}/>
					<span className="pokenumber">#001</span>
				</div>
			
				<p className="pokename">Bulbasaur</p>
				<div className="typetags">
					<div className="tag">
						<p>Grass</p>
					</div>
					<div className="tag">
						<p>Poison</p>
					</div>
				</div>
			</div>
		</div>
    </div>
  );
}

export default PokeList;
