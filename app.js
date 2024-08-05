class Taches extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      inputTache: "",
      taches: []
    }
  }

  handleSupprimer = (index) => {
    const nouvellesTaches = this.state.taches.filter((tache, i) => i !== index);
    this.setState({taches: nouvellesTaches});
  }

  handleModifier = (index) => {
    const tacheAModifier = this.state.taches[index];
    this.setState({inputTache: tacheAModifier, indexModification: index});
  }

  handleEnregistrerModification = () => {
    const { taches, inputTache, indexModification } = this.state;
    const nouvellesTaches = taches.map((tache, i) => i === indexModification ? inputTache : tache);
    this.setState({taches: nouvellesTaches, inputTache: "", indexModification: null});
  }

  render(){
    return (
      <div className="container mt-4">
        <h1>Liste de Tâches</h1>
        <p>{this.state.inputTache}</p>
        <div className="input-group mb-3">
          <input
            type="text"
            value={this.state.inputTache}
            onChange={(e) =>{
              this.setState({inputTache: e.target.value})
            }}
            className="form-control"
            placeholder="Ajoutez une tâche"
          />
          {this.state.indexModification !== undefined ? (
            <button className="btn btn-success" onClick={this.handleEnregistrerModification}>Enregistrer</button>
          ) : (
            <button className="btn btn-primary" onClick={()=>{
              this.setState({taches: [...this.state.taches, this.state.inputTache], inputTache: ""})
            }}>Ajouter</button>
          )}
        </div>
        <ul className="list-group">
          {
            this.state.taches.map((tache, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                {tache}
                <div>
                  <button className="btn btn-warning btn-sm mr-2" onClick={() => this.handleModifier(index)}>Modifier</button>
                  <button className="btn btn-danger btn-sm" onClick={() => this.handleSupprimer(index)}>Supprimer</button>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

ReactDOM.render(<Taches/>, document.getElementById("root"));