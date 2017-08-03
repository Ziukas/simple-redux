"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var createStore = Redux.createStore;
var bindActionCreators = Redux.bindActionCreators;
var connect = ReactRedux.connect;
var Provider = ReactRedux.Provider;

/*REDUX STATE */

var defaultState = {
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

var store = createStore(appReducer, defaultState);

/* STORE */

/* REDUX REDUCERS */
function appReducer() {
		var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
		var action = arguments[1];

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
				type: "RESET_APP_STATE"
		};
}
function setAppAnswer(overAnswer) {
		return {
				type: "SET_ANSWER",
				overAnswer: overAnswer
		};
}
function changeFormValue(patientName) {
		return {
				type: "CHANGE_FORM_VALUE",
				patientName: patientName
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
				val1: val1,
				val2: val2
		};
}
function storeFacilityResponse(val3, val4) {
		return {
				type: "FACILITY_RESPONSE_VALUE",
				val3: val3,
				val4: val4
		};
}
function storeExposureResponse(val5) {
		return {
				type: "EXPOSURE_RESPONSE_VALUE",
				val5: val5
		};
}
/* REDUX */

/*REACT JS*/

var Form = function (_React$Component) {
		_inherits(Form, _React$Component);

		function Form(props) {
				_classCallCheck(this, Form);

				var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

				_this.backendOperations = function () {
						axios.get(_this.props.callMainAdress + _this.props.callPerson + _this.props.patientName).then(function (resp) {
								_this.props.storePersonResponse(resp.data.val1, resp.data.val2);
								axios.get(_this.props.callMainAdress + _this.props.callFacility + _this.props.val1).then(function (resp) {
										_this.props.storeFacilityResponse(resp.data.val3, resp.data.val4);
										axios.get(_this.props.callMainAdress + _this.props.callExposure + _this.props.val2).then(function (resp) {
												_this.props.storeExposureResponse(resp.data.val5);
												console.log('Response from backend - val1: ' + _this.props.val1 + '; val2: ' + _this.props.val2 + '; val3: ' + _this.props.val3 + '; val4: ' + _this.props.val4 + '; val5: ' + _this.props.val5);
												_this.props.setAppAnswer(_this.props.val3 * _this.props.val4);
										});
								});
						});
				};

				_this.handleSubmit = function (event) {
						event.preventDefault();
						_this.backendOperations();
						_this.props.disableButton();
						_this.props.changeFormValue("");
				};

				_this.validateInput = function (event) {
						_this.props.changeFormValue(event.target.value);
						/^[a-zA-Z]{1,10}$/.test(event.target.value) ? _this.props.enableButton() : _this.props.disableButton();
				};

				return _this;
		}

		_createClass(Form, [{
				key: "render",
				value: function render() {
						return React.createElement(
								"form",
								{ onSubmit: this.handleSubmit },
								React.createElement("input", {
										type: "text",
										placeholder: this.props.placeholderText,
										value: this.props.patientName,
										onChange: this.validateInput
								}),
								React.createElement(
										"button",
										{ type: "submit", disabled: this.props.submitInvalid },
										this.props.buttonName
								)
						);
				}
		}]);

		return Form;
}(React.Component);

//Only astetic purpose START


var Encourage = function Encourage(props) {
		return React.createElement(
				"div",
				null,
				React.createElement(
						"p",
						null,
						"Please Click ",
						props.buttonName
				)
		);
};

var Header = function Header() {
		return React.createElement(
				"div",
				null,
				React.createElement(
						"h3",
						null,
						"React Training Exercise"
				)
		);
};
//Only astetic purpose END

var Overlay = function (_React$Component2) {
		_inherits(Overlay, _React$Component2);

		function Overlay(props) {
				_classCallCheck(this, Overlay);

				return _possibleConstructorReturn(this, (Overlay.__proto__ || Object.getPrototypeOf(Overlay)).call(this, props));
		}

		_createClass(Overlay, [{
				key: "render",
				value: function render() {
						return React.createElement(
								"div",
								{ id: "overlay", onClick: this.props.resetAppState },
								React.createElement(
										"div",
										{ id: "text" },
										this.props.overAnswer,
										" "
								)
						);
				}
		}]);

		return Overlay;
}(React.Component);

;

var App = function (_React$Component3) {
		_inherits(App, _React$Component3);

		function App(props) {
				_classCallCheck(this, App);

				return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));
		}

		_createClass(App, [{
				key: "render",
				value: function render() {
						return React.createElement(
								"div",
								null,
								React.createElement(Header, null),
								React.createElement(CForm, null),
								this.props.overAnswer == "" ? React.createElement(Encourage, { buttonName: this.props.buttonName }) : React.createElement(COverlay, null)
						);
				}
		}]);

		return App;
}(React.Component);
/*REACT*/

/* MAP REACT-REDUX */


function mapStateToProps(state) {
		return state;
}

function mapDispatchToProps(dispatch) {
		return bindActionCreators({ resetAppState: resetAppState, setAppAnswer: setAppAnswer, changeFormValue: changeFormValue, enableButton: enableButton, disableButton: disableButton, storePersonResponse: storePersonResponse, storeFacilityResponse: storeFacilityResponse, storeExposureResponse: storeExposureResponse }, dispatch);
}

var CApp = connect(mapStateToProps, mapDispatchToProps)(App);
var CForm = connect(mapStateToProps, mapDispatchToProps)(Form);
var COverlay = connect(mapStateToProps, mapDispatchToProps)(Overlay);

/* MAP */

ReactDOM.render(React.createElement(
		Provider,
		{ store: store },
		React.createElement(CApp, null)
), document.getElementById('mountNode'));