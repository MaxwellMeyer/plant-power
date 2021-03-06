import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";

// This function stores our state.

const storeState = () => {
  let currentState = {};
  return (stateChangeFunction = (state) => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = { ...newState };
    console.log("hello", currentState);
    return newState;
  };
};

const stateControl = storeState();
const plant = storeState();
const newPlant = storeState();

// const canEat = (superPlant) => ({
//   eat: (food) => {
//     return `The ${superPlant} eats the ${food}.`
//   }
// });

// const canSleep = (superPlant) => ({
//   sleep: () => {
//     return `The ${superPlant} sleeps.`
//   }
// });

// const sleepingEatingSuperPlant = () => {
//   const superPlant = newPlant;
//   return { ...superPlant, ...canEat(superPlant), ...canSleep(superPlant) };
// };

// console.log(sleepingEatingSuperPlant());

const music = function (plantName) {
  const obj = {
    listen: function (song) {
      return `The ${plantName} listens to ${song}.`;
    },
  };
  return obj;
};

const plantMusic = music(newPlant);

plantMusic.listen("a song");

// This is a function factory. used to easily create more specific functions that alter a plant's soil, water, and light to varying degrees.

const changeState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop]: (state[prop] || 0) + value,
    });
  };
};

// 4 functions created with the function factory

const feed = changeState("soil")(1);
const blueFood = changeState("soil")(5);
const hydrate = changeState("water")(1);
const superWater = changeState("water")(5);

$(document).ready(function () {
  // This function has side effects because we are using jQuery. Manipulating the DOM will always be a side effect. Note that we only use one of our functions to alter soil. You can easily add more.

  $("#feed").click(function () {
    const newState = stateControl(blueFood);
    $("#soil-value-1").text(`Soil: ${newState.soil}`);
    const newState2 = plant(feed);
    $("#soil-value-2").text(`Soil: ${newState2.soil}`);
    console.log("new plant", newState2);
  });

  $("#water").click(function () {
    const newState = stateControl(hydrate);
    $("#water-value-1").text(`Water: ${newState.water}`);
    const newState2 = plant(hydrate);
    $("#water-value-2").text(`Water: ${newState2.water}`);
    console.log("new plant", newState2);
  });

  // This function doesn't actually do anything useful in this application - it just demonstrates how we can "look" at the current state (which the DOM is holding anyway).

  $("#show-state").click(function () {
    // We just need to call stateControl() without arguments to see our current state.
    const currentState = stateControl();
    $("#soil-value").text(`Soil: ${currentState.soil}`);
  });
});
