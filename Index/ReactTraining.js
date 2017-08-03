var createStore = Redux.createStore;
var bindActionCreators = Redux.bindActionCreators;
var connect = ReactRedux.connect;
var Provider = ReactRedux.Provider;


/*REDUX STATE */

const defaultState = {
	patientName: "",
	submitInvalid: true,
	overAnswer: "",
	//app settings (could be set from config, etc.):
	buttonName: "Search",
	placeholderText: "Enter Name Here",
	callMainAdress: "https://temppatientdata.getsandbox.com/",
	callPerson: "person/",
	callFacility: "facility/",
	callExposure: "exposure/",
	//backend
	val1: "",
	val2: "",
	val3: "",
	val4: "",
	val5: ""
};

/* STATE */

/* REDUX STORE */

const store = createStore(appReducer,defaultState);

/* STORE */

/* REDUX REDUCERS */
function appReducer(state=defaultState, action) {
  switch (action.type) {
	case "RESET_APP_STATE":
		return Object.assign({}, defaultState);
	break;
	case "SET_ANSWER":
	  return Object.assign({}, state, {
		overAnswer: action.overAnswer
	  });
	  break;
	case "CHANGE_FORM_VALUE":
	  return Object.assign({}, state, {
		patientName: action.patientName		
	  });
	  break;
	case "ENABLE_FORM_SUBMIT":
	  return Object.assign({}, state, {
		submitInvalid: false
	  });
	  break;
	case "DISABLE_FORM_SUBMIT":
	  return Object.assign({}, state, {
		submitInvalid: true
	  });
	  break;
	case "PERSON_RESPONSE_VALUE":
	  return Object.assign({}, state, {
		val1: action.val1,
		val2: action.val2
	  });
	  break;
	case "FACILITY_RESPONSE_VALUE":
	  return Object.assign({}, state, {
		val3: action.val3,
		val4: action.val4
	  });
	  break;
	case "EXPOSURE_RESPONSE_VALUE":
	  return Object.assign({}, state, {
		val5: action.val5
	  });
	  break;
	default:
	  return state;
  }
}
/* REDUCERS */

/*REDUX ACTIONS*/
function resetAppState() {
  return {
    type: "RESET_APP_STATE",
  };
}
function setAppAnswer(overAnswer) {
  return {
    type: "SET_ANSWER",
    overAnswer
  };
}
function changeFormValue(patientName) {
  return {
    type: "CHANGE_FORM_VALUE",
    patientName
  };
}
function enableButton() {
  return {
    type: "ENABLE_FORM_SUBMIT"
  };
}
function disableButton() {
  return {
    type: "DISABLE_FORM_SUBMIT"
  };
}
function storePersonResponse(val1, val2) {
  return {
    type: "PERSON_RESPONSE_VALUE",
    val1,
    val2
  };
}
function storeFacilityResponse(val3, val4) {
  return {
    type: "FACILITY_RESPONSE_VALUE",
    val3,
    val4
  };
}
function storeExposureResponse(val5) {
  return {
    type: "EXPOSURE_RESPONSE_VALUE",
    val5
  };
}
/* REDUX */

/*REACT JS*/

class Form extends React.Component {
	constructor(props){
		super(props);
	}


	backendOperations = () => {
		axios.get((this.props.callMainAdress + this.props.callPerson + this.props.patientName))
		.then(resp => {
			this.props.storePersonResponse(resp.data.val1, resp.data.val2)
				axios.get((this.props.callMainAdress + this.props.callFacility + this.props.val1))
				.then(resp => {
					this.props.storeFacilityResponse(resp.data.val3, resp.data.val4) 
					axios.get((this.props.callMainAdress + this.props.callExposure + this.props.val2))
					.then(resp => {
						this.props.storeExposureResponse(resp.data.val5);
						console.log('Response from backend - val1: '+ this.props.val1 +'; val2: '+this.props.val2+'; val3: '+this.props.val3+'; val4: '+this.props.val4 +'; val5: '+this.props.val5);
						this.props.setAppAnswer(this.props.val3*this.props.val4)
					});
				});
		});
	};

  handleSubmit = event => {
    event.preventDefault();
	this.backendOperations();
	this.props.disableButton();
	this.props.changeFormValue("");
    
  };

  validateInput = event => {
	this.props.changeFormValue(event.target.value);
    /^[a-zA-Z]{1,10}$/.test(event.target.value)
        ? this.props.enableButton()
        : this.props.disableButton();    
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder={this.props.placeholderText}
          value={this.props.patientName}
          onChange={this.validateInput}
        />
        <button type="submit" disabled={this.props.submitInvalid}>
          {this.props.buttonName}
        </button>
      </form>
    );
  }
}

//Only astetic purpose START
const Encourage = (props) => {
  return (
    <div>
      <p>
        Please Click {props.buttonName}
      </p>
    </div>
  );
};

const Header = () => {
  return (
    <div>
      <h3>React Training Exercise</h3>
    </div>
  );
};
//Only astetic purpose END

class Overlay extends React.Component {
	constructor(props){
		super(props);
	}
	render() {
		return (
		<div id="overlay" onClick={this.props.resetAppState}>
			<div id="text">{this.props.overAnswer} </div>
		</div>
		)
	};
};

class App extends React.Component {
	constructor(props){
		super(props);
	}
	
	render() {
		return (
		<div>
			<Header />
			<CForm />
			{this.props.overAnswer == ""
				? <Encourage props={this.props}/>
				: <COverlay />}
		</div>
		);
	}
}
/*REACT*/

/* MAP REACT-REDUX */
function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
	{resetAppState,setAppAnswer,changeFormValue,enableButton,disableButton,storePersonResponse,storeFacilityResponse,storeExposureResponse}
	, dispatch);
}


var CApp = connect(mapStateToProps, mapDispatchToProps)(App);
var CForm = connect(mapStateToProps, mapDispatchToProps)(Form);
var COverlay = connect(mapStateToProps, mapDispatchToProps)(Overlay);

/* MAP */


ReactDOM.render(
<Provider store={store}>
  <CApp />
</Provider>,
  document.getElementById('mountNode'));


